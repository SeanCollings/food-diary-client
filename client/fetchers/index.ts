import axios from 'axios';

export const fetcher = async <T extends unknown>(url: string) =>
  await axios.get<T>(url).then((res) => res.data);

export const diaryEntryFetcher = async <T extends unknown>(
  url: string,
  date: string
) => await axios.get<T>(`${url}?date=${date}`).then((res) => res.data);

export const calendarEntriesFetcher = async <T extends unknown>(
  url: string,
  date: string,
  monthsToReturn: number
) =>
  await axios
    .get<T>(`${url}?date=${date}&months=${monthsToReturn}`)
    .then((res) => res.data);

export const summaryFetcher = async <T extends unknown>(
  url: string,
  dateFrom: string,
  dateTo: number
) =>
  await axios
    .get<T>(`${url}?dateFrom=${dateFrom}&dateTo=${dateTo}`)
    .then((res) => res.data);

export const shareFetcher = async <T extends unknown>(
  url: string,
  guid: string,
  dateFrom: string,
  dateTo: number
) =>
  await axios
    .get<T>(`${url}?guid=${guid}&dateFrom=${dateFrom}&dateTo=${dateTo}`)
    .then((res) => res.data);
