import {
  OPACITY_20,
  OPACITY_40,
  OPACITY_50,
  OPACITY_60,
  OPACITY_80,
} from '@utils/constants';
import {
  EThemeDark,
  EThemeLight,
  IThemesStatic,
  TApplicationTheme,
  TDarkThemeIds,
  TLightThemeIds,
  TThemeIds,
} from '@utils/constants/theme.interfaces';
import { toThemeString } from '@utils/theme-utils';

export const ALL_THEME_NAMES: TThemeIds[] = [
  'light_1',
  'light_2',
  'light_2',
  'light_4',
  'light_5',
  'dark_1',
  'dark_2',
  'dark_3',
  'dark_4',
  'dark_5',
];

/**
 * *************** Theme defaults ******************
 */
const THEMES_LIGHT_STATIC: IThemesStatic = {
  '--text': '#232323',
  '--text__40': `#232323${OPACITY_40}`,
  '--error': '#ff1507',
  '--bg-primary': '#f4f4f4',
  '--bg-secondary': '#FFFFFF',
  '--bg-secondary__60': `#FFFFFF${OPACITY_60}`,
  '--bg-tertiary': '#FFFFFF',
  '--th-quaternary': '#BDB9B9',
  '--th-quaternary__80': `#BDB9B9${OPACITY_80}`,
  '--th-quaternary__50': `#BDB9B9${OPACITY_50}`,
  '--th-quaternary__40': `#BDB9B9${OPACITY_40}`,
  '--th-quaternary__20': `#BDB9B9${OPACITY_20}`,
};
const THEMES_DARK_STATIC: IThemesStatic = {
  '--text': '#ffffffe6',
  '--text__40': `#ffffff${OPACITY_40}`,
  '--error': '#CF6679',
  '--bg-primary': '#121212',
  '--bg-secondary': '#222222',
  '--bg-secondary__60': `#222222${OPACITY_60}`,
  '--bg-tertiary': '#424242',
  '--th-quaternary': '#959595',
  '--th-quaternary__80': `#959595${OPACITY_80}`,
  '--th-quaternary__50': `#959595${OPACITY_50}`,
  '--th-quaternary__40': `#959595${OPACITY_40}`,
  '--th-quaternary__20': `#959595${OPACITY_20}`,
};

/**
 * *************** Light themes ******************
 */
export const THEME_LIGHT_1: TApplicationTheme = {
  id: 'light_1',
  name: EThemeLight.DEFAULT_LIGHT,
  themes: {
    ...THEMES_LIGHT_STATIC,
    '--th-primary': '#56988C',
    '--th-primary__80': `#56988C${OPACITY_80}`,
    '--th-primary__40': `#56988C${OPACITY_40}`,
    '--th-secondary': '#E08644',
    '--th-secondary__80': `#E08644${OPACITY_80}`,
    '--th-secondary__40': `#E08644${OPACITY_40}`,
    '--th-tertiary': ' #E0A944',
    '--th-tertiary__80': `#E0A944${OPACITY_80}`,
    '--th-tertiary__40': `#E0A944${OPACITY_40}`,
  },
  toThemeString,
};
export const THEME_LIGHT_2: TApplicationTheme = {
  id: 'light_2',
  name: EThemeLight.ICE_CREAM_DREAM,
  themes: {
    ...THEMES_LIGHT_STATIC,
    '--th-primary': '#FFA53B',
    '--th-primary__80': `#FFA53B${OPACITY_80}`,
    '--th-primary__40': `#FFA53B${OPACITY_40}`,
    '--th-secondary': '#FF738E',
    '--th-secondary__80': `#FF738E${OPACITY_80}`,
    '--th-secondary__40': `#FF738E${OPACITY_40}`,
    '--th-tertiary': ' #FFD93B',
    '--th-tertiary__80': `#FFD93B${OPACITY_80}`,
    '--th-tertiary__40': `#FFD93B${OPACITY_40}`,
  },
  toThemeString,
};
export const THEME_LIGHT_3: TApplicationTheme = {
  id: 'light_3',
  name: EThemeLight.COTTON_CANDY,
  themes: {
    ...THEMES_LIGHT_STATIC,
    '--th-primary': '#62B6CB',
    '--th-primary__80': `#62B6CB${OPACITY_80}`,
    '--th-primary__40': `#62B6CB${OPACITY_40}`,
    '--th-secondary': '#CF8BDA',
    '--th-secondary__80': `#CF8BDA${OPACITY_80}`,
    '--th-secondary__40': `#CF8BDA${OPACITY_40}`,
    '--th-tertiary': ' #E09FB2',
    '--th-tertiary__80': `#E09FB2${OPACITY_80}`,
    '--th-tertiary__40': `#E09FB2${OPACITY_40}`,
  },
  toThemeString,
};
export const THEME_LIGHT_4: TApplicationTheme = {
  id: 'light_4',
  name: EThemeLight.MINT_FOREST,
  themes: {
    ...THEMES_LIGHT_STATIC,
    '--th-primary': '#9CA995',
    '--th-primary__80': `#9CA995${OPACITY_80}`,
    '--th-primary__40': `#9CA995${OPACITY_40}`,
    '--th-secondary': '#98B6B1',
    '--th-secondary__80': `#98B6B1${OPACITY_80}`,
    '--th-secondary__40': `#98B6B1${OPACITY_40}`,
    '--th-tertiary': ' #A5B688',
    '--th-tertiary__80': `#A5B688${OPACITY_80}`,
    '--th-tertiary__40': `#A5B688${OPACITY_40}`,
  },
  toThemeString,
};
export const THEME_LIGHT_5: TApplicationTheme = {
  id: 'light_5',
  name: EThemeLight.CAFFE_LATTE,
  themes: {
    ...THEMES_LIGHT_STATIC,
    '--th-primary': '#D6CCC2',
    '--th-primary__80': `#D6CCC2${OPACITY_80}`,
    '--th-primary__40': `#D6CCC2${OPACITY_40}`,
    '--th-secondary': '#D5BDAF',
    '--th-secondary__80': `#D5BDAF${OPACITY_80}`,
    '--th-secondary__40': `#D5BDAF${OPACITY_40}`,
    '--th-tertiary': ' #E3D5CA',
    '--th-tertiary__80': `#E3D5CA${OPACITY_80}`,
    '--th-tertiary__40': `#E3D5CA${OPACITY_40}`,
  },
  toThemeString,
};

/**
 * *************** Dark themes ******************
 */
export const THEME_DARK_1: TApplicationTheme = {
  id: 'dark_1',
  name: EThemeDark.DARK_GELATO,
  themes: {
    ...THEMES_DARK_STATIC,
    '--th-primary': '#2A8B81',
    '--th-primary__80': `#2A8B81${OPACITY_80}`,
    '--th-primary__40': `#2A8B81${OPACITY_40}`,
    '--th-secondary': '#E42A5A',
    '--th-secondary__80': `#E42A5A${OPACITY_80}`,
    '--th-secondary__40': `#E42A5A${OPACITY_40}`,
    '--th-tertiary': ' #F96F5D',
    '--th-tertiary__80': `#F96F5D${OPACITY_80}`,
    '--th-tertiary__40': `#F96F5D${OPACITY_40}`,
  },
  toThemeString,
};
export const THEME_DARK_2: TApplicationTheme = {
  id: 'dark_2',
  name: EThemeDark.PUMPKIN_SPICE,
  themes: {
    ...THEMES_DARK_STATIC,
    '--th-primary': '#CA6702',
    '--th-primary__80': `#CA6702${OPACITY_80}`,
    '--th-primary__40': `#CA6702${OPACITY_40}`,
    '--th-secondary': '#AE2012',
    '--th-secondary__80': `#AE2012${OPACITY_80}`,
    '--th-secondary__40': `#AE2012${OPACITY_40}`,
    '--th-tertiary': ' #BB3E03',
    '--th-tertiary__80': `#BB3E03${OPACITY_80}`,
    '--th-tertiary__40': `#BB3E03${OPACITY_40}`,
  },
  toThemeString,
};
export const THEME_DARK_3: TApplicationTheme = {
  id: 'dark_3',
  name: EThemeDark.PASSION_FRUIT,
  themes: {
    ...THEMES_DARK_STATIC,
    '--th-primary': '#FA0644',
    '--th-primary__80': `#FA0644${OPACITY_80}`,
    '--th-primary__40': `#FA0644${OPACITY_40}`,
    '--th-secondary': '#AA02FF',
    '--th-secondary__80': `#AA02FF${OPACITY_80}`,
    '--th-secondary__40': `#AA02FF${OPACITY_40}`,
    '--th-tertiary': ' #FA5300',
    '--th-tertiary__80': `#FA5300${OPACITY_80}`,
    '--th-tertiary__40': `#FA5300${OPACITY_40}`,
  },
  toThemeString,
};
export const THEME_DARK_4: TApplicationTheme = {
  id: 'dark_4',
  name: EThemeDark.SOUR_APPLE,
  themes: {
    ...THEMES_DARK_STATIC,
    '--th-primary': '#55A630',
    '--th-primary__80': `#55A630${OPACITY_80}`,
    '--th-primary__40': `#55A630${OPACITY_40}`,
    '--th-secondary': '#80B918',
    '--th-secondary__80': `#80B918${OPACITY_80}`,
    '--th-secondary__40': `#80B918${OPACITY_40}`,
    '--th-tertiary': ' #2B9348',
    '--th-tertiary__80': `#2B9348${OPACITY_80}`,
    '--th-tertiary__40': `#2B9348${OPACITY_40}`,
  },
  toThemeString,
};
export const THEME_DARK_5: TApplicationTheme = {
  id: 'dark_5',
  name: EThemeDark.CUPCAKE_SPRINKLES,
  themes: {
    ...THEMES_DARK_STATIC,
    '--th-primary': '#A548FF',
    '--th-primary__80': `#A548FF${OPACITY_80}`,
    '--th-primary__40': `#A548FF${OPACITY_40}`,
    '--th-secondary': '#00B8BF',
    '--th-secondary__80': `#00B8BF${OPACITY_80}`,
    '--th-secondary__40': `#00B8BF${OPACITY_40}`,
    '--th-tertiary': ' #6173FF',
    '--th-tertiary__80': `#6173FF${OPACITY_80}`,
    '--th-tertiary__40': `#6173FF${OPACITY_40}`,
  },
  toThemeString,
};

export const LIGHT_THEMES: { [key in TLightThemeIds]: TApplicationTheme } = {
  light_1: THEME_LIGHT_1,
  light_2: THEME_LIGHT_2,
  light_3: THEME_LIGHT_3,
  light_4: THEME_LIGHT_4,
  light_5: THEME_LIGHT_5,
};

export const DARK_THEMES: { [key in TDarkThemeIds]: TApplicationTheme } = {
  dark_1: THEME_DARK_1,
  dark_2: THEME_DARK_2,
  dark_3: THEME_DARK_3,
  dark_4: THEME_DARK_4,
  dark_5: THEME_DARK_5,
};
