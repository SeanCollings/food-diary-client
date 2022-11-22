import { EWellnessTypes } from '@utils/interfaces';

export interface IBeverageTrendData {
  highestValue?: number;
  legend?: string[];
  beveragesPerDay?: { [key in EWellnessTypes]: number }[];
  ok?: boolean;
  message?: string;
}

export interface IExcerciseTrendData {
  highestValue?: number;
  legend?: string[];
  excercisePerDay?: number[];
  ok?: boolean;
  message?: string;
}
