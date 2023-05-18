import { validator } from './validator';

describe('valdiator', () => {
  it('should be truthy for correct format', () => {
    const result = validator('test@email.com');
    expect(result).toBeTruthy();
  });

  it('should be truthy for correct format after trim', () => {
    const result = validator('   test@email.com   ');
    expect(result).toBeTruthy();
  });

  it('should be falsy for incorrect format', () => {
    const result = validator('@email.com');
    expect(result).toBeFalsy();
  });

  it('should be falsy for incorrect format', () => {
    const result = validator('test@email');
    expect(result).toBeFalsy();
  });

  it('should be falsy for incorrect format', () => {
    const result = validator('1@2.3');
    expect(result).toBeFalsy();
  });

  it('should be falsy for incorrect format', () => {
    const result = validator('test@email.com.za,next');
    expect(result).toBeFalsy();
  });
});
