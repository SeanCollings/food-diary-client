import { TWellnessTypes } from '@utils/interfaces';

export type TAllWellnessType = TWellnessTypes | 'excercise';
export type TDrink = { value: number };
export type TExcercise = { time?: string; details?: string };

export type TWellnessValueTypes = TDrink | TExcercise;

export type TValue<K> = K;

export type TWellnessEntry<K> = {
  [key in TAllWellnessType]?: TValue<K>;
};

export type TBeverageEntry = {
  [key in TWellnessTypes]?: TDrink;
};
export type TExcerciseEntry = { excercise?: TExcercise };

export type TWellnessEntries = TBeverageEntry | TExcerciseEntry;

export interface IWellnessEntries {
  [date: string]: TWellnessEntries;
}

export type TWellnessEntryAndDate = TWellnessEntries & {
  date: string;
};

export interface IWellnessEntriesDto {
  [date: string]: TWellnessEntryAndDate;
}
