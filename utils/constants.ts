import { EMealType, IAppTheme, ICardProps } from '@utils/interfaces';

export const OPACITY_10 = '1a';
export const OPACITY_20 = '33';
export const OPACITY_30 = '4d';
export const OPACITY_40 = '66';
export const OPACITY_50 = '80';
export const OPACITY_70 = 'b3';
export const OPACITY_80 = 'cc';

export const HEADER_PROPS = {
  mobile: {
    padding: 0,
    fontSize: 24,
    height: 80,
  },
  tablet: {
    padding: 0,
    fontSize: 44,
    height: 120,
  },
  desktopMedium: {
    padding: 30,
    fontSize: 64,
    height: 170,
  },
  desktopLarge: {
    padding: 30,
    fontSize: 64,
    height: 170,
  },
};

export const COLOURS = {
  pink: '#e42a5a',
  gray_light: '#f4f4f4',
  gray: '#a79f9f',
  gray_dark: '#a7a7a7',
  turquoise: '#66bfbf',
  purple: '#b8297f',
  blue: '#48a4d3',
  black: '#121212',
  error: '#ed0f0f',
  white_off: '#f7f7f7',
  white: '#ffffff',
};

export const ALL_MEAL_CARDS: ICardProps[] = [
  {
    id: EMealType.BREAKFAST,
    title: 'Breakfast',
  },
  {
    id: EMealType.SNACK_1,
    title: 'Snack 1',
  },
  {
    id: EMealType.LUNCH,
    title: 'Lunch',
  },
  {
    id: EMealType.SNACK_2,
    title: 'Snack 2',
  },
  {
    id: EMealType.DINNER,
    title: 'Dinner',
  },
];

export const APP_THEME_DEFAULT: IAppTheme = {
  primary: '#2a8b81', // lunch, menu, buttons
  secondary: '#e08644', // breakfast
  tertiary: '#e0a944', // dinner
  quaternary: '#bdb9b9', // snacks
  backgroundPrimary: '#f4f4f4', // app background
  backgroundSecondary: '#ffffff', // wellness background
  textDark: '#111111',
  textLight: '#ffffff',
  error: '#ed0f0f',
  success: '#66bf81',
};

export const MEDIA_MOBILE = '@media (max-width: 480px)';
export const MEDIA_TABLET = '@media (min-width: 481px) and (max-width: 768px)';
export const MEDIA_DESKTOP = '@media (min-width: 769px)';
export const MEDIA_MAX_DESKTOP = '@media (min-width: 1420px)';
export const MAX_PAGE_WIDTH = 1340;

export const MONTHS = [
  'January',
  'Febuary',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// https://foodandwellnessdiary.my.canva.site/
// https://react-icons.github.io/react-icons/icons?name=md
