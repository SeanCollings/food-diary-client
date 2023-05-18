import { validator } from './validator';

describe('valdiator', () => {
  it('should be truthy if there is a value', () => {
    const result = validator('text string');
    expect(result).toBeTruthy();
  });

  it('should be falsy for empty input', () => {
    const result = validator('');
    expect(result).toBeFalsy();
  });
});
