import { FC, useState, useEffect, useCallback, useMemo } from 'react';
import {
  ALL_MEAL_CARDS,
  ALL_WELLNESS_CARDS,
  MEDIA_MAX_DESKTOP,
  MEDIA_MOBILE,
  MEDIA_MOBILE_TABLET,
  MEDIA_TABLET,
} from '@utils/constants';
import { formatFullDateNoDay } from '@utils/date-utils';
import styled from 'styled-components';
import Pagination from '@components/summary/pagination';
import { useTheme } from '@hooks/use-theme';
import { getPaddedNestedArray } from '@utils/array-utils';
import Calendar from '@components/calendar';
import { MdCalendarToday } from 'react-icons/md';
import { DateHeaderRow, MealDataRow, WellnessDataRow } from './content-rows';
import { IUserData } from './mock-data';

const CALENDAR_HEIGHT = 280;
const MAX_DAYS_PER_ROW = 2;
const MAX_ROWS_PER_PAGE = 4;

interface ISApplyButton {
  background: string;
  colour: string;
}
interface ISRowContainer {
  gridTemplateArea: string;
}

const SContainer = styled.div``;
const STopContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  padding: 0 0 20px 0;

  ${MEDIA_MOBILE} {
    padding: 0;
  }
  ${MEDIA_MOBILE_TABLET} {
    margin-top: 20px;
  }
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

  ${MEDIA_MOBILE} {
    gap: 10px;
    font-size: 16px;
  }
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
  background-color: var(--bg-secondary);

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

  ${MEDIA_MOBILE} {
    font-size: 18px;
    max-width: 150px;
    gap: 5px;
  }

  ${MEDIA_TABLET} {
    font-size: 20px;
    width: 170px;
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
const SRowContainer = styled.div<ISRowContainer>`
  display: grid;
  gap: 0px 20px;
  grid-template-columns: repeat(${MAX_DAYS_PER_ROW}, 1fr);

  ${MEDIA_MOBILE_TABLET} {
    grid-template-columns: 1fr;
    grid-template-areas: ${({ gridTemplateArea }) => gridTemplateArea};
  }
  ${MEDIA_TABLET} {
    grid-template-columns: 1fr;
  }
  ${MEDIA_MAX_DESKTOP} {
    gap: 0 50px;
  }
`;
const STopPaginationContainer = styled.div`
  width: 100%;
  ${MEDIA_MOBILE_TABLET} {
    margin-top: 20px;
  }
`;
const SBottomPaginationContainer = styled.div`
  margin-bottom: 20px;
`;

interface ISummaryProps {
  userData: IUserData;
  fromDate: Date;
  toDate: Date;
  updateFromDate: (date: Date) => void;
  updateToDate: (date: Date) => void;
  onDateRangeChanged: () => void;
}

const Summary: FC<ISummaryProps> = ({
  userData,
  fromDate,
  toDate,
  updateFromDate,
  updateToDate,
  onDateRangeChanged,
}) => {
  const theme = useTheme();
  const [currentPage, setcurrentPage] = useState(1);
  const [allViewKeys, setAllViewKeys] = useState<string[][]>([]);
  const [currentViewKeys, setCurrentViewKeys] = useState<string[][]>([]);
  const [dateRangeChanged, setDateRangeChanged] = useState(false);
  const [showToDateCalendar, setShowToDateCalendar] = useState(false);
  const [showFromDateCalendar, setshowFromDateCalendar] = useState(false);

  useEffect(() => {
    const allNestedDates = getPaddedNestedArray(
      userData.dates,
      userData.totalDays,
      MAX_DAYS_PER_ROW
    );

    const getCurrentViewKeys = allNestedDates.slice(0, MAX_ROWS_PER_PAGE);
    setCurrentViewKeys(getCurrentViewKeys);
    setAllViewKeys(allNestedDates);
  }, [userData]);

  const onPaginationChange = useCallback(
    (page: number) => {
      if (currentPage !== page && userData) {
        setcurrentPage(page);

        const lowerBound = (page - 1) * MAX_ROWS_PER_PAGE;
        const upperBound = MAX_ROWS_PER_PAGE * page;
        const getCurrentViewKeys = allViewKeys.slice(lowerBound, upperBound);
        setCurrentViewKeys(getCurrentViewKeys);
      }
    },
    [allViewKeys, currentPage, userData]
  );

  const onClickStartDate = () => {
    setshowFromDateCalendar((curr) => !curr);
    setShowToDateCalendar(false);
  };
  const onClickEndDate = () => {
    setShowToDateCalendar((curr) => !curr);
    setshowFromDateCalendar(false);
  };
  const onClickChangeDateFrom = (date: Date) => {
    updateFromDate(date);
    setshowFromDateCalendar(false);
    setDateRangeChanged(true);
  };
  const onClickChangeDateTo = (date: Date) => {
    updateToDate(date);
    setShowToDateCalendar(false);
    setDateRangeChanged(true);
  };
  const onClickApplyDateRange = () => {
    onDateRangeChanged();
    setDateRangeChanged(false);
  };

  const gridTemplateArea = useMemo(
    () =>
      `'date' '${ALL_MEAL_CARDS.map((meal) => meal.id).join(
        `' '`
      )}' '${ALL_WELLNESS_CARDS.map((meal) => meal.id).join(`' '`)}'`,
    []
  );

  return (
    <SContainer>
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

      <STopPaginationContainer>
        <Pagination
          currentPage={currentPage}
          itemsPerPage={MAX_ROWS_PER_PAGE}
          totalItems={Math.ceil(userData.totalDays / MAX_DAYS_PER_ROW)}
          onChange={onPaginationChange}
        />
      </STopPaginationContainer>

      <SUserDataContainer>
        {currentViewKeys.map((dates, keyIndex) => {
          return (
            <SRowContainer
              key={`date-row-${keyIndex}`}
              gridTemplateArea={gridTemplateArea}
            >
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

      <SBottomPaginationContainer>
        <Pagination
          currentPage={currentPage}
          itemsPerPage={MAX_ROWS_PER_PAGE}
          totalItems={Math.ceil(userData.totalDays / MAX_DAYS_PER_ROW)}
          onChange={onPaginationChange}
        />
      </SBottomPaginationContainer>
    </SContainer>
  );
};

export default Summary;
