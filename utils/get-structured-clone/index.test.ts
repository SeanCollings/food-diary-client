import { getStructuredClone } from '.';

describe('get-structured-clone - utils', () => {
  const mockStructuredClone = jest.fn();
  let windowSpy: jest.SpyInstance;

  afterEach(() => {
    jest.clearAllMocks();
    windowSpy.mockRestore();
  });

  it('should return a structured clone if exists', () => {
    windowSpy = jest
      .spyOn(window, 'window', 'get')
      .mockReturnValue({ structuredClone: mockStructuredClone } as any);

    getStructuredClone({ anthing: { can: { go: 'here' } } });
    expect(mockStructuredClone).toHaveBeenCalledWith({
      anthing: { can: { go: 'here' } },
    });
  });

  it('should return parsed json if structured clone doesnt exist on window object', () => {
    windowSpy = jest
      .spyOn(window, 'window', 'get')
      .mockReturnValue({ structuredClone: undefined } as any);

    const result = getStructuredClone({ anthing: { can: { go: 'here' } } });
    expect(result).toEqual({ anthing: { can: { go: 'here' } } });
  });
});
