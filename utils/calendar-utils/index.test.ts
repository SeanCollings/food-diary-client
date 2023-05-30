import {
  generateMonthMatrix,
  getCalendarDayProperties,
  getCalendarRestrictions,
} from '.';

describe('calendar-utils', () => {
  describe('generateMonthMatrix', () => {
    it('should generate a month matrix and cache the selected month', () => {
      const today = new Date(Date.now());
      const monthMatrix = generateMonthMatrix(today);
      const sameMonthMatrix = generateMonthMatrix(today);
      expect(sameMonthMatrix).toEqual(monthMatrix);
      expect(monthMatrix).toMatchInlineSnapshot(`
        [
          [
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
          ],
          [
            {
              "day": 26,
              "otherMonthDay": true,
            },
            {
              "day": 27,
              "otherMonthDay": true,
            },
            {
              "day": 28,
              "otherMonthDay": true,
            },
            {
              "day": 29,
              "otherMonthDay": true,
            },
            {
              "day": 30,
              "otherMonthDay": true,
            },
            {
              "day": 31,
              "otherMonthDay": true,
            },
            {
              "day": 1,
            },
          ],
          [
            {
              "day": 2,
            },
            {
              "day": 3,
            },
            {
              "day": 4,
            },
            {
              "day": 5,
            },
            {
              "day": 6,
            },
            {
              "day": 7,
            },
            {
              "day": 8,
            },
          ],
          [
            {
              "day": 9,
            },
            {
              "day": 10,
            },
            {
              "day": 11,
            },
            {
              "day": 12,
            },
            {
              "day": 13,
            },
            {
              "day": 14,
            },
            {
              "day": 15,
            },
          ],
          [
            {
              "day": 16,
            },
            {
              "day": 17,
            },
            {
              "day": 18,
            },
            {
              "day": 19,
            },
            {
              "day": 20,
            },
            {
              "day": 21,
            },
            {
              "day": 22,
            },
          ],
          [
            {
              "day": 23,
            },
            {
              "day": 24,
            },
            {
              "day": 25,
            },
            {
              "day": 26,
            },
            {
              "day": 27,
            },
            {
              "day": 28,
            },
            {
              "day": 29,
            },
          ],
          [
            {
              "day": 30,
            },
            {
              "day": 1,
              "otherMonthDay": true,
            },
            {
              "day": 2,
              "otherMonthDay": true,
            },
            {
              "day": 3,
              "otherMonthDay": true,
            },
            {
              "day": 4,
              "otherMonthDay": true,
            },
            {
              "day": 5,
              "otherMonthDay": true,
            },
            {
              "day": 6,
              "otherMonthDay": true,
            },
          ],
        ]
      `);
    });
  });

  describe('getCalendarDayProperties', () => {
    it('should get properties for particular day in calendar that does not have entry', () => {
      const today = new Date(Date.now());
      const result = getCalendarDayProperties({
        day: 3,
        selectedDay: today,
        topLevelDate: today,
        otherMonthDay: false,
        entriesPerMonth: [1],
      });
      expect(result).toMatchInlineSnapshot(`
        {
          "calendarDay": "2023-04-03",
          "dayHasEntry": false,
          "isDayInTheFuture": false,
          "isPeripheralMonth": false,
          "isSelectedDay": false,
          "isToday": false,
        }
      `);
    });

    it('should get properties for particular day in calendar that does have entry', () => {
      const today = new Date(Date.now());
      const result = getCalendarDayProperties({
        day: 3,
        selectedDay: today,
        topLevelDate: today,
        otherMonthDay: false,
        entriesPerMonth: [1, 3],
      });
      expect(result).toMatchInlineSnapshot(`
        {
          "calendarDay": "2023-04-03",
          "dayHasEntry": true,
          "isDayInTheFuture": false,
          "isPeripheralMonth": false,
          "isSelectedDay": false,
          "isToday": false,
        }
      `);
    });

    it('should get properties for particular day in calendar that is the seleted day', () => {
      const today = new Date(Date.now());
      const result = getCalendarDayProperties({
        day: today.getDate(),
        selectedDay: today,
        topLevelDate: today,
        otherMonthDay: false,
        entriesPerMonth: [1, 3],
      });
      expect(result).toMatchInlineSnapshot(`
        {
          "calendarDay": "2023-04-28",
          "dayHasEntry": false,
          "isDayInTheFuture": false,
          "isPeripheralMonth": false,
          "isSelectedDay": true,
          "isToday": true,
        }
      `);
    });

    it('should get properties for particular day in calendar that is the seleted day but not other month', () => {
      const today = new Date(Date.now());
      const result = getCalendarDayProperties({
        day: 28,
        selectedDay: today,
        topLevelDate: today,
        otherMonthDay: true,
        entriesPerMonth: [1, 3],
      });
      expect(result).toMatchInlineSnapshot(`
        {
          "calendarDay": "2023-04-28",
          "dayHasEntry": false,
          "isDayInTheFuture": false,
          "isPeripheralMonth": true,
          "isSelectedDay": false,
          "isToday": false,
        }
      `);
    });
  });

  describe('getCalendarRestrictions', () => {
    it('should return no restrictions if none passed in', () => {
      const today = new Date(Date.now());

      const result = getCalendarRestrictions({
        calendarDay: today,
      });
      expect(result).toMatchInlineSnapshot(`
        {
          "isDayRestricted": false,
          "isRestrictAfterDay": false,
          "isRestrictBeforeDay": false,
        }
      `);
    });

    it('should have no restrictions if only day after is restricted', () => {
      const now = Date.now();
      const today = new Date(now);
      const nextDay = new Date(now + 3600 * 1000 * 24);

      const result = getCalendarRestrictions({
        calendarDay: today,
        restricDaysAfter: nextDay,
      });
      expect(result).toMatchInlineSnapshot(`
        {
          "isDayRestricted": false,
          "isRestrictAfterDay": false,
          "isRestrictBeforeDay": false,
        }
      `);
    });

    it('should return restricted day if today is after resticted days', () => {
      const today = new Date(Date.now());
      const prevDay = new Date(Date.now() - 3600 * 1000 * 24);

      const result = getCalendarRestrictions({
        calendarDay: today,
        restricDaysAfter: prevDay,
      });

      expect(result).toMatchInlineSnapshot(`
        {
          "isDayRestricted": true,
          "isRestrictAfterDay": false,
          "isRestrictBeforeDay": false,
        }
      `);
    });

    it('should return restricted day if all days before next day is restricted', () => {
      const today = new Date(Date.now());
      const nextDay = new Date(Date.now() + 3600 * 1000 * 24);

      const result = getCalendarRestrictions({
        calendarDay: today,
        restrictDaysBefore: nextDay,
      });
      expect(result).toMatchInlineSnapshot(`
        {
          "isDayRestricted": true,
          "isRestrictAfterDay": false,
          "isRestrictBeforeDay": false,
        }
      `);
    });

    it('should return no restricted days if only days before previos days are restricted', () => {
      const today = new Date(Date.now());
      const prevDay = new Date(Date.now() - 3600 * 1000 * 24);

      const result = getCalendarRestrictions({
        calendarDay: today,
        restrictDaysBefore: prevDay,
      });
      expect(result).toMatchInlineSnapshot(`
        {
          "isDayRestricted": false,
          "isRestrictAfterDay": false,
          "isRestrictBeforeDay": false,
        }
      `);
    });

    it('should return restricted day if all days before next day are restricted', () => {
      const today = new Date(Date.now());
      const nextDay = new Date(Date.now() + 3600 * 1000 * 24);

      const result = getCalendarRestrictions({
        calendarDay: today,
        restrictDaysBefore: nextDay,
        restricDaysAfter: nextDay,
      });
      expect(result).toMatchInlineSnapshot(`
        {
          "isDayRestricted": true,
          "isRestrictAfterDay": false,
          "isRestrictBeforeDay": false,
        }
      `);
    });

    it('should return restricted day if all days after previous day are restricted', () => {
      const today = new Date(Date.now());
      const prevDay = new Date(Date.now() - 3600 * 1000 * 24);

      const result = getCalendarRestrictions({
        calendarDay: today,
        restrictDaysBefore: prevDay,
        restricDaysAfter: prevDay,
      });
      expect(result).toMatchInlineSnapshot(`
        {
          "isDayRestricted": true,
          "isRestrictAfterDay": false,
          "isRestrictBeforeDay": false,
        }
      `);
    });

    it('should return not restricted not day if only days before and after today are restricted', () => {
      const today = new Date(Date.now());

      const result = getCalendarRestrictions({
        calendarDay: today,
        restrictDaysBefore: today,
        restricDaysAfter: today,
      });
      expect(result).toMatchInlineSnapshot(`
        {
          "isDayRestricted": false,
          "isRestrictAfterDay": true,
          "isRestrictBeforeDay": true,
        }
      `);
    });
  });
});
