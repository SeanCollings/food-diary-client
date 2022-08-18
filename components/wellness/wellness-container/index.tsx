import ExcerciseCard from '@components/wellness/exercise-card';
import WellnessCard from '@components/wellness/wellness-card';
import { COLOURS, MEDIA_DESKTOP, MEDIA_MOBILE } from '@utils/constants';
import { FC } from 'react';
import styled from 'styled-components';

const SContainer = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 20px;
  flex-direction: column;

  ${MEDIA_DESKTOP} {
    flex-direction: row;
  }
`;
const SDrinkContainer = styled.div`
  border-radius: 20px;
  background: white;
  display: flex;
  flex-basis: 60%;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;
const SExcerciseContainer = styled.div`
  border-radius: 20px;
  background: white;
  flex-basis: 40%;
`;

const WellnessContainer: FC = () => {
  return (
    <SContainer>
      <SDrinkContainer>
        <WellnessCard
          id="water_counter"
          title="cups of water"
          imageSrc={'/static/images/water_bottle.png'}
          color={COLOURS.blue}
        />
        <WellnessCard
          id="tea_coffee_counter"
          title="cups of tea/coffee"
          imageSrc={'/static/images/coffee.png'}
          color={COLOURS.gray_dark}
        />
        <WellnessCard
          id="alcohol_counter"
          title="alcohol servings"
          imageSrc={'/static/images/wine.png'}
          color={COLOURS.pink}
        />
      </SDrinkContainer>
      <SExcerciseContainer>
        <ExcerciseCard
          id="alcohol_counter"
          title="excercise"
          imageSrc={'/static/images/exercise.png'}
        />
      </SExcerciseContainer>
    </SContainer>
  );
};

export default WellnessContainer;
