import { IAppTheme, TMealType } from '@utils/interfaces';

export const getMealThemeColour = (theme: IAppTheme, id?: TMealType) => {
  switch (id) {
    case 'Breakfast':
      return theme.secondary;
    case 'Lunch':
      return theme.primary;
    case 'Dinner':
      return theme.tertiary;
    case 'Snack 1':
    case 'Snack 2':
      return theme.quaternary;
    default:
      return theme.primary;
  }
};
