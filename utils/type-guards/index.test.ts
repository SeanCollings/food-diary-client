import { isDayNumberTypeGuard, isNumber } from '.';

describe('type-guards util', () => {
  describe('isDayNumberTypeGuard', () => {
    it('should be truthy if day is a number', () => {
      expect(isDayNumberTypeGuard({ day: 123 })).toBeTruthy();
    });

    it('should be falsy if day is a string', () => {
      expect(isDayNumberTypeGuard('T')).toBeFalsy();
    });
  });

  describe('isNumber', () => {
    it('should be truthy number provided', () => {
      expect(isNumber(123)).toBeTruthy();
    });

    it('should be falsy if not a number provided', () => {
      expect(isNumber({ test: 'this' })).toBeFalsy();
    });
  });
});
