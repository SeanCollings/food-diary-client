import type { GetServerSideProps, NextPage } from 'next';
import DateDisplay from '@components/date-display';
import CardContainer from '@components/meals/meal-card-container';
import WellnessContainer from '@components/wellness/wellness-container';
import styled from 'styled-components';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRequestDiaryEntry } from '@hooks/request/use-request-diary-entry';
import { IUserModel } from '@store/user-context';

const SDiaryContainer = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

// https://swr.vercel.app/

interface IDiaryPageProps {
  session: { user: IUserModel | null };
}

const Home: NextPage<IDiaryPageProps> = ({ session }) => {
  const [mounted, setMounted] = useState(false);
  const { data, isError, isLoading } = useRequestDiaryEntry(
    !!session && mounted
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <SDiaryContainer>
      <DateDisplay />
      <WellnessContainer />
      <CardContainer />
    </SDiaryContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  return {
    props: { session },
  };
};

export default Home;
