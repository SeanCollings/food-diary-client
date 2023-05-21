import { renderHook } from '@testing-library/react';
import { useTheme as useNextTheme } from 'next-themes';
import { useTheme } from '.';

jest.mock('next-themes', () => ({ useTheme: jest.fn().mockReturnValue({}) }));

const mockNextThemes = jest.mocked(useNextTheme);

describe('hooks - use-theme', () => {
  mockNextThemes.mockReturnValue({
    theme: 'system',
    setTheme: jest.fn(),
  } as any);

  afterEach(() => jest.clearAllMocks());

  it('should return hook state', () => {
    jest
      .spyOn(document.documentElement, 'getAttribute')
      .mockReturnValue('light-theme');

    const { result } = renderHook(() => useTheme());
    expect(result.current).toMatchInlineSnapshot(`
      {
        "darkMode": false,
        "setTheme": [MockFunction],
        "theme": "system",
      }
    `);
  });

  it('should return darkmode true', () => {
    jest
      .spyOn(document.documentElement, 'getAttribute')
      .mockReturnValue('dark-theme');

    const { result } = renderHook(() => useTheme());
    expect(result.current.darkMode).toBeTruthy();
  });
});
