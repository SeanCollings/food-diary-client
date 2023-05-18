import { validator } from './validator';

describe('valdiator', () => {
  it('should be truthy if correct format', () => {
    const result = validator('12:30');
    expect(result).toBeTruthy();
  });

  it('should be falsy for empty input', () => {
    const result = validator('');
    expect(result).toBeFalsy();
  });

  it('should be falsy if no : symbol', () => {
    const result = validator('1230');
    expect(result).toBeFalsy();
  });

  it('should be falsy if no hours value', () => {
    const result = validator(':30');
    expect(result).toBeFalsy();
  });

  it('should be falsy if no minutes value', () => {
    const result = validator('12:');
    expect(result).toBeFalsy();
  });

  it('should be falsy if hours NaN', () => {
    const result = validator('test:30');
    expect(result).toBeFalsy();
  });

  it('should be falsy if minutes NaN', () => {
    const result = validator('12:test');
    expect(result).toBeFalsy();
  });
});
