import { useEffect, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import styled from 'styled-components';
import { EMealType, EWellnessTypes } from '@utils/interfaces';
import {
  formatFullDateNoDay,
  getDaysAwayFromDate,
  setDateMidnightISOString,
} from '@utils/date-utils';
import {
  ALL_MEAL_CARDS,
  ALL_WELLNESS_CARDS,
  MEDIA_MAX_DESKTOP,
  MEDIA_MOBILE,
  MEDIA_TABLET,
} from '@utils/constants';
import {
  ThemeBackgroundSecondary,
  ThemeTextColor,
} from '@components/ui/style-themed';
import { useTheme } from '@hooks/use-theme';
import { MdCalendarToday } from 'react-icons/md';
import {
  DateHeaderRow,
  MealDataRow,
  WellnessDataRow,
} from '@components/share/content-rows';
import SharePagination from '@components/share/pagination';
import { getPaddedNestedArray } from '@utils/array-utils';
import Calendar from '@components/calendar';

const CALENDAR_HEIGHT = 280;
const DEFAULT_DAYS_SHOW = 7;
const MAX_DAYS_PER_ROW = 2;
const MAX_ROWS_PER_PAGE = 4;

const DATE_1 = setDateMidnightISOString(getDaysAwayFromDate(new Date(), -6));
const DATE_2 = setDateMidnightISOString(getDaysAwayFromDate(new Date(), -5));
const DATE_3 = setDateMidnightISOString(getDaysAwayFromDate(new Date(), -4));
const DATE_4 = setDateMidnightISOString(getDaysAwayFromDate(new Date(), -3));
const DATE_5 = setDateMidnightISOString(getDaysAwayFromDate(new Date(), -2));
const DATE_6 = setDateMidnightISOString(getDaysAwayFromDate(new Date(), -1));
const DATE_7 = setDateMidnightISOString(getDaysAwayFromDate(new Date(), -0));

interface ISApplyButton {
  background: string;
  colour: string;
}

const SContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0 0 40px 0;
  min-height: 100%;
`;
const SUsernameContainer = styled.div`
  display: flex;
  align-items: baseline;
  gap: 12px;
  font-size: 20px;
  font-weight: 200;
  padding-bottom: 20px;
`;
const SUsername = styled.span`
  font-size: 28px;
  font-weight: 600;
`;

const STopContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  padding: 0 0 20px 0;
`;
const SRangeContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  flex-wrap: wrap;
  gap: 20px;
  font-size: 24px;
`;
const SFakeRange = styled.div`
  width: 80px;

  ${MEDIA_MOBILE} {
    display: none;
  }
  ${MEDIA_TABLET} {
    display: none;
  }
`;
const SRange = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  border: 1px solid transparent;
  padding: 8px;
  width: 180px;
  border-radius: 4px;
  font-size: 22px;
  ${ThemeTextColor}
  ${ThemeBackgroundSecondary}

  :hover:not(.fade) {
    border: 1px solid;
  }
  :active {
    opacity: 0.6;
  }

  &.selected {
    border: 1px solid;
  }
  &.fade {
    opacity: 0.4;
  }
`;
const SCalendarContainer = styled.div`
  position: absolute;
  max-width: 340px;
  width: fit-content;
  top: 50px;
  height: auto;
  z-index: 1;

  &.from-date {
    left: 0px;
  }

  &.to-date {
    right: 0px;
  }

  ${MEDIA_MOBILE} {
    max-width: 100%;
  }
`;
const SApplyButton = styled.button<ISApplyButton>`
  padding: 4px 8px;
  width: 80px;
  right: 0;
  border: 1px solid transparent;
  border-radius: 4px;
  font-size: 16px;
  height: 32px;
  background-color: ${({ background }) => background};
  color: ${({ colour }) => colour};

  &.apply-disabled {
    opacity: 0.4;
    cursor: default;
  }
  &.apply-enabled {
    cursor: pointer;

    :hover {
      border: 1px solid;
    }
    :active {
      opacity: 0.6;
    }
  }
`;
const SUserDataContainer = styled.div`
  flex: 1;
`;
const SRowContainer = styled.div`
  display: grid;
  gap: 0px 20px;
  grid-template-columns: repeat(${MAX_DAYS_PER_ROW}, 1fr);

  ${MEDIA_MOBILE} {
    grid-template-columns: 1fr;
  }
  ${MEDIA_TABLET} {
    grid-template-columns: 1fr;
  }
  ${MEDIA_MAX_DESKTOP} {
    gap: 0 50px;
  }
`;

type TMealContents = { [key in EMealType]: string[] };
type TWellnessContents = { [key in EWellnessTypes]: number };
interface IUserData {
  user: string;
  totalDays: number;
  keys: string[][];
  dates: string[];
  data: {
    [key: string]: TMealContents & TWellnessContents;
  };
}

const MOCK_CHOC_DATA_2: IUserData = {
  user: 'Firstname Lastname',
  totalDays: 7,
  dates: [
    DATE_1,
    DATE_2,
    DATE_3,
    DATE_4,
    DATE_5,
    DATE_6,
    DATE_7,
    DATE_1,
    DATE_2,
    DATE_3,
    DATE_4,
    DATE_5,
    DATE_6,
    DATE_7,
    DATE_1,
    DATE_2,
    DATE_3,
  ],
  keys: [
    [DATE_1, DATE_2],
    [DATE_3, DATE_4],
    [DATE_5, DATE_6],
    [DATE_5, DATE_6],
    [DATE_5, DATE_6],
    [DATE_5, DATE_6],
    [DATE_5, DATE_6],
    [DATE_5, DATE_6],
    [DATE_7, ''],
  ],
  data: {
    [DATE_1]: {
      breakfast: [
        '½ cup - Simple Truth muesli (With chocolate and mini marshmellows)',
        '1 serving - milk for cereal',
        '1 serving - milk with espresso coffee',
        '1 carrot ',
      ],
      snack_1: [],
      lunch: [
        '½ cup - Simple Truth muesli (With chocolate and mini marshmellows taste)',
        '1 serving - milk for cereal',
        '0.5 plate - Asian styled salad (Stir fry veg, chicken strips, rice, Asian sesame stir-fry sauce)',
      ],
      snack_2: [],
      dinner: [
        '1 serving - milk with espresso coffee',
        '1 banana',
        '1 carrot',
        '3 streaky bacon',
        '1 sushi platter',
        'ice cream - dessert',
        '14 grapes',
        '1 avocado',
      ],
      water: 4,
      tea_coffee: 2,
      alcohol: 1,
    },
    [DATE_2]: {
      breakfast: [
        '½ cup - Simple Truth muesli (With chocolate and mini marshmellows)',
        '2 carrots ',
      ],
      snack_1: [],
      lunch: [],
      snack_2: [],
      dinner: [
        '1 serving - milk with espresso coffee',
        '1 banana',
        '14 grapes',
        '1 avocado',
      ],
      water: 4,
      tea_coffee: 2,
      alcohol: 0,
    },
    [DATE_3]: {
      breakfast: [
        '½ cup - Simple Truth muesli (With chocolate and mini marshmellows)',
        '1 serving - milk for cereal',
      ],
      snack_1: [],
      lunch: ['1 serving - milk for cereal'],
      snack_2: ['1 banana'],
      dinner: ['14 grapes', '1 avocado'],
      water: 2,
      tea_coffee: 0,
      alcohol: 0,
    },
    [DATE_4]: {
      breakfast: [
        '½ cup - Simple Truth muesli (With chocolate and mini marshmellows)',
      ],
      snack_1: [],
      lunch: [
        '½ cup - Simple Truth muesli (With chocolate and mini marshmellows taste)',
      ],
      snack_2: [],
      dinner: ['1 serving - milk with espresso coffee'],
      water: 4,
      tea_coffee: 4,
      alcohol: 1,
    },
    [DATE_5]: {
      breakfast: [
        '1 - slice Quinoa bread',
        '2tsp peanut butter',
        'cup of fat free milk',
      ],
      snack_1: ['Banana'],
      lunch: [
        '1 - Wrap',
        'Cucumber',
        'Mozzarella',
        '½ chicken breast',
        'tsp sweet chilli',
      ],
      snack_2: ['5 - skinny almonds'],
      dinner: [
        '½ plate of rocket & cucumber salad',
        '1 cup of spaghetti carbonara',
      ],
      water: 1,
      tea_coffee: 2,
      alcohol: 0,
    },
    [DATE_6]: {
      breakfast: [],
      snack_1: ['Banana'],
      lunch: [
        '1 - Wrap',
        'Cucumber',
        'Mozzarella',
        '½ chicken breast',
        'tsp sweet chilli',
      ],
      snack_2: ['5 - skinny almonds'],
      dinner: [],
      water: 4,
      tea_coffee: 1,
      alcohol: 0,
    },
    [DATE_7]: {
      breakfast: [
        '½ cup - Simple Truth muesli (With chocolate and mini marshmellows)',
        '1 serving - milk for cereal',
        '1 serving - milk with espresso coffee',
        '1 carrot ',
      ],
      snack_1: [],
      lunch: [
        '½ cup - Simple Truth muesli (With chocolate and mini marshmellows taste)',
        '1 serving - milk for cereal',
        '0.5 plate - Asian styled salad (Stir fry veg, chicken strips, rice, Asian sesame stir-fry sauce)',
      ],
      snack_2: ['1 banana'],
      dinner: ['1 serving - milk with espresso coffee'],
      water: 5,
      tea_coffee: 0,
      alcohol: 6,
    },
  },
};

interface ISharePageProps {
  guid: string;
}

const SharePage: NextPage<ISharePageProps> = ({ guid }) => {
  const theme = useTheme();
  const [userData, setUserData] = useState<IUserData | null>(null);
  const [hasError, setHasError] = useState(false);
  const [currentPage, setcurrentPage] = useState(1);
  const [allViewKeys, setAllViewKeys] = useState<string[][]>([]);
  const [currentViewKeys, setCurrentViewKeys] = useState<string[][]>([]);
  const [dateRangeChanged, setDateRangeChanged] = useState(false);
  const [fromDate, setFromDate] = useState(
    getDaysAwayFromDate(new Date(), -(DEFAULT_DAYS_SHOW - 1))
  );
  const [toDate, setToDate] = useState(new Date());
  const [showToDateCalendar, setShowToDateCalendar] = useState(false);
  const [showFromDateCalendar, setshowFromDateCalendar] = useState(false);

  useEffect(() => {
    const getData = () => {
      setTimeout(async () => {
        try {
          const { data } = await Promise.resolve({ data: MOCK_CHOC_DATA_2 });
          setUserData(data);

          const allNestedDates = getPaddedNestedArray(
            data.dates,
            data.totalDays,
            MAX_DAYS_PER_ROW
          );

          const getCurrentViewKeys = allNestedDates.slice(0, MAX_ROWS_PER_PAGE);
          setCurrentViewKeys(getCurrentViewKeys);
          setAllViewKeys(allNestedDates);
        } catch (err) {
          console.error(err);
          setHasError(true);
        }
      }, 1000);
    };

    getData();
  }, [guid]);

  const onPaginationChange = (page: number) => {
    if (currentPage !== page && userData) {
      setcurrentPage(page);

      const lowerBound = (page - 1) * MAX_ROWS_PER_PAGE;
      const upperBound = MAX_ROWS_PER_PAGE * page;
      const getCurrentViewKeys = allViewKeys.slice(lowerBound, upperBound);
      setCurrentViewKeys(getCurrentViewKeys);
    }
  };

  const onClickStartDate = () => {
    setshowFromDateCalendar((curr) => !curr);
    setShowToDateCalendar(false);
  };
  const onClickEndDate = () => {
    setShowToDateCalendar((curr) => !curr);
    setshowFromDateCalendar(false);
  };
  const onClickChangeDateFrom = (date: Date) => {
    setFromDate(date);
    setshowFromDateCalendar(false);
    setDateRangeChanged(true);
  };
  const onClickChangeDateTo = (date: Date) => {
    setToDate(date);
    setShowToDateCalendar(false);
    setDateRangeChanged(true);
  };
  const onClickApplyDateRange = () => {
    console.log(
      'APPLY DATE RANGE ::',
      setDateMidnightISOString(fromDate),
      setDateMidnightISOString(toDate)
    );
    setDateRangeChanged(false);
  };

  if (!userData) {
    return (
      <SContainer>
        <SUsernameContainer>Loading...</SUsernameContainer>
      </SContainer>
    );
  }

  if (hasError) {
    return (
      <SContainer>An error occurred. Please try again later...</SContainer>
    );
  }

  const Pagnation = () => (
    <SharePagination
      currentPage={currentPage}
      itemsPerPage={MAX_ROWS_PER_PAGE}
      totalItems={Math.ceil(userData.totalDays / MAX_DAYS_PER_ROW)}
      onChange={onPaginationChange}
    />
  );

  return (
    <SContainer>
      <SUsernameContainer>
        This profile belongs to:<SUsername>{userData.user}</SUsername>
      </SUsernameContainer>
      <STopContainer>
        <SFakeRange />
        <SRangeContainer>
          {showFromDateCalendar && (
            <SCalendarContainer className="from-date">
              <Calendar
                topLevelDate={fromDate}
                calendarHeight={CALENDAR_HEIGHT}
                restricDaysAfter={toDate}
                onClose={() => setshowFromDateCalendar(false)}
                onClickNewDate={onClickChangeDateFrom}
              />
            </SCalendarContainer>
          )}
          <SRange
            title="Select start date"
            onClick={onClickStartDate}
            className={`${showToDateCalendar ? 'fade' : ''} ${
              showFromDateCalendar ? 'selected' : ''
            }`}
          >
            {formatFullDateNoDay(fromDate)}
            <MdCalendarToday />
          </SRange>
          -
          {showToDateCalendar && (
            <SCalendarContainer className="to-date">
              <Calendar
                topLevelDate={toDate}
                calendarHeight={CALENDAR_HEIGHT}
                restrictDaysBefore={fromDate}
                onClose={() => setShowToDateCalendar(false)}
                onClickNewDate={onClickChangeDateTo}
              />
            </SCalendarContainer>
          )}
          <SRange
            title="Select end date"
            onClick={onClickEndDate}
            className={`${showFromDateCalendar ? 'fade' : ''} ${
              showToDateCalendar ? 'selected' : ''
            }`}
          >
            {formatFullDateNoDay(toDate)}
            <MdCalendarToday />
          </SRange>
        </SRangeContainer>
        <SApplyButton
          background={theme.primary}
          colour={theme.text}
          disabled={!dateRangeChanged}
          className={dateRangeChanged ? 'apply-enabled' : 'apply-disabled'}
          onClick={onClickApplyDateRange}
        >
          Apply
        </SApplyButton>
      </STopContainer>

      <Pagnation />

      <SUserDataContainer>
        {currentViewKeys.map((dates, keyIndex) => {
          return (
            <SRowContainer key={`date-row-${keyIndex}`}>
              <DateHeaderRow dates={dates} data={userData.data} />
              {ALL_MEAL_CARDS.map(({ id, title }) => (
                <MealDataRow
                  key={`meal-${id}-${keyIndex}}`}
                  id={id}
                  title={title}
                  data={userData.data}
                  dates={dates}
                />
              ))}
              {ALL_WELLNESS_CARDS.map(({ id, title }, index) => (
                <WellnessDataRow
                  key={`wellness-${id}-${keyIndex}`}
                  id={id}
                  title={title}
                  data={userData.data}
                  dates={dates}
                  firstIndex={index === 0}
                  lastIndex={index === ALL_WELLNESS_CARDS.length - 1}
                />
              ))}
            </SRowContainer>
          );
        })}
      </SUserDataContainer>
      <Pagnation />
    </SContainer>
  );
};

type TParams = { guid: string };

export const getServerSideProps: GetServerSideProps<ISharePageProps> = async (
  context
) => {
  const { guid } = context.params as TParams;

  const guidExists = await Promise.resolve(true);

  if (!guidExists) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      guid,
    },
  };
};

export default SharePage;
