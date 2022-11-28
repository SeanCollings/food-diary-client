import { EMealType, EWellnessTypes } from '@utils/interfaces';

export type TMealContents = { [key in EMealType]?: string[] };
export type TWellnessContents = { [key in EWellnessTypes]: number };

export type TMealWellnessContents = {
  [date: string]: TMealContents & TWellnessContents;
};

export interface ISummaryResponseData {
  totalDays: number;
  dates: string[];
  data: TMealWellnessContents;
}

export interface IShareResponseData extends ISummaryResponseData {
  user: string;
}

export interface IShareResponseBody {
  summary?: IShareResponseData;
  ok: boolean;
  message?: string;
}

export interface ISummaryResponseBody {
  ok: boolean;
  data?: ISummaryResponseData;
  message?: string;
}
