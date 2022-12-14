import { TWellnessTypes } from '@utils/interfaces';

export type TAllWellnessType = TWellnessTypes | 'excercise';
export type TDrink = { value: number };
export type TExcercise = { time?: string; details?: string };

export type TWellnessValueTypes = TDrink | TExcercise;

export type TValue<K> = K;

export type TWellnessEntry<K> = {
  [key in TAllWellnessType]?: TValue<K>;
};

export interface IWellnessEntries {
  [date: string]: TWellnessEntry<TWellnessValueTypes>;
}

export type TWellnessEntryAndDate = TWellnessEntry<TWellnessValueTypes> & {
  date: string;
};

export interface IWellnessEntriesDto {
  [date: string]: TWellnessEntryAndDate;
}
