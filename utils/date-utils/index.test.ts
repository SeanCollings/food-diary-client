import {
  dateNow,
  formatFullDate,
  formatFullDateNoDay,
  formatMonthMediumYear,
  formatMonthNumberYear,
  formatMonthSmallYear,
  getBothDatesEqual,
  getCurrentDayInDate,
  getCurrentMonthAndYear,
  getDateMonthsAgo,
  getDateRangeBackTillDayOfWeek,
  getDayFromDate,
  getDaysAwayFromDate,
  getInclusiveDatesBetweenDates,
  getInclusiveDaysBetweenDates,
  getIsDateSelectedToday,
  getIsDayInTheFuture,
  getMidnightISODaysInMonth,
  getMonthAndYearFromDate,
  getNewDay,
  getNewMonth,
  getRangeOfDatesFromDate,
  getTodaysDate,
  isBetweenDates,
  isCurrentMonth,
  isDayAfter,
  isDayBefore,
  isDayInMonthInFuture,
  isLeapYear,
  isMonthInFuture,
  setDateMidnightISOString,
  setDateToMidnight,
  sortDateArray,
} from '.';

describe('date-utils', () => {
  let today: Date;

  beforeEach(() => {
    today = new Date(Date.now());
  });

  describe('dateNow', () => {
    it('should return current date', () => {
      expect(dateNow()).toMatchInlineSnapshot(`2023-04-27T22:00:00.000Z`);
    });
  });

  describe('getTodaysDate', () => {
    it('should return current date in format', () => {
      const result = getTodaysDate();
      expect(result).toMatchInlineSnapshot(`"Friday, 28 Apr 2023"`);
    });
  });

  describe('formatFullDate', () => {
    it('should return date in format', () => {
      const result = formatFullDate(today);
      expect(result).toMatchInlineSnapshot(`"Friday, 28 Apr 2023"`);
    });

    it('should cater for lack of date input', () => {
      const result = formatFullDate(null);
      expect(result).toEqual('');
    });
  });

  describe('formatFullDateNoDay', () => {
    it('should return date in format without day', () => {
      const result = formatFullDateNoDay(today);
      expect(result).toMatchInlineSnapshot(`"28 Apr 2023"`);
    });
  });

  describe('formatMonthSmallYear', () => {
    it('should return date in format small month year', () => {
      const result = formatMonthSmallYear(today);
      expect(result).toMatchInlineSnapshot(`"Apr 2023"`);
    });
  });

  describe('formatMonthMediumYear', () => {
    it('should return date in format medium month year', () => {
      const result = formatMonthMediumYear(today);
      expect(result).toMatchInlineSnapshot(`"April 2023"`);
    });
  });

  describe('formatMonthNumberYear', () => {
    it('should return date in format number month year', () => {
      const result = formatMonthNumberYear(today);
      expect(result).toMatchInlineSnapshot(`"3-2023"`);
    });

    it('should cater for null date input', () => {
      const result = formatMonthNumberYear(null);
      expect(result).toMatchInlineSnapshot(`"3-2023"`);
    });
  });

  describe('getMonthAndYearFromDate', () => {
    it('should return date in format medium month year', () => {
      const result = getMonthAndYearFromDate(today);
      expect(result).toMatchInlineSnapshot(`
        [
          3,
          2023,
        ]
      `);
    });

    it('should cater for null date input', () => {
      const result = getMonthAndYearFromDate(null as any);
      expect(result).toMatchInlineSnapshot(`
        [
          3,
          2023,
        ]
      `);
    });
  });

  describe('getCurrentMonthAndYear', () => {
    it('should return current month and year', () => {
      const result = getCurrentMonthAndYear();
      expect(result).toMatchInlineSnapshot(`
        [
          3,
          2023,
        ]
      `);
    });
  });

  describe('getMidnightISODaysInMonth', () => {
    it('should get all midnight ISO dates in month', () => {
      const result = getMidnightISODaysInMonth(2, 2023);
      expect(result).toMatchInlineSnapshot(`
        [
          "2023-02-28T22:00:00.000Z",
          "2023-03-01T22:00:00.000Z",
          "2023-03-02T22:00:00.000Z",
          "2023-03-03T22:00:00.000Z",
          "2023-03-04T22:00:00.000Z",
          "2023-03-05T22:00:00.000Z",
          "2023-03-06T22:00:00.000Z",
          "2023-03-07T22:00:00.000Z",
          "2023-03-08T22:00:00.000Z",
          "2023-03-09T22:00:00.000Z",
          "2023-03-10T22:00:00.000Z",
          "2023-03-11T22:00:00.000Z",
          "2023-03-12T22:00:00.000Z",
          "2023-03-13T22:00:00.000Z",
          "2023-03-14T22:00:00.000Z",
          "2023-03-15T22:00:00.000Z",
          "2023-03-16T22:00:00.000Z",
          "2023-03-17T22:00:00.000Z",
          "2023-03-18T22:00:00.000Z",
          "2023-03-19T22:00:00.000Z",
          "2023-03-20T22:00:00.000Z",
          "2023-03-21T22:00:00.000Z",
          "2023-03-22T22:00:00.000Z",
          "2023-03-23T22:00:00.000Z",
          "2023-03-24T22:00:00.000Z",
          "2023-03-25T22:00:00.000Z",
          "2023-03-26T22:00:00.000Z",
          "2023-03-27T22:00:00.000Z",
          "2023-03-28T22:00:00.000Z",
          "2023-03-29T22:00:00.000Z",
          "2023-03-30T22:00:00.000Z",
        ]
      `);
    });
  });

  describe('isCurrentMonth', () => {
    it('should check if date is in current month', () => {
      const result = isCurrentMonth(today);
      expect(result).toBeTruthy();
    });

    it('should return falsy if date not in current month', () => {
      const previousMonth = new Date(today);
      previousMonth.setMonth(previousMonth.getMonth() - 3);
      const result = isCurrentMonth(previousMonth);
      expect(result).toBeFalsy();
    });
  });

  describe('isMonthInFuture', () => {
    it('should check if month-date is in future', () => {
      const nextMonth = new Date(today);
      nextMonth.setMonth(nextMonth.getMonth() + 3);
      const result = isMonthInFuture(nextMonth);
      expect(result).toBeTruthy();
    });

    it('should return falsy if date not in future', () => {
      const result = isMonthInFuture(today);
      expect(result).toBeFalsy();
    });
  });

  describe('getCurrentDayInDate', () => {
    it('should get day in month of input date', () => {
      const result = getCurrentDayInDate(today, 3);
      expect(result).toMatchInlineSnapshot(`2023-04-02T22:00:00.000Z`);
    });
  });

  describe('isDayInMonthInFuture', () => {
    it('should be truthy if day in month after today', () => {
      const result = isDayInMonthInFuture(29);
      expect(result).toBeTruthy();
    });

    it('should be falsy if day in month before today', () => {
      const result = isDayInMonthInFuture(5);
      expect(result).toBeFalsy();
    });
  });

  describe('getIsDayInTheFuture', () => {
    it('should truthy if day in future', () => {
      const result = getIsDayInTheFuture(today, 30);
      expect(result).toBeTruthy();
    });

    it('should truthy if month in future', () => {
      const nextMonth = new Date(today);
      nextMonth.setMonth(nextMonth.getMonth() + 3);
      const result = getIsDayInTheFuture(nextMonth, 3);
      expect(result).toBeTruthy();
    });

    it('should be falsy if day in past', () => {
      const result = getIsDayInTheFuture(today, 3);
      expect(result).toBeFalsy();
    });
  });

  describe('getBothDatesEqual', () => {
    it('should be truthy if both dates are equal', () => {
      const result = getBothDatesEqual(today, today);
      expect(result).toBeTruthy();
    });

    it('should be falsy if both dates not equal', () => {
      const nextMonth = new Date(today);
      nextMonth.setMonth(nextMonth.getMonth() + 3);
      const result = getBothDatesEqual(today, nextMonth);
      expect(result).toBeFalsy();
    });
  });

  describe('getDayFromDate', () => {
    it('should get day value from date', () => {
      const result = getDayFromDate(today);
      expect(result).toMatchInlineSnapshot(`28`);
    });
  });

  describe('isBetweenDates', () => {
    it('should be truthy if between 2 dates', () => {
      const prevMonth = new Date(today);
      prevMonth.setMonth(prevMonth.getMonth() - 1);
      const nextMonth = new Date(today);
      nextMonth.setMonth(nextMonth.getMonth() + 1);

      const result = isBetweenDates(today, prevMonth, nextMonth);
      expect(result).toBeTruthy();
    });

    it('should be falsy if after 2 dates', () => {
      const nextMonth1 = new Date(today);
      nextMonth1.setMonth(nextMonth1.getMonth() + 1);
      const nextMonth2 = new Date(today);
      nextMonth2.setMonth(nextMonth2.getMonth() + 2);

      const result = isBetweenDates(today, nextMonth1, nextMonth2);
      expect(result).toBeFalsy();
    });

    it('should be falsy if before 2 dates', () => {
      const prevMonth = new Date(today);
      prevMonth.setMonth(prevMonth.getMonth() - 1);

      const result = isBetweenDates(today, prevMonth, prevMonth);
      expect(result).toBeFalsy();
    });
  });

  describe('isLeapYear', () => {
    it('should be truthy if leap year', () => {
      const result = isLeapYear(1, 2020);
      expect(result).toBeTruthy();
    });

    it('should be falsy if no leap year', () => {
      const result = isLeapYear(1, 2022);
      expect(result).toBeFalsy();
    });
  });

  describe('getNewDay', () => {
    it('should get next day', () => {
      const result = getNewDay(today, 'next');
      expect(result).toMatchInlineSnapshot(`2023-04-28T22:00:00.000Z`);
    });

    it('should get previous day', () => {
      const result = getNewDay(today, 'prev');
      expect(result).toMatchInlineSnapshot(`2023-04-26T22:00:00.000Z`);
    });
  });

  describe('getNewMonth', () => {
    it('should get next month', () => {
      const result = getNewMonth(today, 'next');
      expect(result).toMatchInlineSnapshot(`2023-04-30T22:00:00.000Z`);
    });

    it('should get previous month', () => {
      const result = getNewMonth(today, 'prev');
      expect(result).toMatchInlineSnapshot(`2023-02-28T22:00:00.000Z`);
    });
  });

  describe('getIsDateSelectedToday', () => {
    const nextMonth = new Date(today);
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    it('should be truthy if date is today', () => {
      const result = getIsDateSelectedToday(today);
      expect(result).toBeTruthy();
    });

    it('should be falsy if date is not today', () => {
      const result = getIsDateSelectedToday(nextMonth);
      expect(result).toBeFalsy();
    });
  });

  describe('setDateToMidnight', () => {
    it('should set a date to midnight', () => {
      const result = setDateToMidnight('01-01-2021');
      expect(result).toMatchInlineSnapshot(`2020-12-31T22:00:00.000Z`);
    });

    it('should set a date to midnight', () => {
      const result = setDateToMidnight('2020-12-31T22:12:14.123Z');
      expect(result).toMatchInlineSnapshot(`2020-12-31T22:00:00.000Z`);
    });

    it('should set a date to midnight', () => {
      const result = setDateToMidnight(1684422917426);
      expect(result).toMatchInlineSnapshot(`2023-05-17T22:00:00.000Z`);
    });
  });

  describe('setDateMidnightISOString', () => {
    it('should set a date to to ISO format at amidnight', () => {
      const result = setDateMidnightISOString('01-01-2021');
      expect(result).toMatchInlineSnapshot(`"2020-12-31T22:00:00.000Z"`);
    });
  });

  describe('getDaysAwayFromDate', () => {
    it('should get a number of days away from date', () => {
      const result = getDaysAwayFromDate(5, today);
      expect(result).toMatchInlineSnapshot(`2023-05-02T22:00:00.000Z`);
    });

    it('should get a number of days away from date backwards', () => {
      const result = getDaysAwayFromDate(-5, today);
      expect(result).toMatchInlineSnapshot(`2023-04-22T22:00:00.000Z`);
    });

    it('should get a number of days away today if not date supplied', () => {
      const result = getDaysAwayFromDate(5);
      expect(result).toMatchInlineSnapshot(`2023-05-02T22:00:00.000Z`);
    });
  });

  describe('isDayAfter', () => {
    it('should be truthy if date after another date', () => {
      const nextMonth = new Date(today);
      nextMonth.setMonth(nextMonth.getMonth() + 1);

      const result = isDayAfter(nextMonth, today);
      expect(result).toBeTruthy();
    });

    it('should be falsy if date before another date', () => {
      const prevMonth = new Date(today);
      prevMonth.setMonth(prevMonth.getMonth() - 1);

      const result = isDayAfter(prevMonth, today);
      expect(result).toBeFalsy();
    });
  });

  describe('isDayBefore', () => {
    it('should be truthy if date after another date', () => {
      const nextMonth = new Date(today);
      nextMonth.setMonth(nextMonth.getMonth() + 1);

      const result = isDayBefore(nextMonth, today);
      expect(result).toBeFalsy();
    });

    it('should be falsy if date before another date', () => {
      const prevMonth = new Date(today);
      prevMonth.setMonth(prevMonth.getMonth() - 1);

      const result = isDayBefore(prevMonth, today);
      expect(result).toBeTruthy();
    });
  });

  describe('getDateMonthsAgo', () => {
    it('should get a date a number of months ago', () => {
      const result = getDateMonthsAgo(today, 5);
      expect(result).toMatchInlineSnapshot(`2022-11-27T22:00:00.000Z`);
    });
  });

  describe('getInclusiveDaysBetweenDates', () => {
    it('should number of days  between 2 dates inclusive', () => {
      const daysPlus3 = new Date(today);
      daysPlus3.setDate(daysPlus3.getDate() + 3);

      const result = getInclusiveDaysBetweenDates(today, daysPlus3);
      expect(today).toMatchInlineSnapshot(`2023-04-27T22:00:00.000Z`);
      expect(daysPlus3).toMatchInlineSnapshot(`2023-04-30T22:00:00.000Z`);
      expect(result).toMatchInlineSnapshot(`4`);
    });
  });

  describe('getInclusiveDatesBetweenDates', () => {
    it('should all days inclusive between 2 dates', () => {
      const daysPlus3 = new Date(today);
      daysPlus3.setDate(daysPlus3.getDate() + 3);

      const result = getInclusiveDatesBetweenDates(today, daysPlus3);
      expect(result).toMatchInlineSnapshot(`
        [
          "2023-04-27T22:00:00.000Z",
          "2023-04-28T22:00:00.000Z",
          "2023-04-29T22:00:00.000Z",
          "2023-04-30T22:00:00.000Z",
        ]
      `);
    });

    it('should not care which date is first', () => {
      const daysPlus3 = new Date(today);
      daysPlus3.setDate(daysPlus3.getDate() + 3);

      const result = getInclusiveDatesBetweenDates(daysPlus3, today);
      expect(result).toMatchInlineSnapshot(`
        [
          "2023-04-27T22:00:00.000Z",
          "2023-04-28T22:00:00.000Z",
          "2023-04-29T22:00:00.000Z",
          "2023-04-30T22:00:00.000Z",
        ]
      `);
    });
  });

  describe('getRangeOfDatesFromDate', () => {
    it('should get a number of dates after date', () => {
      const result = getRangeOfDatesFromDate(today, 4, 'after');
      expect(result).toMatchInlineSnapshot(`
        [
          "2023-04-27T22:00:00.000Z",
          "2023-04-28T22:00:00.000Z",
          "2023-04-29T22:00:00.000Z",
          "2023-04-30T22:00:00.000Z",
        ]
      `);
    });

    it('should get a number of before after date', () => {
      const result = getRangeOfDatesFromDate(today, 4, 'before');
      expect(result).toMatchInlineSnapshot(`
        [
          "2023-04-24T22:00:00.000Z",
          "2023-04-25T22:00:00.000Z",
          "2023-04-26T22:00:00.000Z",
          "2023-04-27T22:00:00.000Z",
        ]
      `);
    });
  });

  describe('getDateRangeBackTillDayOfWeek', () => {
    it('should get a range of dates back till start of the week - monday', () => {
      const result = getDateRangeBackTillDayOfWeek(today, 1);
      expect(result).toMatchInlineSnapshot(`
        [
          "2023-04-27T22:00:00.000Z",
          "2023-04-26T22:00:00.000Z",
          "2023-04-25T22:00:00.000Z",
          "2023-04-24T22:00:00.000Z",
          "2023-04-23T22:00:00.000Z",
        ]
      `);
    });

    it('should get a range of dates back till start of the week - Thursday', () => {
      const result = getDateRangeBackTillDayOfWeek(today, 4);
      expect(result).toMatchInlineSnapshot(`
        [
          "2023-04-27T22:00:00.000Z",
          "2023-04-26T22:00:00.000Z",
        ]
      `);
    });

    it('should get a range of dates back till start of the week - Friday', () => {
      const result = getDateRangeBackTillDayOfWeek(today, 5);
      expect(result).toMatchInlineSnapshot(`
        [
          "2023-04-27T22:00:00.000Z",
        ]
      `);
    });

    it('should cater for day after current', () => {
      const result = getDateRangeBackTillDayOfWeek(today, 7);
      expect(result).toMatchInlineSnapshot(`[]`);
    });

    it('should cater for day equal to current', () => {
      const result = getDateRangeBackTillDayOfWeek(today, 6);
      expect(result).toMatchInlineSnapshot(`[]`);
    });
  });

  describe('sortDateArray', () => {
    it('should sort a date array ascending', () => {
      const result = sortDateArray(
        [
          '2023-03-01',
          '2023-04-01',
          '2020-04-01',
          '2022-04-01',
          '2023-05-01',
          '2023-04-02',
          '2023-04-07',
        ],
        'asc',
      );
      expect(result).toMatchInlineSnapshot(`
        [
          "2020-04-01",
          "2022-04-01",
          "2023-03-01",
          "2023-04-01",
          "2023-04-02",
          "2023-04-07",
          "2023-05-01",
        ]
      `);
    });

    it('should sort a date array descending', () => {
      const result = sortDateArray(
        [
          '2023-03-01',
          '2023-04-01',
          '2020-04-01',
          '2022-04-01',
          '2023-05-01',
          '2023-04-02',
          '2023-04-07',
        ],
        'desc',
      );
      expect(result).toMatchInlineSnapshot(`
        [
          "2023-05-01",
          "2023-04-07",
          "2023-04-02",
          "2023-04-01",
          "2023-03-01",
          "2022-04-01",
          "2020-04-01",
        ]
      `);
    });
  });
});
