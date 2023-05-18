import { validator } from './validator';

describe('valdiator', () => {
  it('should be vaild if no value input', () => {
    const result = validator('');
    expect(result).toBeTruthy();
  });

  it('should be truthy for correct format', () => {
    const result = validator('🍉');
    expect(result).toBeTruthy();
  });

  it('should be falsy for incorrect emoji format', () => {
    const result = validator('emoji');
    expect(result).toBeFalsy();
  });

  it('should be falsy for incorrect emoji format', () => {
    const result = validator('Emoji');
    expect(result).toBeFalsy();
  });

  it('should be falsy for incorrect emoji format', () => {
    const result = validator('other');
    expect(result).toBeFalsy();
  });
});
