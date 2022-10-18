import { useTheme } from '@hooks/use-theme';

export const ThemeBorderBottom = () => {
  const { darkMode } = useTheme();
  return `border-bottom: 1px solid ${
    darkMode ? 'var(--bg-tertiary)' : `var(--th-quaternary__40)`
  };`;
};
export const ThemeBorderRight = () => {
  const { darkMode } = useTheme();
  return `border-right: 1px solid ${
    darkMode ? 'var(--bg-tertiary)' : `var(--th-quaternary__40)`
  };`;
};
