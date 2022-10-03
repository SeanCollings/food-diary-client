import {
  ThemeBackgroundSecondary,
  ThemeBorderBottom,
} from '@components/ui/style-themed';
import ExcerciseCard from '@components/wellness/exercise-card';
import WellnessCard from '@components/wellness/wellness-card';
import {
  APP_THEME_DEFAULT,
  MEDIA_DESKTOP,
  MEDIA_MOBILE,
} from '@utils/constants';
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
  ${ThemeBorderBottom}
  ${ThemeBackgroundSecondary}
`;
const SExcerciseContainer = styled.div`
  border-radius: 6px;
  background: white;
  flex-basis: 40%;
  ${ThemeBorderBottom}
  ${ThemeBackgroundSecondary}
`;

const WellnessContainer: FC = () => {
  return (
    <SContainer>
      <SDrinkContainer>
        <WellnessCard
          id="water"
          title="water"
          imageSrc={'/static/images/water_bottle.webp'}
          color={APP_THEME_DEFAULT.quaternary}
        />
        <WellnessCard
          id="tea_coffee"
          title="tea/coffee"
          imageSrc={'/static/images/coffee.webp'}
          color={APP_THEME_DEFAULT.quaternary}
        />
        <WellnessCard
          id="alcohol"
          title="alcohol"
          imageSrc={'/static/images/wine.webp'}
          color={APP_THEME_DEFAULT.quaternary}
        />
      </SDrinkContainer>
      <SExcerciseContainer>
        <ExcerciseCard
          id="alcohol_counter"
          title="excercise"
          imageSrc={'/static/images/exercise.webp'}
        />
      </SExcerciseContainer>
    </SContainer>
  );
};

export default WellnessContainer;
