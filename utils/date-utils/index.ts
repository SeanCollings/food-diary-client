import { MONTHS, ONE_DAY } from '@utils/constants';

type TDate = string | Date;

export const getTodaysDate = () =>
  new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

/**
 * Converts date to format `Thursday, 29 Sept 2022`
 * @param date string | Date
 * @returns string
 */
export const formatFullDate = (date: TDate | null) => {
  if (!date) {
    return '';
  }

  const d = new Date(date);
  return d.toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Converts date to format `29 Sept 2022`
 * @param date string | Date
 * @returns string
 */
export const formatFullDateNoDay = (date: TDate) => {
  const d = new Date(date);
  return d.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Converts date to format `Sep 2022`
 * @param date string | Date
 * @returns string
 */
export const formatMonthSmallYear = (date: TDate) => {
  const newDate = new Date(date);
  const year = newDate.getFullYear().toString();
  const month = newDate.toLocaleString('en-US', { month: 'short' });
  return `${month} ${year}`;
};

/**
 * Converts date to format `September 2022`
 * @param date string | Date
 * @returns string
 */
export const formatMonthMediumYear = (date: TDate) => {
  const newDate = new Date(date);
  const year = newDate.getFullYear().toString();
  const month = MONTHS[newDate.getMonth()];
  return `${month} ${year}`;
};

/**
 * Converts date to format `10-2022`
 * @param date string | Date
 * @returns string
 */
export const formatMonthNumberYear = (date: TDate | null) => {
  const d = date || new Date();
  return getMonthAndYearFromDate(d).join('-');
};

export const getMonthAndYearFromDate = (date: TDate) => {
  const d = new Date(date || new Date());
  const currentMonth = d.getMonth();
  const currentYear = d.getFullYear();

  return [currentMonth, currentYear];
};

export const getCurrentMonthAndYear = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  return [currentMonth, currentYear];
};

export const getMidnightISODaysInMonth = (month: number, year: number) => {
  const date = new Date(year, month, 1);
  const days: string[] = [];

  while (date.getMonth() === month) {
    days.push(setDateMidnightISOString(date));
    date.setDate(date.getDate() + 1);
  }

  return days;
};

export const isCurrentMonth = (compareDate: TDate) => {
  const date = new Date(compareDate);
  const [currentMonth, currentYear] = getCurrentMonthAndYear();

  return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
};

export const isMonthInFuture = (compareDate: Date) => {
  const [currentMonth, currentYear] = getCurrentMonthAndYear();

  return (
    (compareDate.getMonth() > currentMonth &&
      compareDate.getFullYear() === currentYear) ||
    compareDate.getFullYear() > currentYear
  );
};

export const getCurrentDayInDate = (date: TDate, day: number) =>
  new Date(new Date(date).setDate(day));

export const getTodaysDateFromDay = (day: number) =>
  getCurrentDayInDate(new Date(), day);

export const isDayInMonthInFuture = (compareDay: number) => {
  const d = new Date(Date.now()).setDate(compareDay);
  return setDateToMidnight(d) > setDateToMidnight();
};

export const getIsDayInTheFuture = (compareDate: Date, compareDay: number) =>
  isMonthInFuture(compareDate) ||
  (isCurrentMonth(compareDate) && isDayInMonthInFuture(compareDay));

export const getBothDatesEqual = (firstDate: TDate, secondDate: Date) => {
  return (
    setDateToMidnight(firstDate).getTime() ===
    setDateToMidnight(secondDate).getTime()
  );
};

export const getDayFromDate = (date: TDate) => new Date(date).getDate();

export const isBetweenDates = (compare: TDate, from: TDate, to: TDate) =>
  new Date(compare).valueOf() > new Date(from).valueOf() &&
  new Date(compare).valueOf() < new Date(to).valueOf();

export const isLeapYear = (month: number, year: number) => {
  if (month === 1) {
    if ((year % 4 === 0 && year % 100 != 0) || year % 400 === 0) {
      return 1;
    }
  }
  return 0;
};

export const getNewDay = (selectedDate: TDate, getNextDay: boolean) => {
  const date = new Date(selectedDate);
  date.setDate(date.getDate() + (getNextDay ? 1 : -1));
  return date;
};

type TMonthDirection = 'previous' | 'next';

export const getNewMonth = (
  selectedMonth: Date,
  direction: TMonthDirection
) => {
  const firstDayOfMonth = new Date(
    selectedMonth.getFullYear(),
    selectedMonth.getMonth(),
    1
  );

  firstDayOfMonth.setMonth(
    firstDayOfMonth.getMonth() + (direction === 'next' ? 1 : -1)
  );
  return firstDayOfMonth;
};

export const getIsDateSelectedToday = (compareDate: TDate) => {
  return (
    new Date(compareDate).setHours(0, 0, 0, 0) ===
    new Date().setHours(0, 0, 0, 0)
  );
};

export const setDateToMidnight = (date?: string | number | Date) => {
  const d = date || Date.now();
  return new Date(new Date(d).setHours(0, 0, 0, 0));
};

/**
 * Converts date to format `2022-10-04T22:00:00.000Z`
 * @param date string | Date
 * @returns string
 */
export const setDateMidnightISOString = (date: TDate) => {
  return setDateToMidnight(date).toISOString();
};

export const getDaysAwayFromDate = (days: number, date?: TDate) => {
  const d = date ? new Date(date) : new Date();
  d.setDate(d.getDate() + days);

  return d;
};

export const isDayAfter = (thisDate: TDate, compareDate: TDate) => {
  return setDateToMidnight(thisDate) > setDateToMidnight(compareDate);
};

export const isDayBefore = (thisDate: TDate, compareDate: TDate) => {
  return setDateToMidnight(thisDate) < setDateToMidnight(compareDate);
};

/**
 * Get a date that is n number of months ago
 * @param date string | Date
 * @param monthsAgo number
 * @returns Date
 */
export const getDateMonthsAgo = (date: TDate, monthsAgo: number) => {
  const monthsAgoDate = new Date(date);
  monthsAgoDate.setMonth(monthsAgoDate.getMonth() - monthsAgo);

  return monthsAgoDate;
};

/**
 * Return number of days between 2 dates
 * @param start string | Date
 * @param end string | Date
 * @returns number
 */
export const getInclusiveDaysBetweenDates = (start: TDate, end: TDate) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  return (
    Math.round(Math.abs((startDate.valueOf() - endDate.valueOf()) / ONE_DAY)) +
    1
  );
};

/**
 * Return array of dates between 2 dates
 * @param first string | Date
 * @param second string | Date
 * @returns string[]
 */
export const getInclusiveDatesBetweenDates = (first: TDate, second: TDate) => {
  const firstDate = new Date(first);
  const secondDate = new Date(second);

  const startDate = firstDate > secondDate ? secondDate : firstDate;
  const endDate = firstDate > secondDate ? firstDate : secondDate;

  const date = new Date(startDate.getTime());

  const dates: string[] = [];

  while (date <= endDate) {
    dates.push(setDateMidnightISOString(new Date(date)));
    date.setDate(date.getDate() + 1);
  }

  return dates;
};

export const getRangeOfDatesFromDate = (
  date: TDate,
  days: number,
  direction: 'before' | 'after'
) => {
  const dir = direction === 'after' ? 1 : -1;
  const pointDate = new Date(date);
  const rangeDate = new Date(pointDate.getTime());
  rangeDate.setDate(pointDate.getDate() + dir * (days - 1));

  const range = getInclusiveDatesBetweenDates(pointDate, rangeDate);

  return range;
};

export const getDateRangeBackTillDayOfWeek = (
  date: TDate,
  dayOfWeek: number
) => {
  const pointDate = new Date(date);
  const dateRange: string[] = [setDateMidnightISOString(pointDate)];
  let currentDay = pointDate.getDay();

  while (currentDay !== dayOfWeek) {
    pointDate.setDate(pointDate.getDate() - 1);
    dateRange.push(setDateMidnightISOString(pointDate));
    currentDay -= 1;
  }

  return dateRange;
};

export const sortDateArray = (
  dateArray: string[],
  direction: 'asc' | 'desc'
) => {
  const dir = direction === 'asc' ? 1 : -1;
  return [...dateArray].sort(
    (a, b) => new Date(a).valueOf() - dir * new Date(b).valueOf()
  );
};
