import { MONTHS, ONE_DAY } from '@utils/constants';

type TDate = string | Date;

/**
 * Get the current date using Date.now() to more easily mock date
 * @returns Date
 */
export const dateNow = () => new Date(Date.now());

/**
 * Get todays date in format `Monday, 1 May 2023`
 * @param date string | Date
 * @returns string
 */
export const getTodaysDate = () =>
  new Date(dateNow()).toLocaleDateString('en-GB', {
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
  const d = date || new Date(dateNow());
  return getMonthAndYearFromDate(d).join('-');
};

/**
 * Splits date into array `[3, 2023]`
 * @param date string | Date
 * @returns number[]
 */
export const getMonthAndYearFromDate = (date: TDate) => {
  const d = new Date(date || new Date(dateNow()));
  const currentMonth = d.getMonth();
  const currentYear = d.getFullYear();

  return [currentMonth, currentYear];
};

/**
 * Splits date into array `[3, 2023]` for current month and year
 * @returns number[]
 */
export const getCurrentMonthAndYear = () => {
  const currentDate = new Date(dateNow());
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  return [currentMonth, currentYear];
};

/**
 * Get all ISO midnight adjusted dates in month eg: `['2023-02-28T22:00:00.000Z']`
 * @param month number
 * @param year number
 * @returns string[]
 */
export const getMidnightISODaysInMonth = (month: number, year: number) => {
  const date = new Date(year, month, 1);
  const days: string[] = [];

  while (date.getMonth() === month) {
    days.push(setDateMidnightISOString(date));
    date.setDate(date.getDate() + 1);
  }

  return days;
};

/**
 * Check if date is in current month
 * @param compareDate string | Date
 * @returns boolean
 */
export const isCurrentMonth = (compareDate: TDate) => {
  const date = new Date(compareDate);
  const [currentMonth, currentYear] = getCurrentMonthAndYear();

  return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
};

/**
 * Checks if date is month in future
 * @param compareDate string | Date
 * @returns boolean
 */
export const isMonthInFuture = (compareDate: Date) => {
  const [currentMonth, currentYear] = getCurrentMonthAndYear();

  return (
    (compareDate.getMonth() > currentMonth &&
      compareDate.getFullYear() === currentYear) ||
    compareDate.getFullYear() > currentYear
  );
};

/**
 * Gets date for day input in month input of date
 * @param date string | Date
 * @param day number
 * @returns Date
 */
export const getCurrentDayInDate = (date: TDate, day: number) =>
  new Date(new Date(date).setDate(day));

/**
 * Checks if day in current month is in the future
 * @param compareDay number
 * @returns boolean
 */
export const isDayInMonthInFuture = (compareDay: number) => {
  const d = new Date(Date.now()).setDate(compareDay);
  return setDateToMidnight(d) > setDateToMidnight();
};

/**
 * Checks if day in month or month in future
 * @param compareDate Date
 * @param compareDay number
 * @returns boolean
 */
export const getIsDayInTheFuture = (compareDate: Date, compareDay: number) =>
  isMonthInFuture(compareDate) ||
  (isCurrentMonth(compareDate) && isDayInMonthInFuture(compareDay));

/**
 * Checks if both dates are the same
 * @param firstDate string | Date
 * @param secondDate string | Date
 * @returns boolean
 */
export const getBothDatesEqual = (firstDate: TDate, secondDate: Date) => {
  return (
    setDateToMidnight(firstDate).getTime() ===
    setDateToMidnight(secondDate).getTime()
  );
};

/**
 * Gets day value from date
 * @param date string | Date
 * @returns number
 */
export const getDayFromDate = (date: TDate) => new Date(date).getDate();

/**
 * Checks if one date is between 2 other dates
 */
export const isBetweenDates = (compare: TDate, from: TDate, to: TDate) =>
  new Date(compare).valueOf() > new Date(from).valueOf() &&
  new Date(compare).valueOf() < new Date(to).valueOf();

/**
 * Checks if month in year is a leap year
 */
export const isLeapYear = (month: number, year: number) => {
  if (month === 1) {
    if ((year % 4 === 0 && year % 100 != 0) || year % 400 === 0) {
      return 1;
    }
  }
  return 0;
};

type TDateDirection = 'prev' | 'next';

/**
 * Gets next day from date else previous day
 */
export const getNewDay = (selectedDate: TDate, getNextDay: TDateDirection) => {
  const date = new Date(selectedDate);
  date.setDate(date.getDate() + (getNextDay === 'next' ? 1 : -1));
  return date;
};

/**
 * Gets next month from date else previous month
 */
export const getNewMonth = (selectedMonth: Date, direction: TDateDirection) => {
  const firstDayOfMonth = new Date(
    selectedMonth.getFullYear(),
    selectedMonth.getMonth(),
    1,
  );

  firstDayOfMonth.setMonth(
    firstDayOfMonth.getMonth() + (direction === 'next' ? 1 : -1),
  );
  return firstDayOfMonth;
};

/**
 * Checks if date is today
 */
export const getIsDateSelectedToday = (compareDate: TDate) => {
  return (
    new Date(compareDate).setHours(0, 0, 0, 0) ===
    new Date(dateNow()).setHours(0, 0, 0, 0)
  );
};

/**
 * Converts date to midnight in format `2022-10-04T22:00:00.000Z`
 */
export const setDateToMidnight = (date?: string | number | Date) => {
  const d = date || Date.now();
  return new Date(new Date(d).setHours(0, 0, 0, 0));
};

/**
 * Converts date to format `2022-10-04T22:00:00.000Z`
 * @param date string | Date
 * @returns string
 */
export const setDateMidnightISOString = (date?: TDate) => {
  return setDateToMidnight(date).toISOString();
};

/**
 * Gets a number of days away from date, else from `today` as default
 */
export const getDaysAwayFromDate = (days: number, date?: TDate) => {
  const d = date ? new Date(date) : new Date(dateNow());
  d.setDate(d.getDate() + days);

  return d;
};

/**
 * Checks if a date is after another date, time excluded
 * @param thisDate string | Date - date of interest
 * @param compareDate string | Date - date to compare agains
 * @returns boolean
 */
export const isDayAfter = (thisDate: TDate, compareDate: TDate) => {
  return setDateToMidnight(thisDate) > setDateToMidnight(compareDate);
};

/**
 * Checks if a date is after before date, time excluded
 * @param thisDate string | Date - date of interest
 * @param compareDate string | Date - date to compare agains
 * @returns boolean
 */
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

/**
 * Gets a number of dates after or before date
 */
export const getRangeOfDatesFromDate = (
  date: TDate,
  days: number,
  direction: 'before' | 'after',
) => {
  const dir = direction === 'after' ? 1 : -1;
  const pointDate = new Date(date);
  const rangeDate = new Date(pointDate.getTime());
  rangeDate.setDate(pointDate.getDate() + dir * (days - 1));

  const range = getInclusiveDatesBetweenDates(pointDate, rangeDate);

  return range;
};

/**
 * Gets all day-range to start of week. 1 = Monday
 */
export const getDateRangeBackTillDayOfWeek = (
  date: TDate,
  dayOfWeek: 1 | 2 | 3 | 4 | 5 | 6 | 7,
) => {
  const d = new Date(date);
  const dateRange: string[] = [setDateMidnightISOString(d)];
  let currentDay = d.getDay();

  if (dayOfWeek > currentDay) {
    return [];
  }

  while (currentDay !== dayOfWeek) {
    d.setDate(d.getDate() - 1);
    dateRange.push(setDateMidnightISOString(d));
    currentDay -= 1;
  }

  return dateRange;
};

/**
 * Sort a date array ascending or descending
 * @param dateArray string[] | Date[]
 * @param direction `asc` | `desc`
 * @returns TDate[]
 */
export const sortDateArray = (
  dateArray: string[],
  direction: 'asc' | 'desc',
) => {
  const dir = direction === 'asc' ? 1 : -1;
  return [...dateArray].sort(
    (a, b) => dir * new Date(a).valueOf() - dir * new Date(b).valueOf(),
  );
};
