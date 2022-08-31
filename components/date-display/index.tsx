import { COLOURS, MEDIA_MOBILE } from '@utils/constants';
import { FC, useState } from 'react';
import styled from 'styled-components';
import { MdArrowRight, MdArrowLeft } from 'react-icons/md';
import CalendarContainer from '@components/calendar';
import {
  formatFullDate,
  getIsDateSelectedToday,
  getNewDay,
} from '@utils/date-utils';
import { useDateSelectedContext } from '@store/date-selected-context';

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

  ${({ calendarVisible }) =>
    calendarVisible && `transform: rotateX(90deg); cursor: initial;`}
`;
const SButtonLeft = styled(SButtonCommon)`
  margin-right: 10px;

  :hover {
    opacity: 0.7;
    scale: 1.1;
  }
`;
const SButtonRight = styled(SButtonCommon)<ISButton>`
  margin-left: 10px;

  ${({ isDisabled }) =>
    isDisabled
      ? `opacity: 0.2; cursor: initial;`
      : `
  :hover {
opacity: 0.7;
scale: 1.1;
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
  overflow: hidden:

  ${({ isCalendarShown }) => isCalendarShown && `opacity: 0.4`};

  :hover {
    ${({ isCalendarShown }) => !isCalendarShown && `opacity: 0.7`};
  }
`;
const SFullDateContainer = styled.div`
  min-width: 250px;
  text-align: center;
  position: relative;

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
    max-width: 100%;
    top: 50px;
  }
`;

const DateDisplay: FC = () => {
  const { dateSelectedISO, updateSelectedDateISO } = useDateSelectedContext();
  const [showCalendar, setShowCalendar] = useState(false);

  const isDateSelectedToday = getIsDateSelectedToday(dateSelectedISO);

  const onDateClick = () => {
    setShowCalendar(!showCalendar);
  };
  const onClickLeft = () => {
    updateSelectedDateISO(getNewDay(dateSelectedISO, false));
  };
  const onClickRight = () => {
    if (isDateSelectedToday) {
      return;
    }

    updateSelectedDateISO(getNewDay(dateSelectedISO, true));
  };
  const closeCalendarHandler = () => {
    setShowCalendar(false);
  };
  const onClickNewDateHandler = (newDate: Date) => {
    updateSelectedDateISO(newDate);
    setShowCalendar(false);
  };

  return (
    <SContainer>
      <SContentWrapper>
        <SButtonLeft onClick={onClickLeft} calendarVisible={showCalendar}>
          <MdArrowLeft size={32} color={COLOURS.gray} />
        </SButtonLeft>
        <SDate onClick={onDateClick} isCalendarShown={showCalendar}>
          <SFullDateContainer>
            {formatFullDate(dateSelectedISO)}
          </SFullDateContainer>
        </SDate>
        {showCalendar && (
          <SCalendarContainer>
            <CalendarContainer
              topLevelDate={dateSelectedISO}
              onClose={closeCalendarHandler}
              onClickNewDate={onClickNewDateHandler}
            />
          </SCalendarContainer>
        )}
        <SButtonRight
          onClick={onClickRight}
          isDisabled={isDateSelectedToday}
          disabled={isDateSelectedToday}
          calendarVisible={showCalendar}
        >
          <MdArrowRight size={32} color={COLOURS.gray} />
        </SButtonRight>
      </SContentWrapper>
    </SContainer>
  );
};

export default DateDisplay;
