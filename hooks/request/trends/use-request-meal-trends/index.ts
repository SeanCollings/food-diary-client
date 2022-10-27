import { URI_MEAL_TRENDS } from '@client/constants';
import { mealTrendFetcher } from '@client/fetchers';
import {
  IMealTrendData,
  IMealTrendResponseBody,
  TTimePeriod,
} from '@client/interfaces/meal-trend-data';
import useSWRImmutable from 'swr/immutable';
import { useMemo, useState, useEffect } from 'react';

export interface IRequestTrendData {
  week?: IMealTrendData;
  month?: IMealTrendData;
}

interface IRequested {
  week?: boolean;
  month?: boolean;
}

export const useRequestMealTrends = (
  mounted: boolean,
  timePeriod: TTimePeriod
) => {
  const [trendData, setTrendData] = useState<IRequestTrendData>({});
  const [hasRequested, setHasRequested] = useState<IRequested>({});

  const shouldFetch = useMemo(() => {
    const getWeek = timePeriod === 'week' && !hasRequested.week;
    const getMonth = timePeriod === 'month' && !hasRequested.month;

    return mounted && (getWeek || getMonth);
  }, [mounted, timePeriod, hasRequested]);
  const { data, error } = useSWRImmutable(
    shouldFetch ? [URI_MEAL_TRENDS, timePeriod] : null,
    mealTrendFetcher<IMealTrendResponseBody>
  );

  useEffect(() => {
    if (timePeriod === 'week' && shouldFetch) {
      setTrendData((curr) => ({ ...curr, week: data }));
      // setHasRequested((curr) => ({ ...curr, week: true }));
    }
    if (timePeriod === 'month' && shouldFetch) {
      setTrendData((curr) => ({ ...curr, month: data }));
      // setHasRequested((curr) => ({ ...curr, month: true }));
    }
  }, [data, timePeriod, shouldFetch]);

  return {
    data: trendData,
    isLoading: !error && shouldFetch,
    isError: error,
  };
};
