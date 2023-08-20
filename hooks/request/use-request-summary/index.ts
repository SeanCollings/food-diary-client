import { URI_SUMMARY } from '@client/constants';
import { summaryFetcher } from '@client/fetchers';
import useSWR from 'swr';
import { useUserContext } from '@store/user-context';
import { setServerDateString } from '@utils/date-utils';
import { ISummaryResponseBody } from '@client/interfaces/user-summary-data';

export const useRequestSummary = (
  mounted: boolean,
  dateFrom: Date | string,
  dateTo: Date | string,
) => {
  const { userLoggedIn } = useUserContext();

  const shouldFetch = mounted && userLoggedIn;
  const dateFromServer = setServerDateString(dateFrom);
  const dateToServer = setServerDateString(dateTo);

  const { data, error } = useSWR(
    shouldFetch ? [URI_SUMMARY, dateFromServer, dateToServer] : null,
    summaryFetcher<ISummaryResponseBody>,
    {},
  );

  return {
    data,
    isLoading: !error && shouldFetch && !data,
    isError: error,
  };
};
