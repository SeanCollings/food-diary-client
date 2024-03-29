import { TTimePeriod } from '@client/interfaces/meal-trend-data';
import axios from 'axios';

/********************** User *********************/

export const userProfileFetcher = async <T extends unknown>(url: string) =>
  await axios.get<T>(url).then((res) => res.data);

/********************** Diary *********************/

export const diaryEntryFetcher = async <T extends unknown>(
  url: string | Date,
  date: string,
) => await axios.get<T>(`${url}?date=${date}`).then((res) => res.data);

/********************** Calendar *********************/

export const calendarEntriesFetcher = async <T extends unknown>(
  url: string,
  date: string | Date,
  monthsToReturn: number,
) =>
  await axios
    .get<T>(`${url}?date=${date}&months=${monthsToReturn}`)
    .then((res) => res.data);

/********************** Summary *********************/

export const summaryFetcher = async <T extends unknown>(
  url: string,
  dateFrom: string | Date,
  dateTo: string | Date,
) =>
  await axios
    .get<T>(`${url}?dateFrom=${dateFrom}&dateTo=${dateTo}`)
    .then((res) => res.data);

/********************** Share *********************/

export const shareFetcher = async <T extends unknown>(
  url: string,
  guid: string,
  dateFrom: string | Date,
  dateTo: string | Date,
) =>
  await axios
    .get<T>(`${url}?link=${guid}&dateFrom=${dateFrom}&dateTo=${dateTo}`)
    .then((res) => res.data);

/********************** Trends *********************/

export const trendFetcher = async <T extends unknown>(
  url: string,
  timePeriod: TTimePeriod,
) => await axios.get<T>(`${url}?type=${timePeriod}`).then((res) => res.data);
