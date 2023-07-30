import { MEDIA_MOBILE } from '@utils/app.constants';
import { FC, useState } from 'react';
import styled from 'styled-components';
import { MdArrowRight, MdArrowLeft } from 'react-icons/md';
import Calendar from '@components/calendar';
import {
  formatFullDate,
  getIsDateSelectedToday,
  getNewDay,
  setServerDateString,
} from '@utils/date-utils';
import { useDateSelectedContext } from '@store/date-selected-context';
import { useAllEntriesPerMonthContext } from '@store/all-entries-per-month-context';
import { useRequestCalendarEntries } from '@hooks/request/use-request-calendar-entires';

interface ISButtonCommon {
  calendarVisible: boolean;
}
interface ISButton extends ISButtonCommon {
  isDisabled: boolean;
}
interface ISDate {
  isCalendarShown: boolean;
}

const SContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  position: relative;
`;
const SContentWrapper = styled.div`
  display: flex;
  align-items: center;
  height: auto;

  ${MEDIA_MOBILE} {
    display: flex;
    width: 100%;
    justify-content: space-around;
    height: 60px;
  }
`;
const SButtonCommon = styled.button<ISButtonCommon>`
  transition: 0.1s;
  text-align: center;
  padding: 0;
  border: none;
  background: transparent;
  line-height: 0;
  transform: rotateX(0);
  cursor: pointer;
  scale: 0.8;
  will-change: auto;

  ${({ calendarVisible }) =>
    calendarVisible && `transform: rotateX(90deg); cursor: initial;`}
`;
const SButtonPrev = styled(SButtonCommon)`
  :hover {
    opacity: 0.7;
    scale: 1;
  }
`;
const SButtonNext = styled(SButtonCommon)<ISButton>`
  ${({ isDisabled }) =>
    isDisabled
      ? `opacity: 0.2; cursor: initial;`
      : `
  :hover {
opacity: 0.7;
scale: 1;
}`}
`;
const SDate = styled.button<ISDate>`
  text-align: right;
  font-size: 22px;
  font-weight: 200;
  cursor: pointer;
  padding: 0;
  border: none;
  background: transparent;
  overflow: hidden;

  ${({ isCalendarShown }) => isCalendarShown && `opacity: 0.4`};

  :hover {
    ${({ isCalendarShown }) => !isCalendarShown && `opacity: 0.7`};
  }
`;
const SFullDateContainer = styled.div`
  min-width: 250px;
  text-align: center;
  position: relative;
  color: var(--text);

  ${MEDIA_MOBILE} {
    width: 100%;
    min-width: auto;
  }
`;
const SCalendarContainer = styled.div`
  position: absolute;
  max-width: 340px;
  width: 100%;
  right: 0;
  top: 40px;
  height: auto;
  z-index: 1;

  ${MEDIA_MOBILE} {
    top: 50px;
  }
`;

const DateDisplay: FC = () => {
  const { allEntriesPerMonth } = useAllEntriesPerMonthContext();
  const { dateSelectedISO, updateSelectedDateISO } = useDateSelectedContext();
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarDate, setCalendarDate] = useState<string | null>(null);
  const {} = useRequestCalendarEntries(calendarDate);

  const isDateSelectedToday = getIsDateSelectedToday(dateSelectedISO);

  const onDateMouseEnter = () => {
    setCalendarDate(dateSelectedISO);
  };
  const onDateClick = () => {
    setShowCalendar(!showCalendar);
  };
  const onClickPrev = () => {
    updateSelectedDateISO(getNewDay(dateSelectedISO, 'prev'));
  };
  const onClickNext = () => {
    if (isDateSelectedToday) {
      return;
    }
    updateSelectedDateISO(getNewDay(dateSelectedISO, 'next'));
  };
  const closeCalendarHandler = () => {
    setShowCalendar(false);
  };
  const onClickNewDateHandler = (newDate: Date) => {
    updateSelectedDateISO(newDate);
    setShowCalendar(false);
  };
  const onClickPreviousMonth = (month: Date) => {
    setCalendarDate(setServerDateString(month));
  };
  const onClickNextMonth = (month: Date) => {
    setCalendarDate(setServerDateString(month));
  };

  return (
    <SContainer>
      <SContentWrapper>
        <SButtonPrev onClick={onClickPrev} calendarVisible={showCalendar}>
          <MdArrowLeft size={46} color={'var(--th-quaternary)'} />
        </SButtonPrev>
        <SDate
          onMouseEnter={onDateMouseEnter}
          onClick={onDateClick}
          isCalendarShown={showCalendar}
        >
          <SFullDateContainer>
            {formatFullDate(dateSelectedISO)}
          </SFullDateContainer>
        </SDate>
        {showCalendar && (
          <SCalendarContainer>
            <Calendar
              topLevelDate={dateSelectedISO}
              allEntriesPerMonth={allEntriesPerMonth}
              onClose={closeCalendarHandler}
              onClickNewDate={onClickNewDateHandler}
              onClickPreviousMonth={onClickPreviousMonth}
              onClickNextMonth={onClickNextMonth}
            />
          </SCalendarContainer>
        )}
        <SButtonNext
          onClick={onClickNext}
          isDisabled={isDateSelectedToday}
          disabled={isDateSelectedToday}
          calendarVisible={showCalendar}
        >
          <MdArrowRight size={46} color={'var(--th-quaternary)'} />
        </SButtonNext>
      </SContentWrapper>
    </SContainer>
  );
};

export default DateDisplay;
