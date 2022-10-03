import { useMemo } from 'react';
import { useUserContext } from '@store/user-context';
import {
  EThemeDark,
  EThemeLight,
  ITheme,
  STATIC_THEME,
  THEME_DARK,
  THEME_DARK_DEFAULT,
  THEME_LIGHT,
  TThemeProperties,
} from '@utils/constants/theme.constants';

export const useTheme = (): TThemeProperties => {
  const {
    user: { darkMode, theme },
  } = useUserContext();

  const userTheme = useMemo(() => {
    const themeDefaults = darkMode ? STATIC_THEME.dark : STATIC_THEME.light;
    const currentTheme: ITheme = darkMode
      ? THEME_DARK[theme.dark || (THEME_DARK_DEFAULT.name as EThemeDark)]
      : THEME_LIGHT[theme.light || (THEME_DARK_DEFAULT.name as EThemeLight)];

    return { ...themeDefaults, ...currentTheme };
  }, [darkMode, theme.dark, theme.light]);

  return userTheme;
};
