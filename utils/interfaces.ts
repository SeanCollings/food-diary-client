export interface ICardProps {
  id: TMealType;
  title: TMealType;
}

export enum EMealType {
  BREAKFAST = 'Breakfast',
  SNACK_1 = 'Snack 1',
  LUNCH = 'Lunch',
  SNACK_2 = 'Snack 2',
  DINNER = 'Dinner',
}

export type TMealType = `${EMealType}`;

interface IThemeColour {
  colour: string;
  opacity: string;
}

export interface IAppTheme {
  primary: string;
  secondary: string;
  tertiary: string;
  quaternary: string;
  backgroundPrimary: string;
  backgroundSecondary: string;
  textDark: string;
  textLight: string;
  error: string;
  success: string;
}
