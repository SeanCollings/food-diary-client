import { URI_MEAL_TRENDS } from '@client/constants';
import { trendFetcher } from '@client/fetchers';
import {
  IMealTrendData,
  IMealTrendResponseBody,
  TTimePeriod,
} from '@client/interfaces/meal-trend-data';
import useSWR from 'swr';
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
  timePeriod: TTimePeriod,
) => {
  const [trendData, setTrendData] = useState<IRequestTrendData>({});
  const [hasRequested, setHasRequested] = useState<IRequested>({});

  const shouldFetch = useMemo(() => {
    const getWeek = timePeriod === 'week' && !hasRequested.week;
    const getMonth = timePeriod === 'month' && !hasRequested.month;

    return mounted && (getWeek || getMonth);
  }, [mounted, timePeriod, hasRequested]);

  const { data, error } = useSWR(
    shouldFetch ? [URI_MEAL_TRENDS, timePeriod] : null,
    trendFetcher<IMealTrendResponseBody>,
  );

  useEffect(() => {
    if (timePeriod === 'week' && shouldFetch) {
      setTrendData((curr) => ({ ...curr, week: data as IMealTrendData }));
      // setHasRequested((curr) => ({ ...curr, week: true }));
    }
    if (timePeriod === 'month' && shouldFetch) {
      setTrendData((curr) => ({ ...curr, month: data as IMealTrendData }));
      // setHasRequested((curr) => ({ ...curr, month: true }));
    }
  }, [data, timePeriod, shouldFetch]);

  return {
    data: trendData,
    isLoading: !error && shouldFetch && !data,
    isError: error,
  };
};
