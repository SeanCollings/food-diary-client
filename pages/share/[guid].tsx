import { useEffect, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import styled from 'styled-components';
import { dateNow, getDaysAwayFromDate } from '@utils/date-utils';
import Summary from '@components/summary';
import { IShareResponseData } from '@client/interfaces/user-summary-data';
import { useRequestShare } from '@hooks/request/use-request-share';
import Head from 'next/head';
import { useErrorToast } from '@hooks/use-error-toast';
import { SpinnerFade } from '@components/ui/loaders';

const DEFAULT_DAYS_SHOW = 7;

const SContainer = styled.section`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  width: 100%;
`;
const SUsernameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 20px;
  font-weight: 200;
  padding-bottom: 20px;
  height: 60px;
`;
const SLoaderContainer = styled.div`
  margin: auto;
  display: flex;
  height: 50px;
  justify-content: center;
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

  useErrorToast({
    error: !!isError,
    title: 'Error!',
    message:
      'Something went wrong getting this shared profile. Please try again later.',
  });

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
      <SContainer>
        <SUsernameContainer>
          We are unable to display the shared profile at this time. Please try
          again later...
        </SUsernameContainer>
      </SContainer>
    );
  }

  if (isLoading && !userData) {
    return (
      <SContainer>
        <SUsernameContainer>Loading user profile...</SUsernameContainer>
        <SLoaderContainer>
          <SpinnerFade background="background_primary" size={0} />
        </SLoaderContainer>
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
          name="image"
          property="og:image"
          content={`${process.env.VERCEL_DOMAIN || ''}/api/og?path=share`}
        />
        <meta property="og:title" content="My Shared Diary" />
        <meta
          property="og:url"
          content={`${process.env.VERCEL_DOMAIN || ''}/share`}
        />

        <meta content="summary" name="twitter:card" />
        <meta
          content={`${process.env.VERCEL_DOMAIN || ''}/api/og?path=share`}
          name="twitter:image"
        />
        <meta
          name="description"
          property="og:description"
          content={`I've shared my diary summary with you.`}
        />
        <meta property="twitter:title" content="My Shared Diary"></meta>
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
