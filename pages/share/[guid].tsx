import { useEffect, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import styled from 'styled-components';
import {
  getDaysAwayFromDate,
  setDateMidnightISOString,
} from '@utils/date-utils';
import Summary from '@components/summary';
import { summaryMockData } from '@client/mock';
import { IUserSummaryData } from '@client/interfaces/user-summary-data';

const DEFAULT_DAYS_SHOW = 7;

const SContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0 0 40px 0;
  min-height: 100%;
`;
const SUsernameContainer = styled.div`
  display: flex;
  align-items: baseline;
  gap: 12px;
  font-size: 20px;
  font-weight: 200;
  padding-bottom: 20px;
`;
const SUsername = styled.span`
  font-size: 28px;
  font-weight: 600;
`;

interface ISharePageProps {
  guid: string;
}

const SharePage: NextPage<ISharePageProps> = ({ guid }) => {
  const [userData, setUserData] = useState<IUserSummaryData | null>(null);
  const [hasError, setHasError] = useState(false);
  const [fromDate, setFromDate] = useState(
    getDaysAwayFromDate(-(DEFAULT_DAYS_SHOW - 1))
  );
  const [toDate, setToDate] = useState(new Date());

  useEffect(() => {
    const getData = () => {
      setTimeout(async () => {
        try {
          const { data } = await Promise.resolve({ data: summaryMockData });
          setUserData(data);
        } catch (err) {
          console.error(err);
          setHasError(true);
        }
      }, 1000);
    };

    getData();
  }, [guid]);

  const updateFromDate = (date: Date) => setFromDate(date);
  const updateToDate = (date: Date) => setToDate(date);
  const onDateRangeChanged = () => {
    console.log('DATE FROM :: ', setDateMidnightISOString(fromDate));
    console.log('DATE TO :: ', setDateMidnightISOString(toDate));
  };

  if (!userData) {
    return (
      <SContainer>
        <SUsernameContainer>Loading...</SUsernameContainer>
      </SContainer>
    );
  }

  if (hasError) {
    return (
      <SContainer>An error occurred. Please try again later...</SContainer>
    );
  }

  return (
    <SContainer>
      <SUsernameContainer>
        This profile belongs to:<SUsername>{userData.user}</SUsername>
      </SUsernameContainer>

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

type TParams = { guid: string };

export const getServerSideProps: GetServerSideProps<ISharePageProps> = async (
  context
) => {
  const { guid } = context.params as TParams;

  const guidExists = await Promise.resolve(true);

  if (!guidExists) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      guid,
    },
  };
};

export default SharePage;
