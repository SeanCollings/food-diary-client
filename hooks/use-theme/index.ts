import { useCallback, useMemo } from 'react';
import { useTheme as useNextTheme } from 'next-themes';
import { TThemeIds } from '@utils/constants/theme.interfaces';

export const useTheme = () => {
  const { theme, setTheme } = useNextTheme();

  const isDarkMode = useCallback(() => {
    const dataTheme = document.documentElement.getAttribute('data-theme');
    return (
      (dataTheme?.includes('dark') && theme === 'system') ||
      theme?.includes('dark') ||
      false
    );
  }, [theme]);

  return useMemo(() => {
    return {
      darkMode: isDarkMode(),
      theme: theme as TThemeIds | undefined,
      setTheme: setTheme as (theme: TThemeIds) => void,
    };
  }, [theme, setTheme, isDarkMode]);
};
