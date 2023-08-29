import { TApplicationTheme } from '@utils/constants/theme.interfaces';
import { TMealType, ThemeColor } from '@utils/interfaces';

export const getThemeColoursFromMealId = (id?: TMealType): ThemeColor => {
  switch (id) {
    case 'breakfast':
      return 'secondary';
    case 'lunch':
      return 'primary';
    case 'dinner':
      return 'tertiary';
    case 'snack_1':
    case 'snack_2':
      return 'quaternary';
    default:
      return 'primary';
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
      return '--th-primary';
    case 'secondary':
      return '--th-secondary';
    case 'tertiary':
      return '--th-tertiary';
    case 'quaternary':
      return '--th-quaternary';
    case 'background_primary':
      return '--bg-primary';
    case 'background_secondary':
      return '--bg-secondary';
    case 'background_tertiary':
      return '--bg-tertiary';
    default:
      return '--th-primary';
  }
};
