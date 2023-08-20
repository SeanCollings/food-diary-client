import { URI_BEVERAGE_TRENDS, URI_EXCERCISE_TRENDS } from '@client/constants';
import { trendFetcher } from '@client/fetchers';
import { TTimePeriod } from '@client/interfaces/meal-trend-data';
import {
  IBeverageTrendData,
  IExcerciseTrendData,
} from '@client/interfaces/wellness-trend-data';
import { useState, useMemo, useEffect } from 'react';
import useSWR from 'swr';

export interface IRequestBevarageTendData {
  week?: IBeverageTrendData;
}

interface IRequestedBeverage {
  week?: boolean;
}

export const useRequestBeverageTrends = (
  mounted: boolean,
  timePeriod: TTimePeriod,
) => {
  const [trendData, setTrendData] = useState<IRequestBevarageTendData>({});
  const [hasRequested, setHasRequested] = useState<IRequestedBeverage>({});

  const shouldFetch = useMemo(() => {
    const getWeek = timePeriod === 'week' && !hasRequested.week;

    return mounted && getWeek;
  }, [mounted, timePeriod, hasRequested]);

  const { data, error } = useSWR(
    shouldFetch ? [URI_BEVERAGE_TRENDS, timePeriod] : null,
    trendFetcher<IBeverageTrendData>,
  );

  useEffect(() => {
    if (timePeriod === 'week' && shouldFetch) {
      setTrendData((curr) => ({ ...curr, week: data }));
      // setHasRequested((curr) => ({ ...curr, week: true }));
    }
  }, [data, timePeriod, shouldFetch]);

  return {
    data: trendData,
    isLoading: !error && shouldFetch,
    isError: error,
  };
};

export interface IRequestExcerciseTendData {
  week?: IExcerciseTrendData;
}

interface IRequestedExcercise {
  week?: boolean;
}

export const useRequestExcerciseTrends = (
  mounted: boolean,
  timePeriod: TTimePeriod,
) => {
  const [trendData, setTrendData] = useState<IRequestExcerciseTendData>({});
  const [hasRequested, setHasRequested] = useState<IRequestedExcercise>({});

  const shouldFetch = useMemo(() => {
    const getWeek = timePeriod === 'week' && !hasRequested.week;

    return mounted && getWeek;
  }, [mounted, timePeriod, hasRequested]);

  const { data, error } = useSWR(
    shouldFetch ? [URI_EXCERCISE_TRENDS, timePeriod] : null,
    trendFetcher<IExcerciseTrendData>,
  );

  useEffect(() => {
    if (timePeriod === 'week' && shouldFetch) {
      setTrendData((curr) => ({ ...curr, week: data }));
      // setHasRequested((curr) => ({ ...curr, week: true }));
    }
  }, [data, timePeriod, shouldFetch]);

  return {
    data: trendData,
    isLoading: !error && shouldFetch,
    isError: error,
  };
};
