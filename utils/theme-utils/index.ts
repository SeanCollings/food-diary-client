import { TThemeProperties } from '@utils/constants/theme.constants';
import { TMealType } from '@utils/interfaces';

export const getMealThemeColour = (theme: TThemeProperties, id?: TMealType) => {
  switch (id) {
    case 'breakfast':
      return theme.secondary;
    case 'lunch':
      return theme.primary;
    case 'dinner':
      return theme.tertiary;
    case 'snack_1':
    case 'snack_2':
      return theme.quaternary;
    default:
      return theme.primary;
  }
};
