import { EMealType, EWellnessTypes } from '@utils/interfaces';

export type TMealContents = { [key in EMealType]?: string[] };
export type TWellnessContents = { [key in EWellnessTypes]: number };

export type TMealWellnessContents = {
  [date: string]: TMealContents & TWellnessContents;
};

export interface ISummaryResponseBody {
  totalDays: number;
  dates: string[];
  data: TMealWellnessContents;
}

export interface IShareResponseBody extends ISummaryResponseBody {
  user: string;
}
