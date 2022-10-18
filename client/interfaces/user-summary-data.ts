import { EMealType, EWellnessTypes } from '@utils/interfaces';

type TMealContents = { [key in EMealType]: string[] };
type TWellnessContents = { [key in EWellnessTypes]: number };

export interface IUserSummaryData {
  user: string;
  totalDays: number;
  dates: string[];
  data: {
    [key: string]: TMealContents & TWellnessContents;
  };
}
