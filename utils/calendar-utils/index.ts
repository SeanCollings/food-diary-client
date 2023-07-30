import { DAYS, WEEK_DAYS } from '@utils/constants/date.constants';
import {
  getBothDatesEqual,
  getCurrentDayInDate,
  getIsDateSelectedToday,
  getIsDayInTheFuture,
  getNewMonth,
  isDayAfter,
  isDayBefore,
  isLeapYear,
} from '@utils/date-utils';
import { IDayNumber } from '@utils/type-guards';

type TMonthMatrix = (string | IDayNumber)[][];

const monthMatrix = () => {
  const cache = {} as { [date: string]: TMonthMatrix };

  return (selectedMonth: Date) => {
    const selectedMonthString = selectedMonth.toString();

    if (!!cache[selectedMonthString]) {
      return cache[selectedMonthString];
    }

    const newDate = new Date(selectedMonth);
    const matrix: TMonthMatrix = [WEEK_DAYS];

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
          const previous = new Date(getNewMonth(selectedMonth, 'prev'));
          const previousMonth = previous.getMonth();

          const daysInPreviousMonth =
            DAYS[previousMonth] +
            isLeapYear(previousMonth, previous.getFullYear());
          const previousDate = daysInPreviousMonth - (firstDay - col - 1);

          matrix[row][col] = { day: previousDate, otherMonthDay: true };
        }
      }
    }

    cache[selectedMonthString] = matrix;

    return matrix;
  };
};

export const generateMonthMatrix = monthMatrix();

type TDate = string | Date;
export interface ICalendarDayProperties {
  day: number;
  otherMonthDay: boolean | undefined;
  selectedDay: Date;
  entriesPerMonth: number[] | undefined;
  topLevelDate: TDate;
}

export const getCalendarDayProperties = ({
  day,
  selectedDay,
  topLevelDate,
  otherMonthDay,
  entriesPerMonth,
}: ICalendarDayProperties) => {
  const calendarDay = getCurrentDayInDate(selectedDay, day);
  const isToday = getIsDateSelectedToday(calendarDay) && !otherMonthDay;

  const isDayInTheFuture = getIsDayInTheFuture(selectedDay, day);
  const isPeripheralMonth = otherMonthDay || isDayInTheFuture;
  const dayHasEntry = entriesPerMonth?.includes(day) && !isPeripheralMonth;
  const isSelectedDay =
    getBothDatesEqual(topLevelDate, calendarDay) && !otherMonthDay;

  return {
    isToday,
    calendarDay,
    dayHasEntry,
    isSelectedDay,
    isDayInTheFuture,
    isPeripheralMonth,
  };
};

interface ICalendarRestrictions {
  calendarDay: TDate;
  restrictDaysBefore?: TDate;
  restricDaysAfter?: TDate;
}

export const getCalendarRestrictions = ({
  calendarDay,
  restrictDaysBefore,
  restricDaysAfter,
}: ICalendarRestrictions) => {
  const isRestrictBeforeDay =
    (restrictDaysBefore &&
      getBothDatesEqual(restrictDaysBefore, calendarDay)) ||
    false;
  const isRestrictAfterDay =
    (restricDaysAfter && getBothDatesEqual(restricDaysAfter, calendarDay)) ||
    false;
  const isDayRestricted =
    (restrictDaysBefore && isDayBefore(calendarDay, restrictDaysBefore)) ||
    (restricDaysAfter && isDayAfter(calendarDay, restricDaysAfter)) ||
    false;

  return {
    isRestrictBeforeDay,
    isRestrictAfterDay,
    isDayRestricted,
  };
};
