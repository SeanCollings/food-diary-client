export enum EThemeLight {
  DEFAULT_LIGHT = 'Default Light',
  ICE_CREAM_DREAM = 'Ice-cream Dream',
  COTTON_CANDY = 'Cotton Candy',
  MINT_FOREST = 'Mint Forest',
  CAFFE_LATTE = 'Caffe Latte',
}
export enum EThemeDark {
  DARK_GELATO = 'Dark Gelato',
  PUMPKIN_SPAICE = 'Pumkin Spice',
  PASSION_FRUIT = 'Passion Fruit',
  SOUR_APPLE = 'Sour Apple',
  CUPCAKE_SPRINKLES = 'Cupcake Sprinkles',
}

interface IThemeDefault {
  text: string;
  snack: string;
  error: string;
  backgroundPrimary: string;
  backgroundSecondary: string;
}

type TThemeTypes = 'light' | 'dark';
type TStaticTheme = {
  [key in TThemeTypes]: IThemeDefault;
};

export interface ITheme {
  name: EThemeLight | EThemeDark;
  primary: string;
  secondary: string;
  tertiary: string;
}
type TThemeLight = {
  [key in EThemeLight]: ITheme;
};
type TThemeDark = {
  [key in EThemeDark]: ITheme;
};

export type TThemeProperties = IThemeDefault & ITheme;

export const STATIC_THEME: TStaticTheme = {
  light: {
    text: '#232323',
    snack: '#BDB9B9',
    error: '#ff1507',
    backgroundPrimary: '#f4f4f4',
    backgroundSecondary: '#FFFFFF',
  },
  dark: {
    text: '#ffffff',
    snack: '#959595',
    error: '#fb3c36',
    backgroundPrimary: '#232323',
    backgroundSecondary: '#424242',
  },
};

export const THEME_LIGHT_DEFAULT: ITheme = {
  name: EThemeLight.DEFAULT_LIGHT,
  primary: '#56988C',
  secondary: '#E08644',
  tertiary: '#E0A944',
};
export const THEME_DARK_DEFAULT: ITheme = {
  name: EThemeDark.DARK_GELATO,
  primary: '#2A8B81',
  secondary: '#E42A5A',
  tertiary: '#F96F5D',
};

export const THEME_LIGHT: TThemeLight = {
  [EThemeLight.DEFAULT_LIGHT]: THEME_LIGHT_DEFAULT,
  [EThemeLight.ICE_CREAM_DREAM]: {
    name: EThemeLight.ICE_CREAM_DREAM,
    primary: '#FFA53B',
    secondary: '#FF738E',
    tertiary: '#FFD93B',
  },
  [EThemeLight.COTTON_CANDY]: {
    name: EThemeLight.COTTON_CANDY,
    primary: '#62B6CB',
    secondary: '#CF8BDA',
    tertiary: '#E09FB2',
  },
  [EThemeLight.MINT_FOREST]: {
    name: EThemeLight.MINT_FOREST,
    primary: '#9CA995',
    secondary: '#98B6B1',
    tertiary: '#A5B688',
  },
  [EThemeLight.CAFFE_LATTE]: {
    name: EThemeLight.CAFFE_LATTE,
    primary: '#D6CCC2',
    secondary: '#D5BDAF',
    tertiary: '#E3D5CA',
  },
};

export const THEME_DARK: TThemeDark = {
  [EThemeDark.DARK_GELATO]: THEME_DARK_DEFAULT,
  [EThemeDark.PUMPKIN_SPAICE]: {
    name: EThemeDark.PUMPKIN_SPAICE,
    primary: '#CA6702',
    secondary: '#AE2012',
    tertiary: '#BB3E03',
  },
  [EThemeDark.PASSION_FRUIT]: {
    name: EThemeDark.PASSION_FRUIT,
    primary: '#FA0644',
    secondary: '#AA02FF',
    tertiary: '#FA5300',
  },
  [EThemeDark.SOUR_APPLE]: {
    name: EThemeDark.SOUR_APPLE,
    primary: '#55A630',
    secondary: '#80B918',
    tertiary: '#2B9348',
  },
  [EThemeDark.CUPCAKE_SPRINKLES]: {
    name: EThemeDark.CUPCAKE_SPRINKLES,
    primary: '#A548FF',
    secondary: '#00B8BF',
    tertiary: '#6173FF',
  },
};
