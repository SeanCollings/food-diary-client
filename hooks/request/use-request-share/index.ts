import { URI_SHARE } from '@client/constants';
import { shareFetcher } from '@client/fetchers';
import useSWRImmutable from 'swr/immutable';
import { setDateMidnightISOString } from '@utils/date-utils';
import { IShareResponseBody } from '@client/interfaces/user-summary-data';

export const useRequestShare = (
  mounted: boolean,
  guid: string,
  dateFrom: Date,
  dateTo: Date
) => {
  const shouldFetch = mounted && !!guid;
  const dateFromISO = setDateMidnightISOString(dateFrom);
  const dateToISO = setDateMidnightISOString(dateTo);

  const { data, error } = useSWRImmutable(
    shouldFetch ? [URI_SHARE, guid, dateFromISO, dateToISO] : null,
    shareFetcher<IShareResponseBody>,
    {
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        if (retryCount >= 4) {
          return;
        }
      },
    }
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
