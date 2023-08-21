export enum EThemeLight {
  DEFAULT_LIGHT = 'Default Light',
  ICE_CREAM_DREAM = 'Ice-cream Dream',
  COTTON_CANDY = 'Cotton Candy',
  MINT_FOREST = 'Mint Forest',
  CAFFE_LATTE = 'Caffe Latte',
}
export enum EThemeDark {
  DARK_GELATO = 'Dark Gelato',
  PUMPKIN_SPICE = 'Pumkin Spice',
  PASSION_FRUIT = 'Passion Fruit',
  SOUR_APPLE = 'Sour Apple',
  CUPCAKE_SPRINKLES = 'Cupcake Sprinkles',
}

export type TLightThemeIds =
  | 'light_1'
  | 'light_2'
  | 'light_3'
  | 'light_4'
  | 'light_5';
export type TDarkThemeIds =
  | 'dark_1'
  | 'dark_2'
  | 'dark_3'
  | 'dark_4'
  | 'dark_5';

export type TThemeIds = TLightThemeIds | TDarkThemeIds;

export interface IThemesStatic {
  '--text': string;
  '--text__40': string;
  '--success': string;
  '--error': string;
  '--bg-primary': string;
  '--bg-secondary': string;
  '--bg-secondary__60': string;
  '--bg-tertiary': string;
  '--th-quaternary': string;
  '--th-quaternary__80': string;
  '--th-quaternary__50': string;
  '--th-quaternary__40': string;
  '--th-quaternary__20': string;
}
export interface IThemes extends IThemesStatic {
  '--th-primary': string;
  '--th-primary__80': string;
  '--th-primary__40': string;
  '--th-secondary': string;
  '--th-secondary__80': string;
  '--th-secondary__40': string;
  '--th-tertiary': string;
  '--th-tertiary__80': string;
  '--th-tertiary__40': string;
}

export type TApplicationTheme = {
  id: TThemeIds;
  name: EThemeLight | EThemeDark;
  themes: IThemes;
  toThemeString: () => string;
};
