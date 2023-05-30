import { URI_SHARE } from '@client/constants';
import { shareFetcher } from '@client/fetchers';
import useSWRImmutable from 'swr/immutable';
import { setServerDateString } from '@utils/date-utils';
import { IShareResponseBody } from '@client/interfaces/user-summary-data';

export const useRequestShare = (
  mounted: boolean,
  guid: string,
  dateFrom: Date,
  dateTo: Date,
) => {
  const shouldFetch = mounted;
  const dateFromServer = setServerDateString(dateFrom);
  const dateToServer = setServerDateString(dateTo);

  const { data, error } = useSWRImmutable(
    shouldFetch ? [URI_SHARE, guid, dateFromServer, dateToServer] : null,
    shareFetcher<IShareResponseBody>,
    {
      errorRetryCount: 4,
    },
  );

  return {
    data,
    isLoading: !error && shouldFetch && !data,
    isError: error,
  };
};
