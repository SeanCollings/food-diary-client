import { TSelectedEmoji } from '@components/emoji-picker';

export interface ICardProps {
  id: TMealType;
  title: string;
}

export enum EMealType {
  BREAKFAST = 'breakfast',
  SNACK_1 = 'snack_1',
  LUNCH = 'lunch',
  SNACK_2 = 'snack_2',
  DINNER = 'dinner',
}
export type TMealType = `${EMealType}`;

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

export interface IMealContent {
  id: string;
  emoji?: TSelectedEmoji;
  quantity?: string;
  food: string;
  description?: string;
}

export interface IMealTypeContent {
  contents: IMealContent[];
}

export type TMealCard = {
  [key in TMealType]?: IMealTypeContent;
};

export interface IExerciseDetails {
  time?: string;
  details?: string;
}

export interface IWellness {
  value?: number;
}

export interface IDiaryEntry {
  meals: TMealCard;
  excercise: IExerciseDetails;
  [EWellnessTypes.WATER]?: IWellness;
  [EWellnessTypes.TEA_COFFEE]?: IWellness;
  [EWellnessTypes.ALCOHOL]?: IWellness;
}

export enum EWellnessTypes {
  WATER = 'water',
  TEA_COFFEE = 'tea_coffee',
  ALCOHOL = 'alcohol',
}
export type TWellnessTypes = `${EWellnessTypes}`;

export interface IWellnessProps {
  id: TWellnessTypes;
  title: string;
}

export enum EAddMealOptions {
  EMOJI_PICKER = 'emojiPicker',
  QUANTITY = 'quantity',
  FOOD = 'food',
  DESCRIPTION = 'description',
  MEAL_TYPE = 'mealType',
}
export type TAddMealOptions = `${EAddMealOptions}`;

export type ThemeColor = 'primary' | 'secondary' | 'tertiary' | 'quaternary';
