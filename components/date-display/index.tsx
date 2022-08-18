import { COLOURS, MEDIA_MOBILE } from '@utils/constants';
import { FC, useState } from 'react';
import styled from 'styled-components';
import { MdArrowForwardIos, MdArrowBackIos } from 'react-icons/md';
import CalendarContainer from '@components/calendar';
import { formatFullDate, getNewDay, getNewMonth } from '@utils/date-utils';

interface ISButton {
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
    justify-content: space-between;
    height: 60px;
  }
`;
const SButtonCommon = styled.button`
  text-align: center;
  padding: 0;
  border: none;
  background: transparent;
  line-height: 0;
`;
const SButtonLeft = styled(SButtonCommon)`
  margin-right: 6px;
  cursor: pointer;

  :hover {
    opacity: 0.7;
    scale: 1.1;
  }
`;
const SButtonRight = styled(SButtonCommon)<ISButton>`
  margin-left: 10px;

  ${({ isDisabled }) =>
    isDisabled
      ? `opacity: 0.2;`
      : `
  cursor: pointer;
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

  ${({ isCalendarShown }) => isCalendarShown && `opacity: 0.4`};

  :hover {
    ${({ isCalendarShown }) => !isCalendarShown && `opacity: 0.7`};
  }
`;
const SFullDateContainer = styled.div`
  min-width: 250px;
  text-align: center;

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
    top: 70px;
  }
`;

const DateDisplay: FC = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedMonthDate, setSelectedMonthDate] = useState(
    new Date(Date.now())
  );

  const isDateSelectedToday =
    selectedMonthDate.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0);

  const onDateClick = () => {
    setShowCalendar(!showCalendar);
  };
  const onClickLeft = () => {
    setSelectedMonthDate(getNewDay(selectedMonthDate, false));
  };
  const onClickRight = () => {
    if (isDateSelectedToday) {
      return;
    }

    setSelectedMonthDate(getNewDay(selectedMonthDate, true));
  };
  const closeCalendarHandler = () => {
    setShowCalendar(false);
  };
  const onClickNewDateHandler = (newDate: Date) => {
    setSelectedMonthDate(newDate);
    setShowCalendar(false);
  };

  return (
    <SContainer>
      <SContentWrapper>
        <SButtonLeft onClick={onClickLeft}>
          <MdArrowBackIos size={28} color={COLOURS.gray} />
        </SButtonLeft>
        <SDate onClick={onDateClick} isCalendarShown={showCalendar}>
          <SFullDateContainer>
            {formatFullDate(selectedMonthDate)}
          </SFullDateContainer>
        </SDate>
        {showCalendar && (
          <SCalendarContainer>
            <CalendarContainer
              topLevelDate={selectedMonthDate}
              onClose={closeCalendarHandler}
              onClickNewDate={onClickNewDateHandler}
            />
          </SCalendarContainer>
        )}
        <SButtonRight
          onClick={onClickRight}
          isDisabled={isDateSelectedToday}
          disabled={isDateSelectedToday}
        >
          <MdArrowForwardIos size={28} color={COLOURS.gray} />
        </SButtonRight>
      </SContentWrapper>
    </SContainer>
  );
};

export default DateDisplay;
