import {
  TWellnessEntry,
  TWellnessValueTypes,
} from '@lib/interfaces/wellness.interface';
import { TMealCard } from '@utils/interfaces';

export interface IDiaryReponseData {
  entry?: {
    meals: { [date: string]: TMealCard };
    wellness: { [date: string]: TWellnessEntry<TWellnessValueTypes> };
  };
  ok: boolean;
  message?: string;
}

export interface ICalendarEntriesResponseBody {
  months?: { [date: string]: boolean };
  entries?: {
    [date: string]: number[];
  };
  ok: boolean;
  message?: string;
}
