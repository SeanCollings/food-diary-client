import { validator } from './validator';

describe('valdiator', () => {
  it('should be truthy if less than max length', () => {
    const result = validator('text string', 15);
    expect(result).toBeTruthy();
  });

  it('should be truthy for exact length', () => {
    const result = validator('text string', 11);
    expect(result).toBeTruthy();
  });

  it('should be truthy for no input', () => {
    const result = validator('', 11);
    expect(result).toBeTruthy();
  });

  it('should be falsy if great than max length', () => {
    const result = validator('text string', 2);
    expect(result).toBeFalsy();
  });
});
