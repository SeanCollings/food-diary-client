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
  setServerDateString,
  setDateToMidnight,
  sortDateArray,
  getIsDateInPast,
} from '.';

describe('date-utils', () => {
  describe('dateNow', () => {
    it('should return current date', () => {
      expect(dateNow()).toMatchInlineSnapshot(`2023-04-28T00:00:00.000Z`);
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
      const today = new Date(Date.now());
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
      const today = new Date(Date.now());
      const result = formatFullDateNoDay(today);
      expect(result).toMatchInlineSnapshot(`"28 Apr 2023"`);
    });
  });

  describe('formatMonthSmallYear', () => {
    it('should return date in format small month year', () => {
      const today = new Date(Date.now());
      const result = formatMonthSmallYear(today);
      expect(result).toMatchInlineSnapshot(`"Apr 2023"`);
    });
  });

  describe('formatMonthMediumYear', () => {
    it('should return date in format medium month year', () => {
      const today = new Date(Date.now());
      const result = formatMonthMediumYear(today);
      expect(result).toMatchInlineSnapshot(`"April 2023"`);
    });
  });

  describe('formatMonthNumberYear', () => {
    it('should return date in format number month year', () => {
      const today = new Date(Date.now());
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
      const today = new Date(Date.now());
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

  describe('isCurrentMonth', () => {
    it('should check if date is in current month', () => {
      const today = new Date(Date.now());
      const result = isCurrentMonth(today);
      expect(result).toBeTruthy();
    });

    it('should return falsy if date not in current month', () => {
      const today = new Date(Date.now());
      const previousMonth = new Date(today);
      previousMonth.setMonth(previousMonth.getMonth() - 3);
      const result = isCurrentMonth(previousMonth);
      expect(result).toBeFalsy();
    });
  });

  describe('isMonthInFuture', () => {
    it('should check if month-date is in future', () => {
      const today = new Date(Date.now());
      const nextMonth = new Date(today);
      nextMonth.setMonth(nextMonth.getMonth() + 3);
      const result = isMonthInFuture(nextMonth);
      expect(result).toBeTruthy();
    });

    it('should return falsy if date not in future', () => {
      const today = new Date(Date.now());
      const result = isMonthInFuture(today);
      expect(result).toBeFalsy();
    });
  });

  describe('getCurrentDayInDate', () => {
    it('should get day in month of input date', () => {
      const today = new Date(Date.now());
      const result = getCurrentDayInDate(today, 3);
      expect(result).toMatchInlineSnapshot(`"2023-04-03"`);
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

  describe('getIsDateInPast', () => {
    it('should be true if a date is in the past', () => {
      const result = getIsDateInPast('2023-01-01');
      expect(result).toEqual(true);
    });

    it('should be false if date in the future', () => {
      const result = getIsDateInPast('2024-01-01');
      expect(result).toEqual(false);
    });

    it('should be false if no date supplied', () => {
      const result = getIsDateInPast();
      expect(result).toEqual(false);
    });
  });

  describe('getIsDayInTheFuture', () => {
    it('should truthy if day in future', () => {
      const today = new Date(Date.now());
      const result = getIsDayInTheFuture(today, 30);
      expect(result).toBeTruthy();
    });

    it('should truthy if month in future', () => {
      const today = new Date(Date.now());
      const nextMonth = new Date(today);
      nextMonth.setMonth(nextMonth.getMonth() + 3);
      const result = getIsDayInTheFuture(nextMonth, 3);
      expect(result).toBeTruthy();
    });

    it('should be falsy if day in past', () => {
      const today = new Date(Date.now());
      const result = getIsDayInTheFuture(today, 3);
      expect(result).toBeFalsy();
    });
  });

  describe('getBothDatesEqual', () => {
    it('should be truthy if both dates are equal', () => {
      const today = new Date(Date.now());
      const result = getBothDatesEqual(today, today);
      expect(result).toBeTruthy();
    });

    it('should be falsy if both dates not equal', () => {
      const today = new Date(Date.now());
      const nextMonth = new Date(today);
      nextMonth.setMonth(nextMonth.getMonth() + 3);
      const result = getBothDatesEqual(today, nextMonth);
      expect(result).toBeFalsy();
    });
  });

  describe('getDayFromDate', () => {
    it('should get day value from date', () => {
      const today = new Date(Date.now());
      const result = getDayFromDate(today);
      expect(result).toMatchInlineSnapshot(`28`);
    });
  });

  describe('isBetweenDates', () => {
    it('should be truthy if between 2 dates', () => {
      const today = new Date(Date.now());
      const prevMonth = new Date(today);
      prevMonth.setMonth(prevMonth.getMonth() - 1);
      const nextMonth = new Date(today);
      nextMonth.setMonth(nextMonth.getMonth() + 1);

      const result = isBetweenDates(today, prevMonth, nextMonth);
      expect(result).toBeTruthy();
    });

    it('should be falsy if after 2 dates', () => {
      const today = new Date(Date.now());
      const nextMonth1 = new Date(today);
      nextMonth1.setMonth(nextMonth1.getMonth() + 1);
      const nextMonth2 = new Date(today);
      nextMonth2.setMonth(nextMonth2.getMonth() + 2);

      const result = isBetweenDates(today, nextMonth1, nextMonth2);
      expect(result).toBeFalsy();
    });

    it('should be falsy if before 2 dates', () => {
      const today = new Date(Date.now());
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
      const today = new Date(Date.now());
      const result = getNewDay(today, 'next');
      expect(result).toMatchInlineSnapshot(`"2023-04-29"`);
    });

    it('should get previous day', () => {
      const today = new Date(Date.now());
      const result = getNewDay(today, 'prev');
      expect(result).toMatchInlineSnapshot(`"2023-04-27"`);
    });
  });

  describe('getNewMonth', () => {
    it('should get next month', () => {
      const today = new Date(Date.now());
      const result = getNewMonth(today, 'next');
      expect(result).toMatchInlineSnapshot(`"2023-05-01"`);
    });

    it('should get previous month', () => {
      const today = new Date(Date.now());
      const result = getNewMonth(today, 'prev');
      expect(result).toMatchInlineSnapshot(`"2023-03-01"`);
    });
  });

  describe('getIsDateSelectedToday', () => {
    it('should be truthy if date is today', () => {
      const today = new Date(Date.now());
      const result = getIsDateSelectedToday(today);
      expect(result).toBeTruthy();
    });

    it('should be falsy if date is not today', () => {
      const nextMonth = new Date(Date.now());
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      const result = getIsDateSelectedToday(nextMonth);
      expect(result).toBeFalsy();
    });
  });

  describe('setDateToMidnight', () => {
    it('should set short format date to midnight', () => {
      const result = setDateToMidnight('01-01-2021');
      expect(result).toMatchInlineSnapshot(`"2021-01-01"`);
    });

    it('should set number date to midnight', () => {
      const result = setDateToMidnight(1684422917426);
      expect(result).toMatchInlineSnapshot(`"2023-05-18"`);
    });
  });

  describe('setServerDateString', () => {
    it('should set a date to server date format at midnight', () => {
      const result = setServerDateString(new Date('2020-12-31'));
      expect(result).toMatchInlineSnapshot(`"2020-12-31"`);
    });

    it('should set todays date to server date format at midnight if no date supplied', () => {
      const result = setServerDateString();
      expect(result).toMatchInlineSnapshot(`"2023-04-28"`);
    });
  });

  describe('getDaysAwayFromDate', () => {
    it('should get a number of days away from date', () => {
      const today = new Date(Date.now());
      const result = getDaysAwayFromDate(5, today);
      expect(result).toMatchInlineSnapshot(`"2023-05-03"`);
    });

    it('should get a number of days away from date backwards', () => {
      const today = new Date(Date.now());
      const result = getDaysAwayFromDate(-5, today);
      expect(result).toMatchInlineSnapshot(`"2023-04-23"`);
    });

    it('should get a number of days away today if not date supplied', () => {
      const result = getDaysAwayFromDate(5);
      expect(result).toMatchInlineSnapshot(`"2023-05-03"`);
    });
  });

  describe('isDayAfter', () => {
    it('should be truthy if date after another date', () => {
      const today = new Date(Date.now());
      const nextMonth = new Date(today);
      nextMonth.setMonth(nextMonth.getMonth() + 1);

      const result = isDayAfter(nextMonth, today);
      expect(result).toBeTruthy();
    });

    it('should be falsy if date before another date', () => {
      const today = new Date(Date.now());
      const prevMonth = new Date(today);
      prevMonth.setMonth(prevMonth.getMonth() - 1);

      const result = isDayAfter(prevMonth, today);
      expect(result).toBeFalsy();
    });
  });

  describe('isDayBefore', () => {
    it('should be truthy if date after another date', () => {
      const today = new Date(Date.now());
      const nextMonth = new Date(today);
      nextMonth.setMonth(nextMonth.getMonth() + 1);

      const result = isDayBefore(nextMonth, today);
      expect(result).toBeFalsy();
    });

    it('should be falsy if date before another date', () => {
      const today = new Date(Date.now());
      const prevMonth = new Date(today);
      prevMonth.setMonth(prevMonth.getMonth() - 1);

      const result = isDayBefore(prevMonth, today);
      expect(result).toBeTruthy();
    });
  });

  describe('getDateMonthsAgo', () => {
    it('should get a date a number of months ago', () => {
      const today = new Date(Date.now());
      const result = getDateMonthsAgo(today, 5);
      expect(result).toMatchInlineSnapshot(`"2022-11-28"`);
    });
  });

  describe('getInclusiveDaysBetweenDates', () => {
    it('should return number of days between 2 dates inclusive', () => {
      const today = new Date(Date.now());
      const daysPlus3 = new Date(today);
      daysPlus3.setDate(daysPlus3.getDate() + 3);

      const result = getInclusiveDaysBetweenDates(today, daysPlus3);
      expect(today).toMatchInlineSnapshot(`2023-04-28T00:00:00.000Z`);
      expect(daysPlus3).toMatchInlineSnapshot(`2023-05-01T00:00:00.000Z`);
      expect(result).toMatchInlineSnapshot(`4`);
    });
  });

  describe('getInclusiveDatesBetweenDates', () => {
    it('should return all days inclusive between 2 dates', () => {
      const today = new Date(Date.now());
      const daysPlus3 = new Date(today);
      daysPlus3.setDate(daysPlus3.getDate() + 3);

      const result = getInclusiveDatesBetweenDates(today, daysPlus3);
      expect(result).toMatchInlineSnapshot(`
        [
          "2023-04-28",
          "2023-04-29",
          "2023-04-30",
          "2023-05-01",
        ]
      `);
    });

    it('should not care which date is first', () => {
      const today = new Date(Date.now());
      const daysPlus3 = new Date(today);
      daysPlus3.setDate(daysPlus3.getDate() + 3);

      const result = getInclusiveDatesBetweenDates(daysPlus3, today);
      expect(result).toMatchInlineSnapshot(`
        [
          "2023-04-28",
          "2023-04-29",
          "2023-04-30",
          "2023-05-01",
        ]
      `);
    });
  });

  describe('getRangeOfDatesFromDate', () => {
    it('should get a number of dates after date', () => {
      const today = new Date(Date.now());
      const result = getRangeOfDatesFromDate(today, 4, 'after');
      expect(result).toMatchInlineSnapshot(`
        [
          "2023-04-28",
          "2023-04-29",
          "2023-04-30",
          "2023-05-01",
        ]
      `);
    });

    it('should get a number of before after date', () => {
      const today = new Date(Date.now());
      const result = getRangeOfDatesFromDate(today, 4, 'before');
      expect(result).toMatchInlineSnapshot(`
        [
          "2023-04-25",
          "2023-04-26",
          "2023-04-27",
          "2023-04-28",
        ]
      `);
    });
  });

  describe('getDateRangeBackTillDayOfWeek', () => {
    it('should get a range of dates back till start of the week - monday', () => {
      const today = new Date(Date.now());
      const result = getDateRangeBackTillDayOfWeek(today, 1);
      expect(result).toMatchInlineSnapshot(`
        [
          "2023-04-28",
          "2023-04-27",
          "2023-04-26",
          "2023-04-25",
          "2023-04-24",
        ]
      `);
    });

    it('should get a range of dates back till start of the week - Thursday', () => {
      const today = new Date(Date.now());
      const result = getDateRangeBackTillDayOfWeek(today, 4);
      expect(result).toMatchInlineSnapshot(`
        [
          "2023-04-28",
          "2023-04-27",
        ]
      `);
    });

    it('should get a range of dates back till start of the week - Friday', () => {
      const today = new Date(Date.now());
      const result = getDateRangeBackTillDayOfWeek(today, 5);
      expect(result).toMatchInlineSnapshot(`
        [
          "2023-04-28",
        ]
      `);
    });

    it('should cater for day after current', () => {
      const today = new Date(Date.now());
      const result = getDateRangeBackTillDayOfWeek(today, 7);
      expect(result).toMatchInlineSnapshot(`[]`);
    });

    it('should cater for day equal to current', () => {
      const today = new Date(Date.now());
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
