import { useState, useEffect, useMemo } from 'react';
import useSWR from 'swr';
import { useUserContext } from '@store/user-context';
import { formatMonthNumberYear, isMonthInFuture } from '@utils/date-utils';
import { calendarEntriesFetcher } from '@client/fetchers';
import { useAllEntriesPerMonthContext } from '@store/all-entries-per-month-context';
import { URI_DIARY_CALENDAR_ENTRIES } from '@client/constants';
import { ICalendarEntriesResponseBody } from '@client/interfaces/diary-data';
import { MAX_CALENDAR_ENTRIES_RANGE } from '@utils/validation/validation.constants';
import { AxiosError } from 'axios';

interface IRequested {
  [date: string]: boolean;
}

export const useRequestCalendarEntries = (date: string | Date | null) => {
  const { userLoggedIn } = useUserContext();
  const { requestSetAllEntriesPerMonth } = useAllEntriesPerMonthContext();
  const [hasRequested, setHasRequested] = useState<IRequested>({});
  const [currentError, setCurrentError] = useState<AxiosError>();

  const formattedDate = formatMonthNumberYear(date);

  const shouldFetch = useMemo(() => {
    const monthRequestedData = hasRequested[formattedDate];
    const shouldFetch =
      date &&
      userLoggedIn &&
      !monthRequestedData &&
      !isMonthInFuture(new Date(date));

    return shouldFetch;
  }, [hasRequested, formattedDate, date, userLoggedIn]);

  const { data, error } = useSWR(
    shouldFetch
      ? [URI_DIARY_CALENDAR_ENTRIES, date, MAX_CALENDAR_ENTRIES_RANGE]
      : null,
    calendarEntriesFetcher<ICalendarEntriesResponseBody>,
    {
      errorRetryCount: 4,
    },
  );

  useEffect(() => {
    if (shouldFetch && data?.months && data.entries) {
      setHasRequested((curr) => ({ ...curr, ...data.months }));
      requestSetAllEntriesPerMonth({ entries: data.entries });
    }
  }, [data, shouldFetch, requestSetAllEntriesPerMonth]);

  useEffect(() => {
    if (!!error && !hasRequested[formattedDate]) {
      setCurrentError(error);
      setHasRequested((curr) => ({
        ...curr,
        [formattedDate]: true,
      }));
    }
  }, [error, hasRequested, formattedDate]);

  return {
    isLoading: !error && shouldFetch && !data,
    isError: currentError?.message,
  };
};
