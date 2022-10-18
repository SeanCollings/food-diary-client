import { EWellnessTypes } from '@utils/interfaces';

export interface IWellnessTrendData {
  type: 'week' | 'month';
  highestValue: number;
  legend: string[];
  data: { [key in EWellnessTypes]: number }[];
}

export interface IExcerciseTrendData {
  type: 'week' | 'month';
  highestValue: number;
  legend: string[];
  data: number[];
}
