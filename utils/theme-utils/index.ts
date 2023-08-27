import { TApplicationTheme } from '@utils/constants/theme.interfaces';
import { TMealType, ThemeColor } from '@utils/interfaces';

export const getThemeColoursFromMealId = (id?: TMealType) => {
  switch (id) {
    case 'breakfast':
      return '--th-secondary';
    case 'lunch':
      return '--th-primary';
    case 'dinner':
      return '--th-tertiary';
    case 'snack_1':
    case 'snack_2':
      return '--th-quaternary';
    default:
      return '--th-primary';
  }
};

export const toThemeString = function (this: TApplicationTheme) {
  return Object.entries(this.themes).reduce((acc, [key, value]) => {
    acc += `${key}:${value};`;
    return acc;
  }, '');
};

export const getThemeVarColor = (type?: ThemeColor) => {
  switch (type) {
    case 'primary':
      return 'var(--th-primary)';
    case 'secondary':
      return 'var(--th-secondary)';
    case 'tertiary':
      return 'var(--th-tertiary)';
    case 'quaternary':
      return 'var(--th-quaternary)';
    default:
      return 'var(--th-primary)';
  }
};
