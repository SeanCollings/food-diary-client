import { MONTHS } from '@utils/constants';

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

export const getCurrentMonthAndYear = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  return [currentMonth, currentYear];
};

export const isCurrentMonth = (compareDate: Date) => {
  const [currentMonth, currentYear] = getCurrentMonthAndYear();

  return (
    compareDate.getMonth() + 1 === currentMonth &&
    compareDate.getFullYear() === currentYear
  );
};

export const isMonthInFuture = (compareDate: Date) => {
  const [currentMonth, currentYear] = getCurrentMonthAndYear();

  return (
    (compareDate.getMonth() + 1 > currentMonth &&
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

export const getDaysAwayFromDate = (date: Date, days: number) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);

  return d;
};

export const isDayAfter = (thisDate: TDate, compareDate: TDate) => {
  return setDateToMidnight(thisDate) > setDateToMidnight(compareDate);
};

export const isDayBefore = (thisDate: TDate, compareDate: TDate) => {
  return setDateToMidnight(thisDate) < setDateToMidnight(compareDate);
};
