import { useTheme } from '@hooks/use-theme';

interface IThemePick {
  background?: boolean;
  colour?: boolean;
}

export const ThemeBackgroundPrimary = () =>
  `background-color: ${useTheme().backgroundPrimary};`;
export const ThemeBackgroundSecondary = () =>
  `background-color: ${useTheme().backgroundSecondary};`;
export const ThemeTextColor = () => `color: ${useTheme().text};`;
export const ThemeBorderBottom = () => {
  const theme = useTheme();
  return `border-bottom: 1px solid ${
    theme.darkMode ? theme.backgroundTertiary : theme.quaternary
  };`;
};

export const ThemePrimary = ({
  background = true,
  colour = true,
}: IThemePick) => {
  const theme = useTheme();
  return `${background && `background-color: ${theme.primary};`}${
    colour && `color: ${theme.primary};`
  }`;
};

export const ThemeSeconday = () => `background-color: ${useTheme().secondary};`;
export const ThemeTertiary = () => `background-color: ${useTheme().tertiary};`;
