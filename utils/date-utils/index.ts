import { MONTHS } from '@utils/constants';

export const getTodaysDate = () =>
  new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

export const formatFullDate = (date: string | Date) => {
  const d = new Date(date);
  return d.toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatMonthSmall = (date: Date) => {
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

export const getCurrentDayInDate = (date: Date, day: number) =>
  new Date(new Date(date).setDate(day));

export const isDayInMonthInFuture = (compareDay: number) => {
  const d = new Date(Date.now()).setDate(compareDay);
  return setDateToMidnight(d) > setDateToMidnight();
};

export const getIsDayInTheFuture = (compareDate: Date, compareDay: number) =>
  isMonthInFuture(compareDate) ||
  (isCurrentMonth(compareDate) && isDayInMonthInFuture(compareDay));

export const getBothDatesEqual = (
  firstDate: string | Date,
  secondDate: Date
) => {
  return setDateToMidnight(firstDate) === setDateToMidnight(secondDate);
};

export const isLeapYear = (month: number, year: number) => {
  if (month === 1) {
    if ((year % 4 === 0 && year % 100 != 0) || year % 400 === 0) {
      return 1;
    }
  }
  return 0;
};

export const getNewDay = (selectedDate: string | Date, getNextDay: boolean) => {
  const date = new Date(selectedDate);
  date.setDate(date.getDate() + (getNextDay ? 1 : -1));
  return date;
};

export const getNewMonth = (
  selectedMonth: Date,
  getNextMonth: boolean,
  month?: Date
) => {
  let newMonth = new Date(month || selectedMonth);
  newMonth.setMonth(newMonth.getMonth() + (getNextMonth ? 1 : -1));
  return newMonth;
};

export const getIsDateSelectedToday = (compareDate: string) => {
  return (
    new Date(compareDate).setHours(0, 0, 0, 0) ===
    new Date().setHours(0, 0, 0, 0)
  );
};

export const setDateToMidnight = (date?: string | number | Date) => {
  const d = date || Date.now();
  return new Date(new Date(d).setHours(0, 0, 0, 0));
};

export const setDateMidnightISOString = (date: string | Date) => {
  return setDateToMidnight(date).toISOString();
};
