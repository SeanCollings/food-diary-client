import type { GetServerSideProps, NextPage } from 'next';
import DateDisplay from '@components/date-display';
import CardContainer from '@components/meals/meal-card-container';
import WellnessContainer from '@components/wellness/wellness-container';
import styled from 'styled-components';
import { getSession } from 'next-auth/react';

const SDiaryContainer = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Home: NextPage = () => {
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
