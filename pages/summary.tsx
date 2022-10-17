import Summary from '@components/summary';
import { IUserData, MOCK_USER_DATA } from '@components/summary/mock-data';
import {
  getDaysAwayFromDate,
  setDateMidnightISOString,
} from '@utils/date-utils';
import { NextPage } from 'next';
import { useEffect, useState, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { protectedSeverSideProps } from 'lib/server-props';
import { Session } from 'next-auth';
import { useUserContext } from '@store/user-context';

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
  const { user } = useUserContext();
  const [userData, setUserData] = useState<IUserData | null>(null);
  const [hasError, setHasError] = useState(false);
  const [fromDate, setFromDate] = useState(
    getDaysAwayFromDate(-(DEFAULT_DAYS_SHOW - 1))
  );
  const [toDate, setToDate] = useState(new Date());

  useLayoutEffect(() => {
    // console.log('-----------', user);
  }, [user]);

  useEffect(() => {
    const getData = () => {
      setTimeout(async () => {
        try {
          const { data } = await Promise.resolve({ data: MOCK_USER_DATA });
          setUserData(data);
        } catch (err) {
          console.error(err);
          setHasError(true);
        }
      }, 1000);
    };

    getData();
  }, []);

  const updateFromDate = (date: Date) => setFromDate(date);
  const updateToDate = (date: Date) => setToDate(date);
  const onDateRangeChanged = () => {
    console.log('DATE FROM :: ', setDateMidnightISOString(fromDate));
    console.log('DATE TO :: ', setDateMidnightISOString(toDate));
  };

  if (!userData) {
    return <SContainer>Loading...</SContainer>;
  }

  if (hasError) {
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
        updateFromDate={updateFromDate}
        updateToDate={updateToDate}
        onDateRangeChanged={onDateRangeChanged}
      />
    </SContainer>
  );
};

export const getServerSideProps = protectedSeverSideProps;

export default SummaryPage;
