import {
  TWellnessEntry,
  TWellnessValueTypes,
} from '@lib/interfaces/wellness.interface';
import { TMealCard } from '@utils/interfaces';

export interface IDiaryReponseData {
  entry: {
    date: string;
    meals: { [date: string]: TMealCard };
    wellness: { [date: string]: TWellnessEntry<TWellnessValueTypes> };
  };
}

export interface ICalendarEntriesResponseBody {
  months: { [date: string]: boolean };
  entries: {
    [date: string]: number[];
  };
}
