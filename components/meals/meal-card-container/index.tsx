import Card from '@components/meals/meal-card';
import { ALL_MEAL_CARDS } from '@utils/constants';
import { FC } from 'react';
import styled from 'styled-components';

const SContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px 0;
  gap: 16px;
`;

const CardContainer: FC = () => {
  return (
    <SContainer>
      {ALL_MEAL_CARDS.map((meal) => (
        <Card key={meal.id} {...meal} />
      ))}
    </SContainer>
  );
};

export default CardContainer;
