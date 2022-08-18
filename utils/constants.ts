import { EMealTypes, ICardProps } from '@utils/interfaces';
export const OPACITY_10 = '1a';
export const OPACITY_30 = '4d';
export const OPACITY_40 = '66';
export const OPACITY_50 = '80';
export const OPACITY_70 = 'b3';

export const COLOURS = {
  pink: '#e42a5a',
  gray_light: '#f4f4f4',
  gray: '#a79f9f',
  gray_dark: '#a7a7a7',
  turquoise: '#66bfbf',
  purple: '#b8297f',
  white_off: '#f7f7f7',
  blue: '#48a4d3',
  black: '#111111',
  error: '#ed0f0f',
};

export const DEFAULT_MEAL_CARD_ARRAY: ICardProps[] = [
  {
    id: EMealTypes.BREAKFAST,
    title: EMealTypes.BREAKFAST,
    primary: COLOURS.pink,
    secondary: COLOURS.white_off,
  },
  {
    id: EMealTypes.SNACK_1,
    title: EMealTypes.SNACK_1,
    primary: COLOURS.gray,
    secondary: '#cc82ad',
  },
  {
    id: EMealTypes.LUNCH,
    title: EMealTypes.LUNCH,
    primary: COLOURS.turquoise,
    secondary: COLOURS.white_off,
  },
  {
    id: EMealTypes.SNACK_2,
    title: EMealTypes.SNACK_2,
    primary: COLOURS.gray,
    secondary: '#cc82ad',
  },
  {
    id: EMealTypes.DINNER,
    title: EMealTypes.DINNER,
    primary: COLOURS.purple,
    secondary: COLOURS.white_off,
  },
];
export const MENU_ICON_COLOUR = {
  primary: COLOURS.turquoise,
  secondary: COLOURS.white_off,
};

export const MEDIA_MOBILE = '@media (max-width: 480px)';
export const MEDIA_TABLET = '@media (min-width: 481px) and (max-width: 768px)';
export const MEDIA_DESKTOP = '@media (min-width: 769px)';
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
// https://github.com/missive/emoji-mart
// https://www.cssscript.com/demo/fg-emoji-picker/
// https://picmojs.com/storybook/?path=/story/emoji-picker--native
// https://react-icons.github.io/react-icons/icons?name=md
