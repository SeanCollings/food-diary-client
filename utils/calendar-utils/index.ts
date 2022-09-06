import { DAYS, WEEK_DAYS } from '@utils/constants';
import { getNewMonth, isLeapYear } from '@utils/date-utils';
import { IDayNumber } from '@utils/type-guards';

type TMonthMatrix = (string | IDayNumber)[][];

export const monthMatrix = () => {
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
          const previous = getNewMonth(selectedMonth, false, newDate);
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
