import type { NextPage } from 'next';
import DateDisplay from '@components/date-display';
import CardContainer from '@components/meals/meal-card-container';
import WellnessContainer from '@components/wellness/wellness-container';
import styled from 'styled-components';

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

export default Home;
