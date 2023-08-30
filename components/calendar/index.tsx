import { useOnClickOutsideElement } from '@hooks/use-onclick-outside-element';
import { COLOURS, OPACITY_20, OPACITY_40 } from '@utils/app.constants';
import {
  dateNow,
  formatMonthNumberYear,
  formatMonthSmallYear,
  getNewMonth,
} from '@utils/date-utils';
import { IDayNumber, isDayNumberTypeGuard } from '@utils/type-guards';
import { FC, useRef, useState } from 'react';
import styled from 'styled-components';
import { MdArrowLeft, MdArrowRight } from 'react-icons/md';
import { TEntriePerMonth } from '@store/all-entries-per-month-context';
import {
  generateMonthMatrix,
  getCalendarDayProperties,
  getCalendarRestrictions,
} from '@utils/calendar-utils';
import { getClassNames } from '@utils/string-utils';
import { useTheme } from '@hooks/use-theme';

const CALENDAR_HEIGHT = 320;
const MONTH_SELECTOR_HEIGHT = 30;
const DAY_NAME_HEIGHT = 24;
const DAY_GAP = 2;

interface ISContainer {
  calendarHeight: number;
}
interface ISDayContainer {
  rowHeight: number;
  backgroundColour: string;
  bottomLeft: boolean;
  bottomRight: boolean;
}
interface ISDayHasEntry {
  background: string;
}
const SContainer = styled.div<ISContainer>`
  width: 100%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 4px;
  box-shadow: 0px 8px 20px -8px ${COLOURS.black}${OPACITY_40};
  height: ${({ calendarHeight }) =>
    `${calendarHeight + MONTH_SELECTOR_HEIGHT + 8}`}px;
  background-color: var(--bg-tertiary);
`;
const SDateSelectorContainer = styled.div`
  font-size: 20px;
  font-weight: 200;
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: ${MONTH_SELECTOR_HEIGHT}px;
`;
const SMonthNavigatorContainer = styled.div`
  display: flex;
  align-items: center;
`;
const STodayButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const SSelectTodayButton = styled.button`
  outline: none;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid var(--th-quaternary);
  background-color: var(--th-quaternary__40);
  color: var(--text);

  padding: 2px 12px;
  font-size: 14px;

  :hover {
    background-color: var(--th-quaternary__20);
  }

  :active {
    opacity: 0.6;
  }
`;
const SDateTitle = styled.div`
  width: 160px;
  text-align: center;
`;
const SButtonNext = styled.button`
  cursor: pointer;
  border: none;
  background: transparent;
  line-height: 0;
  scale: 0.8;
  padding: 0;

  :hover {
    opacity: 0.7;
    scale: 1;
  }
`;
const SButtonLeft = styled(SButtonNext)``;
const SButtonRight = styled(SButtonNext)``;
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
  padding: 0 2px;
  cursor: pointer;
  font-weight: 200;
  box-shadow: inset 0 0 0 1px ${COLOURS.gray}${OPACITY_20};
  height: ${({ rowHeight }) => rowHeight}px;

  ${({ bottomRight }) => bottomRight && `border-radius: 0 0 5px 0`};
  ${({ bottomLeft }) => bottomLeft && `border-radius: 0 0 0 5px`};
  background-color: ${({ backgroundColour }) => backgroundColour};

  &.selected-date {
    background-color: var(--th-primary__80);
  }

  &.today {
    font-weight: bold;
  }

  &.selected-date {
    .day-entry {
      background: ${({ backgroundColour }) => backgroundColour};
    }
  }

  &.selected-date&.today {
    display: flex;
    align-items: center;

    > div:first-of-type {
      height: calc(100% - 4px);
      padding: 0 2px;
      gap: 4px;
    }
  }

  &.selected-from-date {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  &.selected-to-date {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  &.inbetween-from-to-dates {
    box-shadow: inset 0px 1px 0px 0px var(--th-primary),
      inset 0px -1px 0px 0px var(--th-primary);
  }

  &.restrict-before:not(&.peripheral-month) {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    box-shadow: inset 2px 0px 0px 0px var(--th-primary),
      inset 0px 1px 0px 0px var(--th-primary),
      inset 0px -1px 0px 0px var(--th-primary);
  }
  &.restrict-after:not(&.peripheral-month) {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    box-shadow: inset -2px 0px 0px 0px var(--th-primary),
      inset 0px 1px 0px 0px var(--th-primary),
      inset 0px -1px 0px 0px var(--th-primary);
  }

  &.restricted-day {
    cursor: inherit;
    opacity: 0.4;
  }

  &.peripheral-month {
    cursor: inherit;
    opacity: 0.1;
  }
`;
const STitleRow = styled.div``;
const SDayRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 2px;
  gap: 4px;
`;
const SDayHasEntry = styled.div`
  height: 8px;
  width: 80%;
  border-radius: 8px;
  background: var(--th-primary);
`;

interface ICalendarContentProps {
  topLevelDate: string | Date;
  calendarHeight: number;
  selectedMonthDate: Date;
  restricDaysAfter?: string | Date;
  restrictDaysBefore?: string | Date;
  allEntriesPerMonth?: TEntriePerMonth;
  onDayClicked: (day: number) => void;
}
interface ICalendarProps {
  topLevelDate: string | Date;
  calendarHeight?: number;
  allEntriesPerMonth?: TEntriePerMonth;
  restricDaysAfter?: string | Date;
  restrictDaysBefore?: string | Date;
  onClickNewDate: (newDate: Date) => void;
  onClose: () => void;
  onClickPreviousMonth?: (month: Date) => void;
  onClickNextMonth?: (month: Date) => void;
}
interface IDateSelectorProps {
  selectedMonthDate: Date;
  onSelectPreviousMonth: () => void;
  onSelectNextMonth: () => void;
  onSelectToday: () => void;
}

const DateSelector: FC<IDateSelectorProps> = ({
  selectedMonthDate,
  onSelectPreviousMonth,
  onSelectNextMonth,
  onSelectToday,
}) => {
  return (
    <SDateSelectorContainer>
      <STodayButtonContainer>
        <SSelectTodayButton onClick={onSelectToday}>Today</SSelectTodayButton>
      </STodayButtonContainer>
      <SMonthNavigatorContainer>
        <SButtonLeft onClick={onSelectPreviousMonth}>
          <MdArrowLeft size={44} color={'var(--text)'} />
        </SButtonLeft>
        <SDateTitle>{formatMonthSmallYear(selectedMonthDate)}</SDateTitle>
        <SButtonRight onClick={onSelectNextMonth}>
          <MdArrowRight size={44} color={'var(--text)'} />
        </SButtonRight>
      </SMonthNavigatorContainer>
    </SDateSelectorContainer>
  );
};

const CalendarContent: FC<ICalendarContentProps> = ({
  calendarHeight,
  topLevelDate,
  selectedMonthDate,
  allEntriesPerMonth,
  restricDaysAfter,
  restrictDaysBefore,
  onDayClicked,
}) => {
  const { darkMode } = useTheme();

  const currentMonthYear = formatMonthNumberYear(selectedMonthDate);
  const entriesPerMonth = allEntriesPerMonth?.[currentMonthYear];
  const matrix = generateMonthMatrix(selectedMonthDate);
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
            (calendarHeight - DAY_NAME_HEIGHT - maxRows * DAY_GAP) / maxRows;

          if (titleRow && !isDayNumberTypeGuard(item)) {
            return (
              <SDayNameContainer key={`col-${colIndex}`}>
                <STitleRow>{item}</STitleRow>
              </SDayNameContainer>
            );
          }

          if (!titleRow && isDayNumberTypeGuard(item)) {
            const {
              calendarDay,
              dayHasEntry,
              isDayInTheFuture,
              isPeripheralMonth,
              isSelectedDay,
              isToday,
            } = getCalendarDayProperties({
              day: item.day,
              otherMonthDay: item.otherMonthDay,
              entriesPerMonth,
              selectedDay: selectedMonthDate,
              topLevelDate,
            });
            const { isDayRestricted, isRestrictAfterDay, isRestrictBeforeDay } =
              getCalendarRestrictions({
                calendarDay,
                restricDaysAfter,
                restrictDaysBefore,
              });

            const classNames = getClassNames({
              'peripheral-month': item.otherMonthDay,
              'restricted-day': isDayInTheFuture || isDayRestricted,
              today: isToday && !isPeripheralMonth,
              'selected-date': isSelectedDay && !isPeripheralMonth,
              'restrict-before': isRestrictBeforeDay,
              'restrict-after': isRestrictAfterDay,
              'selected-from-date': isSelectedDay && !!restricDaysAfter,
              'selected-to-date':
                isSelectedDay &&
                !!restrictDaysBefore &&
                !(restrictDaysBefore && restricDaysAfter),
            });

            return (
              <SDayContainer
                key={`col-${colIndex}`}
                rowHeight={rowHeight}
                backgroundColour={
                  darkMode ? 'var(--bg-secondary)' : COLOURS.gray_light
                }
                onClick={() =>
                  daySelectedHandler(
                    item.day,
                    isPeripheralMonth || isDayRestricted,
                  )
                }
                bottomLeft={rowIndex === maxRows && colIndex === 0}
                bottomRight={rowIndex === maxRows && colIndex === 6}
                className={classNames}
              >
                <SDayRow>
                  {item.day}
                  {dayHasEntry && <SDayHasEntry className="day-entry" />}
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

const Calendar: FC<ICalendarProps> = ({
  topLevelDate,
  allEntriesPerMonth,
  restrictDaysBefore,
  restricDaysAfter,
  calendarHeight = CALENDAR_HEIGHT,
  onClose,
  onClickNewDate,
  onClickPreviousMonth,
  onClickNextMonth,
}) => {
  const calendarRef = useRef<HTMLDivElement>(null);
  const [selectedMonthDate, setSelectedMonthDate] = useState(
    new Date(topLevelDate),
  );
  useOnClickOutsideElement(calendarRef, onClose);

  const handleDayClicked = (day: number) => {
    const newDate = new Date(new Date(selectedMonthDate).setDate(day));
    onClickNewDate(newDate);
  };
  const previousMonthHandler = () => {
    const month = new Date(getNewMonth(selectedMonthDate, 'prev'));
    setSelectedMonthDate(month);
    onClickPreviousMonth?.(month);
  };
  const nextMonthHandler = () => {
    const month = new Date(getNewMonth(selectedMonthDate, 'next'));
    setSelectedMonthDate(month);
    onClickNextMonth?.(month);
  };
  const onSelecteTodayHandler = () => {
    setSelectedMonthDate(new Date(dateNow()));
  };

  return (
    <SContainer ref={calendarRef} calendarHeight={calendarHeight}>
      <DateSelector
        selectedMonthDate={selectedMonthDate}
        onSelectNextMonth={nextMonthHandler}
        onSelectPreviousMonth={previousMonthHandler}
        onSelectToday={onSelecteTodayHandler}
      />
      <CalendarContent
        calendarHeight={calendarHeight}
        topLevelDate={topLevelDate}
        selectedMonthDate={selectedMonthDate}
        allEntriesPerMonth={allEntriesPerMonth}
        restrictDaysBefore={restrictDaysBefore}
        restricDaysAfter={restricDaysAfter}
        onDayClicked={handleDayClicked}
      />
    </SContainer>
  );
};

export default Calendar;
