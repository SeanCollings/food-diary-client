import Card, { IContent } from '@components/meals/meal-card';
import { DEFAULT_MEAL_CARD_ARRAY } from '@utils/constants';
import { EMealType } from '@utils/interfaces';
import { FC } from 'react';
import styled from 'styled-components';

const SContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px 0;
  gap: 20px;
`;

interface IData {
  [key: string]: {
    mealId: number;
    contents: IContent[];
  };
}

const TEMP_DAY_DATA: IData = {
  [EMealType.BREAKFAST]: {
    mealId: 1,
    contents: [
      {
        emoji: '🥣',
        serving: '½',
        measurement: 'cup',
        food: 'Simple Truth muesli',
        description: 'With chocolate and mini marshmellows',
      },
      {
        emoji: '🥛',
        serving: '1',
        measurement: 'serving',
        food: 'milk for cereal',
      },
      {
        emoji: '☕️',
        serving: '1',
        measurement: 'serving',
        food: 'milk with espresso coffee',
      },
      { emoji: '🥕', serving: '1', food: 'carrot' },
    ],
  },
  [EMealType.SNACK_1]: {
    mealId: 2,
    contents: [{ food: 'none' }],
  },
  [EMealType.LUNCH]: {
    mealId: 3,
    contents: [
      {
        emoji: '🥣',
        serving: '½',
        measurement: 'cup',
        food: 'Simple Truth muesli',
        description: 'With chocolate and mini marshmellows',
      },
      {
        emoji: '🥛',
        serving: '1',
        measurement: 'serving',
        food: 'milk for cereal',
      },
      {
        emoji: '🥗',
        serving: '0.5',
        measurement: 'plate',
        food: 'Asian styled salad',
        description:
          'Stir fry veg, chicken strips, rice, Asian sesame stir-fry sauce',
      },
    ],
  },
  [EMealType.SNACK_2]: {
    mealId: 4,
    contents: [{ emoji: '🍌', serving: '1', food: 'banana' }],
  },
  [EMealType.DINNER]: {
    mealId: 5,
    contents: [
      {
        serving: '1',
        measurement: 'serving',
        food: 'milk with espresso coffee',
      },
      { emoji: '🍌', serving: '1', food: 'banana' },
      { emoji: '🥕', serving: '1', food: 'carrot' },

      { emoji: '🥓', serving: '3', food: 'streaky bacon' },
      { emoji: '🍣', serving: '1', food: 'sushi platter' },
      { emoji: '🍦', food: 'ice cream - dessert' },
      { emoji: '🍷', serving: '3', food: 'glasses wine' },
      { emoji: '🍇', serving: '14', food: 'grapes' },
      { emoji: '🥑', serving: '1', food: 'avocado' },
    ],
  },
};

const CardContainer: FC = () => {
  return (
    <SContainer>
      {DEFAULT_MEAL_CARD_ARRAY.map((meal) => (
        <Card
          key={meal.id}
          {...meal}
          contents={TEMP_DAY_DATA[meal.id]?.contents || []}
        />
      ))}
    </SContainer>
  );
};

export default CardContainer;
