import Summary from '@components/summary';
import { dateNow, getDaysAwayFromDate } from '@utils/date-utils';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { protectedSeverSideProps } from '@lib/server-props';
import { Session } from 'next-auth';
import { useRequestSummary } from '@hooks/request/use-request-summary';
import { ISummaryResponseData } from '@client/interfaces/user-summary-data';
import { useErrorToast } from '@hooks/use-error-toast';

const DEFAULT_DAYS_SHOW = 7;

const SContainer = styled.section`
  display: flex;
  align-items: flex-start;
  height: 100%;
`;

type TDate = Date | string;
interface ISummaryPageProps {
  session: Session;
}

const SummaryPage: NextPage<ISummaryPageProps> = ({ session }) => {
  const [mounted, setMounted] = useState(false);
  const [userData, setUserData] = useState<ISummaryResponseData | null>(null);
  const [fromDate, setFromDate] = useState<TDate>(
    getDaysAwayFromDate(-(DEFAULT_DAYS_SHOW - 1)),
  );
  const [toDate, setToDate] = useState<TDate>(new Date(dateNow()));
  const { data, isLoading, isError } = useRequestSummary(
    mounted,
    fromDate,
    toDate,
  );

  useErrorToast({
    error: !!isError,
    title: 'Error!',
    message: 'An error occurred. Please try again later.',
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (data?.data) {
      setUserData(data.data);
    }
  }, [data]);

  const onApplyNewDateRange = (fromDate: TDate, toDate: TDate) => {
    setFromDate(fromDate);
    setToDate(toDate);
  };

  if (isError) {
    return <SContainer>Something went wrong.</SContainer>;
  }

  if (isLoading && !userData) {
    return <SContainer>Loading...</SContainer>;
  }

  if (!userData) {
    return <SContainer></SContainer>;
  }

  return (
    <SContainer>
      <Summary
        isLoading={isLoading}
        userData={userData}
        fromDate={fromDate}
        toDate={toDate}
        defaultShowDays={DEFAULT_DAYS_SHOW}
        onApplyNewDateRange={onApplyNewDateRange}
      />
    </SContainer>
  );
};

export const getServerSideProps = protectedSeverSideProps;

export default SummaryPage;
