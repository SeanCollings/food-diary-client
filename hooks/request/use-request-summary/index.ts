import { URI_SUMMARY } from '@client/constants';
import { summaryFetcher } from '@client/fetchers';
import useSWRImmutable from 'swr/immutable';
import { useUserContext } from '@store/user-context';
import { setDateMidnightISOString } from '@utils/date-utils';
import { ISummaryResponseBody } from '@client/interfaces/user-summary-data';

export const useRequestSummary = (
  mounted: boolean,
  dateFrom: Date,
  dateTo: Date,
) => {
  const { userLoggedIn } = useUserContext();

  const shouldFetch = mounted && userLoggedIn;
  const dateFromISO = setDateMidnightISOString(dateFrom);
  const dateToISO = setDateMidnightISOString(dateTo);

  const { data, error } = useSWRImmutable(
    shouldFetch ? [URI_SUMMARY, dateFromISO, dateToISO] : null,
    summaryFetcher<ISummaryResponseBody>,
    {},
  );

  return {
    data,
    isLoading: !error && shouldFetch && !data,
    isError: error,
  };
};
