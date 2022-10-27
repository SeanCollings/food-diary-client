import { EWellnessTypes } from '@utils/interfaces';

export interface IBeverageTrendData {
  highestValue: number;
  legend: string[];
  data: { [key in EWellnessTypes]: number }[];
}

export interface IExcerciseTrendData {
  highestValue: number;
  legend: string[];
  data: number[];
}
