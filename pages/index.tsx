import type { NextPage } from 'next';
import DateDisplay from '@components/date-display';
import CardContainer from '@components/meals/meal-card-container';
import WellnessContainer from '@components/wellness/wellness-container';

const Home: NextPage = () => {
  return (
    <>
      <DateDisplay />
      <WellnessContainer />
      <CardContainer />
    </>
  );
};

export default Home;
