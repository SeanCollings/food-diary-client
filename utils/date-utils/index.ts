import { MONTHS } from '@utils/constants';

export const getTodaysDate = () =>
  new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

export const formatFullDate = (date: Date) =>
  date.toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

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
  return (
    new Date(new Date(Date.now()).setDate(compareDay)).setHours(0, 0, 0, 0) >
    new Date().setHours(0, 0, 0, 0)
  );
};

export const getIsDayInTheFuture = (compareDate: Date, compareDay: number) =>
  isMonthInFuture(compareDate) ||
  (isCurrentMonth(compareDate) && isDayInMonthInFuture(compareDay));

export const getBothDatesEqual = (firstDate: Date, secondDate: Date) => {
  return (
    new Date(firstDate).setHours(0, 0, 0, 0) ===
    new Date(secondDate).setHours(0, 0, 0, 0)
  );
};

export const isLeapYear = (month: number, year: number) => {
  if (month === 1) {
    if ((year % 4 === 0 && year % 100 != 0) || year % 400 === 0) {
      return 1;
    }
  }
  return 0;
};

export const getNewDay = (selectedDate: Date, getNextDay: boolean) => {
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
