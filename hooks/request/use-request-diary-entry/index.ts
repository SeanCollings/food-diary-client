import { URI_DIARY } from '@client/constants';
import { diaryEntryFetcher } from '@client/fetchers';
import { IDiaryReponseData } from '@client/interfaces/diary-data';
import { useDateSelectedContext } from '@store/date-selected-context';
import { useMealEntriesContext } from '@store/meal-entries-context';
import { useUserContext } from '@store/user-context';
import { useWellnessEntriesContext } from '@store/wellness-entries-context';
import { formatMonthNumberYear } from '@utils/date-utils';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

interface IRequested {
  [date: string]: boolean;
}

export const useRequestDiaryEntry = (mounted: boolean) => {
  const { dateSelectedISO } = useDateSelectedContext();
  const { userLoggedIn } = useUserContext();
  const { requestSetMealEntries } = useMealEntriesContext();
  const { requestSetWellnessEntries } = useWellnessEntriesContext();

  const [hasRequested, setHasRequested] = useState<IRequested>({});

  const monthAndYear = formatMonthNumberYear(dateSelectedISO);
  const monthRequestedData = hasRequested[monthAndYear];
  const shouldFetch = mounted && userLoggedIn && !monthRequestedData;

  const { data, error } = useSWR(
    shouldFetch ? [URI_DIARY, dateSelectedISO] : null,
    diaryEntryFetcher<IDiaryReponseData>,
    {}
  );

  useEffect(() => {
    if (!monthRequestedData && data?.entry.date === dateSelectedISO) {
      requestSetMealEntries({ meals: data.entry.meals });
      requestSetWellnessEntries({ wellness: data.entry.wellness });
      setHasRequested((curr) => ({ ...curr, [monthAndYear]: true }));
    }

    return () => {};
  }, [
    data,
    monthAndYear,
    dateSelectedISO,
    monthRequestedData,
    requestSetMealEntries,
    requestSetWellnessEntries,
  ]);

  return {
    data,
    isLoading: !error && !monthRequestedData,
    isError: error,
  };
};
