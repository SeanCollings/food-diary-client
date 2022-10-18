import { useMemo } from 'react';
import { useTheme as useNextTheme } from 'next-themes';
import { TThemeIds } from '@utils/constants/theme.interfaces';

export const useTheme = () => {
  const { theme, setTheme } = useNextTheme();

  return useMemo(
    () => ({
      darkMode: theme?.includes('dark') || false,
      theme: theme as TThemeIds | undefined,
      setTheme: setTheme as (theme: TThemeIds) => void,
    }),
    [setTheme, theme]
  );
};
