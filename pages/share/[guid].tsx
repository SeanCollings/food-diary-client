import { useEffect, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import styled from 'styled-components';
import { dateNow, getDaysAwayFromDate } from '@utils/date-utils';
import Summary from '@components/summary';
import { IShareResponseData } from '@client/interfaces/user-summary-data';
import { useRequestShare } from '@hooks/request/use-request-share';
import Head from 'next/head';

const DEFAULT_DAYS_SHOW = 7;

const SContainer = styled.section`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  width: 100%;
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

type TDate = Date | string;
interface ISharePageProps {
  guid: string;
}

const SharePage: NextPage<ISharePageProps> = ({ guid }) => {
  const [mounted, setMounted] = useState(false);
  const [userData, setUserData] = useState<IShareResponseData | undefined>();
  const [fromDate, setFromDate] = useState<TDate>(
    getDaysAwayFromDate(-(DEFAULT_DAYS_SHOW - 1)),
  );
  const [toDate, setToDate] = useState<TDate>(new Date(dateNow()));
  const { data, isLoading, isError } = useRequestShare(
    mounted,
    guid,
    fromDate,
    toDate,
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (data?.summary) {
      setUserData(data.summary);
    }
  }, [data]);

  const onApplyNewDateRange = (fromDate: TDate, toDate: TDate) => {
    setFromDate(fromDate);
    setToDate(toDate);
  };

  if (isError) {
    return (
      <SContainer>An error occurred. Please try again later...</SContainer>
    );
  }

  if (isLoading && !userData) {
    return (
      <SContainer>
        <SUsernameContainer>Loading...</SUsernameContainer>
      </SContainer>
    );
  }

  if (!userData) {
    return <SContainer></SContainer>;
  }

  return (
    <>
      <Head>
        <title>Shared Diary</title>
        <meta
          property="og:image"
          content={`${process.env.VERCEL_URL || ''}/api/static?path=share`}
        />
        <meta name="og:title" content={'Shared Diary'} />
        <meta name="og:url" content={`${process.env.VERCEL_URL || ''}/share`} />
      </Head>
      <SContainer>
        {userData.user && (
          <SUsernameContainer>
            This profile belongs to:<SUsername>{userData.user}</SUsername>
          </SUsernameContainer>
        )}

        <Summary
          isLoading={isLoading}
          userData={userData}
          fromDate={fromDate}
          toDate={toDate}
          defaultShowDays={DEFAULT_DAYS_SHOW}
          onApplyNewDateRange={onApplyNewDateRange}
        />
      </SContainer>
    </>
  );
};

type TParams = { guid: string };

export const getServerSideProps: GetServerSideProps<ISharePageProps> = async (
  context,
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
