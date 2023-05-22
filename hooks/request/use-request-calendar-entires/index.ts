import { useState, useEffect, useMemo } from 'react';
import useSWR from 'swr';
import { useUserContext } from '@store/user-context';
import { formatMonthNumberYear } from '@utils/date-utils';
import { calendarEntriesFetcher } from '@client/fetchers';
import { useAllEntriesPerMonthContext } from '@store/all-entries-per-month-context';
import { URI_DIARY_CALENDAR_ENTRIES } from '@client/constants';
import { ICalendarEntriesResponseBody } from '@client/interfaces/diary-data';
import { MAX_CALENDAR_ENTRIES_RANGE } from '@utils/validation/validation.constants';

interface IRequested {
  [date: string]: boolean;
}

export const useRequestCalendarEntries = (date: string | Date | null) => {
  const { userLoggedIn } = useUserContext();
  const { requestSetAllEntriesPerMonth } = useAllEntriesPerMonthContext();
  const [hasRequested, setHasRequested] = useState<IRequested>({});

  const shouldFetch = useMemo(() => {
    const monthRequestedData = hasRequested[formatMonthNumberYear(date)];
    const shouldFetch = date && userLoggedIn && !monthRequestedData;
    return shouldFetch;
  }, [date, userLoggedIn, hasRequested]);

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

  return {
    isLoading: !error && shouldFetch && !data,
    isError: error,
  };
};
