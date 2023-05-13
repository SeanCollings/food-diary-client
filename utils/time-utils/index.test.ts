import {
  formatFinalTime,
  formatMinutesToHoursMinutes,
  frontPadNumber,
  getFormatMinutesWithHours,
  getNewHourValue,
  getNewMinuteValue,
  getSplitTime,
  truncateTimeValue,
} from '.';

describe('time-utils', () => {
  describe('getSplitTime', () => {
    it('should convert string time to time array', () => {
      const result = getSplitTime('12:15');
      expect(result).toEqual(['12', '15']);
    });

    it('should cater for missing hour', () => {
      const result = getSplitTime(':15');
      expect(result).toEqual(['00', '15']);
    });

    it('should cater for missing minute', () => {
      const result = getSplitTime('12');
      expect(result).toEqual(['12', '00']);
    });

    it('should cater for missing minute', () => {
      const result = getSplitTime('12:');
      expect(result).toEqual(['12', '00']);
    });
  });

  describe('formatFinalTime', () => {
    it('should convert hours and minutes to time format', () => {
      const result = formatFinalTime('12', '15');
      expect(result).toEqual('12:15');
    });

    it('should cater for missing hours', () => {
      const result = formatFinalTime(null as any, '15');
      expect(result).toEqual('00:15');
    });

    it('should cater for missing minutes', () => {
      const result = formatFinalTime('12', null as any);
      expect(result).toEqual('12:00');
    });
  });

  describe('frontPadNumber', () => {
    it('should front pad a single number', () => {
      const result = frontPadNumber(1, 4);
      expect(result).toEqual('41');
    });

    it('should not pad a mutli number', () => {
      const result = frontPadNumber(123, 4);
      expect(result).toEqual('123');
    });

    it('should pad with 0 if no padder provided', () => {
      const result = frontPadNumber(1);
      expect(result).toEqual('01');
    });
  });

  describe('getFormatMinutesWithHours', () => {
    it('should format minutes with hours to get correct time', () => {
      const result = getFormatMinutesWithHours('3', '78');
      expect(result).toEqual(['04', '18']);
    });

    it('should cater for maximum hour time when add minutes and set time to maximum', () => {
      const result = getFormatMinutesWithHours('23', '78');
      expect(result).toEqual(['23', '59']);
    });

    it('should cater for a non-time hour value', () => {
      const result = getFormatMinutesWithHours('test', '78');
      expect(result).toEqual(['01', '18']);
    });

    it('should cap hour at maximum value', () => {
      const result = getFormatMinutesWithHours('26', '15');
      expect(result).toEqual(['23', '15']);
    });
  });

  describe('truncateTimeValue', () => {
    it('should truncate time value for value greater than max number', () => {
      const result = truncateTimeValue('199');
      expect(result).toEqual('19');
    });

    it('should not truncate time value if number equals max number', () => {
      const result = truncateTimeValue('99');
      expect(result).toEqual('99');
    });

    it('should not truncate time value if number lessw than max number', () => {
      const result = truncateTimeValue('12');
      expect(result).toEqual('12');
    });
  });

  describe('getNewHourValue', () => {
    it('should return same value if within range', () => {
      const result = getNewHourValue('9');
      expect(result).toEqual('9');
    });

    it('should set to 0 if hour is 24', () => {
      const result = getNewHourValue('24');
      expect(result).toEqual('0');
    });

    it('should set to max hour if value -1', () => {
      const result = getNewHourValue('-1');
      expect(result).toEqual('23');
    });

    it('should set to 0 if null', () => {
      const result = getNewHourValue(null as any);
      expect(result).toEqual('0');
    });
  });

  describe('getNewMinuteValue', () => {
    it('should return same value if within range', () => {
      const result = getNewMinuteValue('15');
      expect(result).toEqual('15');
    });

    it('should set to 0 if minute is 60', () => {
      const result = getNewMinuteValue('60');
      expect(result).toEqual('0');
    });

    it('should set to max minute if value -1', () => {
      const result = getNewMinuteValue('-1');
      expect(result).toEqual('59');
    });

    it('should set to 0 if null', () => {
      const result = getNewMinuteValue(null as any);
      expect(result).toEqual('0');
    });
  });

  describe('formatMinutesToHoursMinutes', () => {
    it('should convert minutes to hours and minutes', () => {
      const result = formatMinutesToHoursMinutes(59);
      expect(result).toEqual('00:59');
    });

    it('should convert minutes to hours and minutes', () => {
      const result = formatMinutesToHoursMinutes(123);
      expect(result).toEqual('02:03');
    });

    it('should cater for no input', () => {
      const result = formatMinutesToHoursMinutes();
      expect(result).toEqual('00:00');
    });
  });
});
