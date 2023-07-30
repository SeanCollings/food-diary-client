import { ThemeBorderBottom } from '@components/ui/style-themed';
import ExcerciseCard from '@components/wellness/exercise-card';
import WellnessCard from '@components/wellness/wellness-card';
import {
  APP_THEME_DEFAULT,
  MEDIA_DESKTOP,
  MEDIA_MOBILE,
} from '@utils/app.constants';
import { FC } from 'react';
import styled from 'styled-components';

const SContainer = styled.section`
  margin-top: 20px;
  display: flex;
  gap: 20px;
  flex-direction: column;

  ${MEDIA_DESKTOP} {
    flex-direction: row;
  }
  ${MEDIA_MOBILE} {
    margin-top: 0px;
  }
`;
const SDrinkContainer = styled.div`
  border-radius: 6px;
  background: white;
  display: flex;
  flex-basis: 60%;
  justify-content: space-evenly;
  flex-wrap: wrap;
  background-color: var(--bg-secondary);
  ${ThemeBorderBottom}
`;
const SExcerciseContainer = styled.div`
  border-radius: 6px;
  background: white;
  flex-basis: 40%;
  background-color: var(--bg-secondary);
  ${ThemeBorderBottom}
`;

const WellnessContainer: FC = () => {
  return (
    <SContainer>
      <SDrinkContainer>
        <WellnessCard
          id="water"
          title="Water"
          imageSrc={'/static/images/water_bottle.webp'}
          color={APP_THEME_DEFAULT.quaternary}
          width={69}
          height={193}
        />
        <WellnessCard
          id="tea_coffee"
          title="Tea / coffee"
          imageSrc={'/static/images/coffee.webp'}
          color={APP_THEME_DEFAULT.quaternary}
          width={384}
          height={348}
        />
        <WellnessCard
          id="alcohol"
          title="Alcohol"
          imageSrc={'/static/images/wine.webp'}
          color={APP_THEME_DEFAULT.quaternary}
          width={115}
          height={298}
        />
      </SDrinkContainer>
      <SExcerciseContainer>
        <ExcerciseCard
          id="alcohol_counter"
          title="Excercise"
          imageSrc={'/static/images/exercise.webp'}
        />
      </SExcerciseContainer>
    </SContainer>
  );
};

export default WellnessContainer;
