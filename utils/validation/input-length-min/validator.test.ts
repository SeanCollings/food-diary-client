import { validator } from './validator';

describe('valdiator', () => {
  it('should be truthy for greater than min length', () => {
    const result = validator('text string', 2);
    expect(result).toBeTruthy();
  });

  it('should be truthy for exact length', () => {
    const result = validator('text string', 11);
    expect(result).toBeTruthy();
  });

  it('should be falsy for less than min length', () => {
    const result = validator('text string', 15);
    expect(result).toBeFalsy();
  });
});
