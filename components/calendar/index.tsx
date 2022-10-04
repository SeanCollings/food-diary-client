import { useOnClickOutsideElement } from '@hooks/use-onclick-outside-element';
import { COLOURS, OPACITY_20, OPACITY_40 } from '@utils/constants';
import {
  formatMonthSmallYear,
  getBothDatesEqual,
  getCurrentDayInDate,
  getIsDateSelectedToday,
  getIsDayInTheFuture,
  getNewMonth,
} from '@utils/date-utils';
import { IDayNumber, isDayNumberTypeGuard } from '@utils/type-guards';
import { FC, useRef, useState } from 'react';
import styled from 'styled-components';
import { MdArrowLeft, MdArrowRight } from 'react-icons/md';
import { useAllEntriesPerMonthContext } from '@store/all-entries-per-month-context';
import { generateMonthMatrix } from '@utils/calendar-utils';
import { ThemeBackgroundTertiary } from '@components/ui/style-themed';
import { useTheme } from '@hooks/use-theme';

const CALENDAR_HEIGHT = 320;
const MONTH_SELECTOR_HEIGHT = 30;
const DAY_NAME_HEIGHT = 24;
const DAY_GAP = 4;

interface ISDayContainer {
  rowHeight: number;
  isCurrentDay: boolean;
  backgroundColour: string;
  bottomLeft: boolean;
  bottomRight: boolean;
  isSelectedDay: boolean;
  isPeripheralMonthDay?: boolean;
  primaryColour: string;
}
interface ISDayHasEntry {
  background: string;
}
interface ISSelectTodayButton {
  colour: string;
  background: string;
}

const SContainer = styled.div`
  width: 100%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 4px;
  box-shadow: 0px 8px 20px -8px ${COLOURS.black};
  height: ${CALENDAR_HEIGHT + MONTH_SELECTOR_HEIGHT + 8}px;
  ${ThemeBackgroundTertiary}
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
const SSelectTodayButton = styled.button<ISSelectTodayButton>`
  outline: none;
  cursor: pointer;
  color: ${({ colour }) => colour};
  border: 1px solid ${({ background }) => background};
  background-color: ${({ background }) => background}${OPACITY_40};
  border-radius: 4px;

  padding: 2px 12px;
  font-size: 14px;

  :hover {
    background-color: ${({ background }) => background}${OPACITY_20};
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
  padding: 0 4px;
  box-shadow: 0 0 0 1px ${COLOURS.gray}${OPACITY_20} inset;

  cursor: ${({ isPeripheralMonthDay }) =>
    !isPeripheralMonthDay ? 'pointer' : 'inherit'};
  font-weight: ${({ isCurrentDay }) => (isCurrentDay ? 'bold' : '200')};
  height: ${({ rowHeight }) => rowHeight}px;

  ${({ isCurrentDay, isSelectedDay, primaryColour }) =>
    isCurrentDay && !isSelectedDay && `color: ${primaryColour}`};
  ${({ isCurrentDay, primaryColour }) =>
    isCurrentDay && `box-shadow: 0 0 0 1px ${primaryColour} inset;`}
  ${({ bottomRight }) => bottomRight && `border-radius: 0 0 5px 0`};
  ${({ bottomLeft }) => bottomLeft && `border-radius: 0 0 0 5px`};
  ${({ backgroundColour }) =>
    backgroundColour && `background-color: ${backgroundColour}`};
  ${({ isPeripheralMonthDay }) => isPeripheralMonthDay && `opacity: 0.4`};
  ${({ isSelectedDay, primaryColour }) =>
    isSelectedDay && `background-color: ${primaryColour}${OPACITY_40};`};
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
  background: ${({ background }) => background};
`;

interface ICalendarContentProps {
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
  onSelectToday: () => void;
}

const DateSelector: FC<IDateSelectorProps> = ({
  selectedMonthDate,
  onSelectPreviousMonth,
  onSelectNextMonth,
  onSelectToday,
}) => {
  const theme = useTheme();

  return (
    <SDateSelectorContainer>
      <STodayButtonContainer>
        <SSelectTodayButton
          colour={theme.text}
          background={theme.quaternary}
          onClick={onSelectToday}
        >
          Today
        </SSelectTodayButton>
      </STodayButtonContainer>
      <SMonthNavigatorContainer>
        <SButtonLeft onClick={onSelectPreviousMonth}>
          <MdArrowLeft size={44} color={theme.text} />
        </SButtonLeft>
        <SDateTitle>{formatMonthSmallYear(selectedMonthDate)}</SDateTitle>
        <SButtonRight onClick={onSelectNextMonth}>
          <MdArrowRight size={44} color={theme.text} />
        </SButtonRight>
      </SMonthNavigatorContainer>
    </SDateSelectorContainer>
  );
};

const CalendarContent: FC<ICalendarContentProps> = ({
  topLevelDate,
  selectedMonthDate,
  onDayClicked,
}) => {
  const theme = useTheme();
  const { allEntriesPerMonth } = useAllEntriesPerMonthContext();

  const currentMonthYear = formatMonthSmallYear(selectedMonthDate);
  const entriesPerMonth = allEntriesPerMonth[currentMonthYear];
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
            const isCurrentDay = getIsDateSelectedToday(
              getCurrentDayInDate(selectedMonthDate, item.day)
            );
            const isDayInTheFuture = getIsDayInTheFuture(
              selectedMonthDate,
              item.day
            );
            const isPeripheralMonthDay = item.otherMonthDay || isDayInTheFuture;

            return (
              <SDayContainer
                key={`col-${colIndex}`}
                rowHeight={rowHeight}
                backgroundColour={
                  theme.darkMode
                    ? theme.backgroundSecondary
                    : COLOURS.gray_light
                }
                isCurrentDay={isCurrentDay && !isPeripheralMonthDay}
                onClick={() =>
                  daySelectedHandler(item.day, isPeripheralMonthDay)
                }
                bottomLeft={rowIndex === maxRows && colIndex === 0}
                bottomRight={rowIndex === maxRows && colIndex === 6}
                isPeripheralMonthDay={isPeripheralMonthDay}
                isSelectedDay={isSelectedDay && !isPeripheralMonthDay}
                primaryColour={theme.primary}
              >
                <SDayRow>
                  {item.day}
                  {dayHasEntry && !isPeripheralMonthDay && (
                    <SDayHasEntry background={theme.primary} />
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
    setSelectedMonthDate(getNewMonth(selectedMonthDate, 'previous'));
  };
  const nextMonthHandler = () => {
    setSelectedMonthDate(getNewMonth(selectedMonthDate, 'next'));
  };
  const onSelecteTodayHandler = () => {
    setSelectedMonthDate(new Date());
  };

  return (
    <SContainer ref={calendarRef}>
      <DateSelector
        selectedMonthDate={selectedMonthDate}
        onSelectNextMonth={nextMonthHandler}
        onSelectPreviousMonth={previousMonthHandler}
        onSelectToday={onSelecteTodayHandler}
      />
      <CalendarContent
        topLevelDate={topLevelDate}
        selectedMonthDate={selectedMonthDate}
        onDayClicked={handleDayClicked}
      />
    </SContainer>
  );
};

export default CalendarContainer;
