import Summary from '@components/summary';
import { getDaysAwayFromDate } from '@utils/date-utils';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { protectedSeverSideProps } from '@lib/server-props';
import { Session } from 'next-auth';
import { IUserSummaryData } from '@client/interfaces/user-summary-data';
import { useRequestSummary } from '@hooks/request/use-request-summary';

const DEFAULT_DAYS_SHOW = 7;

const SContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface ISummaryPageProps {
  session: Session;
}

const SummaryPage: NextPage<ISummaryPageProps> = ({ session }) => {
  const [mounted, setMounted] = useState(false);
  const [userData, setUserData] = useState<IUserSummaryData | null>(null);
  const [fromDate, setFromDate] = useState(
    getDaysAwayFromDate(-(DEFAULT_DAYS_SHOW - 1))
  );
  const [toDate, setToDate] = useState(new Date());
  const { data, isLoading, isError } = useRequestSummary(
    mounted,
    fromDate,
    toDate
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (data) {
      setUserData(data);
    }
  }, [data]);

  const onApplyNewDateRange = (fromDate: Date, toDate: Date) => {
    setFromDate(fromDate);
    setToDate(toDate);
  };

  if (isLoading || !userData) {
    return <SContainer>Loading...</SContainer>;
  }

  if (isError) {
    return (
      <SContainer>An error occurred. Please try again later...</SContainer>
    );
  }

  return (
    <SContainer>
      <Summary
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
