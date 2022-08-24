import { useOnClickOutsideElement } from '@hooks/use-onclick-outside-element';
import {
  APP_THEME_DEFAULT,
  COLOURS,
  DAYS,
  OPACITY_30,
  WEEK_DAYS,
} from '@utils/constants';
import {
  formatMonthSmallYear,
  getBothDatesEqual,
  getCurrentDayInDate,
  getIsDayInTheFuture,
  getNewMonth,
  isLeapYear,
} from '@utils/date-utils';
import { IDayNumber, isDayNumberTypeGuard } from '@utils/type-guards';
import { FC, useRef, useState } from 'react';
import styled from 'styled-components';
import { MdArrowLeft, MdArrowRight } from 'react-icons/md';
import { useAllEntriesPerMonthContext } from '@store/all-entries-per-month-context';

const CALENDAR_HEIGHT = 320;
const MONTH_SELECTOR_HEIGHT = 30;
const DAY_NAME_HEIGHT = 28;
const DAY_GAP = 4;

interface ISDayContainer {
  rowHeight: number;
  isCurrentDay: boolean;
  backgroundColour: string;
  bottomLeft: boolean;
  bottomRight: boolean;
  isSelectedDay: boolean;
  isOtherMonthDay?: boolean;
}
interface ISDayHasEntry {
  isSelectedDay: boolean;
}

const SContainer = styled.div`
  width: 100%;
  border-radius: 10px;
  background: white;
  display: flex;
  flex-direction: column;
  padding: 4px;
  box-shadow: 0px 8px 20px -8px ${COLOURS.gray_dark};
  height: ${CALENDAR_HEIGHT + MONTH_SELECTOR_HEIGHT + 8}px;
`;
const SDateSelectorContainer = styled.div`
  font-size: 20px;
  font-weight: 200;
  display: flex;
  align-items: center;
  justify-content: space-around;

  height: ${MONTH_SELECTOR_HEIGHT}px;
`;
const SDateTitle = styled.div`
  width: 180px;
  text-align: center;
`;
const SButtonCommon = styled.button`
  cursor: pointer;
  border: none;
  background: transparent;
  line-height: 0;

  :hover {
    opacity: 0.7;
    scale: 1.2;
  }
`;
const SButtonLeft = styled(SButtonCommon)``;
const SButtonRight = styled(SButtonCommon)``;
const SMonthContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${DAY_GAP}px;
`;
const SWeekContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${DAY_GAP}px;
`;
const SDayNameContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  font-size: 12px;
  align-items: end;
  font-weight: 500;
  height: ${DAY_NAME_HEIGHT}px;
`;
const SDayContainer = styled.div<ISDayContainer>`
  display: flex;
  flex-direction: row;
  flex: 1;
  font-size: 14px;
  padding: 0 4px;
  cursor: ${({ isOtherMonthDay }) =>
    !isOtherMonthDay ? 'pointer' : 'inherit'};

  font-weight: ${({ isCurrentDay }) => (isCurrentDay ? 'bold' : '200')};
  height: ${({ rowHeight }) => rowHeight}px;
  color: ${({ isCurrentDay }) =>
    isCurrentDay ? APP_THEME_DEFAULT.primary : APP_THEME_DEFAULT.textDark};
  ${({ bottomRight }) => bottomRight && `border-radius: 0 0 5px 0`};
  ${({ bottomLeft }) => bottomLeft && `border-radius: 0 0 0 5px`};
  ${({ backgroundColour }) =>
    backgroundColour && `background-color: ${backgroundColour}`};
  ${({ isOtherMonthDay }) => isOtherMonthDay && `opacity: 0.4`};
  ${({ isSelectedDay }) =>
    isSelectedDay &&
    `background-color: ${APP_THEME_DEFAULT.primary}${OPACITY_30};`};
`;
const STitleRow = styled.div``;
const SDayRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;
const SDayHasEntry = styled.div<ISDayHasEntry>`
  height: 8px;
  width: 100%;
  border-radius: 8px;
  background: ${({ isSelectedDay }) =>
    isSelectedDay ? APP_THEME_DEFAULT.secondary : APP_THEME_DEFAULT.primary};
`;

const generateMatrix = (selectedMonth: Date) => {
  const newDate = new Date(selectedMonth);
  const matrix: (string | IDayNumber)[][] = [WEEK_DAYS];

  const year = newDate.getFullYear();
  const month = newDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const maxDays = DAYS[month] + isLeapYear(month, year);

  let counter = 1;
  let nextMonthCounter = 1;
  for (let row = 1; row < 7; row++) {
    matrix[row] = [];
    for (let col = 0; col < 7; col++) {
      if (row === 1 && col >= firstDay) {
        matrix[row][col] = { day: counter++ };
      } else if (row > 1 && counter <= maxDays) {
        matrix[row][col] = { day: counter++ };
      } else if (row > 1) {
        matrix[row][col] = { day: nextMonthCounter++, otherMonthDay: true };
      } else {
        const previous = getNewMonth(selectedMonth, false, newDate);
        const previousMonth = previous.getMonth();

        const daysInPreviousMonth =
          DAYS[previousMonth] +
          isLeapYear(previousMonth, previous.getFullYear());
        const previousDate = daysInPreviousMonth - (firstDay - col - 1);

        matrix[row][col] = { day: previousDate, otherMonthDay: true };
      }
    }
  }

  return matrix;
};

interface ICalendarProps {
  topLevelDate: string;
  selectedMonthDate: Date;
  onDayClicked: (day: number) => void;
}
interface ICalendarContainerProps {
  topLevelDate: string;
  onClickNewDate: (newDate: Date) => void;
  onClose: () => void;
}
interface IDateSelectorProps {
  selectedMonthDate: Date;
  onSelectPreviousMonth: () => void;
  onSelectNextMonth: () => void;
}

const DateSelector: FC<IDateSelectorProps> = ({
  selectedMonthDate,
  onSelectPreviousMonth,
  onSelectNextMonth,
}) => {
  return (
    <SDateSelectorContainer>
      <SButtonLeft onClick={onSelectPreviousMonth}>
        <MdArrowLeft size={30} color={COLOURS.black} />
      </SButtonLeft>
      <SDateTitle>{formatMonthSmallYear(selectedMonthDate)}</SDateTitle>
      <SButtonRight onClick={onSelectNextMonth}>
        <MdArrowRight size={30} color={COLOURS.black} />
      </SButtonRight>
    </SDateSelectorContainer>
  );
};

const Calendar: FC<ICalendarProps> = ({
  topLevelDate,
  selectedMonthDate,
  onDayClicked,
}) => {
  const { allEntriesPerMonth } = useAllEntriesPerMonthContext();

  const currentMonthYear = formatMonthSmallYear(selectedMonthDate);
  const entriesPerMonth = allEntriesPerMonth[currentMonthYear];
  const matrix = generateMatrix(selectedMonthDate);
  const maxRows = (matrix[6][0] as IDayNumber).otherMonthDay ? 5 : 6;

  const daySelectedHandler = (day: number, isDisabled: boolean | undefined) => {
    if (isDisabled) {
      return;
    }

    onDayClicked(day);
  };

  return (
    <SMonthContainer>
      {matrix.map((row, rowIndex) => {
        if (rowIndex === 6 && (row[0] as IDayNumber).otherMonthDay) {
          return null;
        }

        const rowItems = row.map((item, colIndex) => {
          const titleRow = rowIndex === 0;
          const rowHeight =
            (CALENDAR_HEIGHT - DAY_NAME_HEIGHT - maxRows * DAY_GAP) / maxRows;

          if (titleRow && !isDayNumberTypeGuard(item)) {
            return (
              <SDayNameContainer key={`col-${colIndex}`}>
                <STitleRow>{item}</STitleRow>
              </SDayNameContainer>
            );
          }

          if (!titleRow && isDayNumberTypeGuard(item)) {
            const dayHasEntry = entriesPerMonth?.includes(item.day);
            const currentDateFromDay = getCurrentDayInDate(
              selectedMonthDate,
              item.day
            );
            const isSelectedDay =
              getBothDatesEqual(topLevelDate, currentDateFromDay) &&
              !item.otherMonthDay;
            const isCurrentDay =
              item.day === new Date().getDate() && !item.otherMonthDay;
            const isDayInTheFuture = getIsDayInTheFuture(
              selectedMonthDate,
              item.day
            );

            return (
              <SDayContainer
                key={`col-${colIndex}`}
                rowHeight={rowHeight}
                backgroundColour={COLOURS.gray_light}
                isCurrentDay={isCurrentDay}
                onClick={() =>
                  daySelectedHandler(
                    item.day,
                    item.otherMonthDay || isDayInTheFuture
                  )
                }
                bottomLeft={rowIndex === maxRows && colIndex === 0}
                bottomRight={rowIndex === maxRows && colIndex === 6}
                isOtherMonthDay={item.otherMonthDay || isDayInTheFuture}
                isSelectedDay={isSelectedDay}
              >
                <SDayRow>
                  {item.day}
                  {dayHasEntry && (
                    <SDayHasEntry isSelectedDay={isSelectedDay} />
                  )}
                </SDayRow>
              </SDayContainer>
            );
          }
        });

        return (
          <SWeekContainer key={`row-${rowIndex}`}>{rowItems}</SWeekContainer>
        );
      })}
    </SMonthContainer>
  );
};

const CalendarContainer: FC<ICalendarContainerProps> = ({
  topLevelDate,
  onClose,
  onClickNewDate,
}) => {
  const calendarRef = useRef<HTMLDivElement>(null);
  const [selectedMonthDate, setSelectedMonthDate] = useState(
    new Date(topLevelDate)
  );
  useOnClickOutsideElement(calendarRef, onClose);

  const handleDayClicked = (day: number) => {
    const newDate = new Date(new Date(selectedMonthDate).setDate(day));
    onClickNewDate(newDate);
  };
  const previousMonthHandler = () => {
    setSelectedMonthDate(getNewMonth(selectedMonthDate, false));
  };
  const nextMonthHandler = () => {
    setSelectedMonthDate(getNewMonth(selectedMonthDate, true));
  };

  return (
    <SContainer ref={calendarRef}>
      <DateSelector
        selectedMonthDate={selectedMonthDate}
        onSelectNextMonth={nextMonthHandler}
        onSelectPreviousMonth={previousMonthHandler}
      />
      <Calendar
        topLevelDate={topLevelDate}
        selectedMonthDate={selectedMonthDate}
        onDayClicked={handleDayClicked}
      />
    </SContainer>
  );
};

export default CalendarContainer;
