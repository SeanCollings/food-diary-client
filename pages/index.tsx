import type { NextPage } from 'next';
import Header from '@components/header';
import DateDisplay from '@components/date-display';
import CardContainer from '@components/meals/meal-card-container';
import WellnessContainer from '@components/wellness/wellness-container';

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <DateDisplay />
      <WellnessContainer />
      <CardContainer />
    </>
  );
};

export default Home;
