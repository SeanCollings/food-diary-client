import { URI_SUMMARY } from '@client/constants';
import { summaryFetcher } from '@client/fetchers';
import useSWR from 'swr';
import { useUserContext } from '@store/user-context';
import { setDateMidnightISOString } from '@utils/date-utils';
import { ISummaryResponseBody } from '@client/interfaces/user-summary-data';

export const useRequestSummary = (
  mounted: boolean,
  dateFrom: Date,
  dateTo: Date
) => {
  const { userLoggedIn } = useUserContext();

  const shouldFetch = mounted && userLoggedIn;
  const dateFromISO = setDateMidnightISOString(dateFrom);
  const dateToISO = setDateMidnightISOString(dateTo);

  const { data, error } = useSWR(
    shouldFetch ? [URI_SUMMARY, dateFromISO, dateToISO] : null,
    summaryFetcher<ISummaryResponseBody>,
    {}
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
