import {
  APP_THEME_DEFAULT,
  COLOURS,
  DEFAULT_MEAL_CARD_ARRAY,
} from '@utils/constants';
import { FC, useState } from 'react';
import styled from 'styled-components';
import { MdCheck, MdWest } from 'react-icons/md';
import InputContainer from '@components/ui/input-container';
import DropdownContainer from '@components/ui/dropdown-container';
import EmojiPicker, { ISelectedEmoji } from '@components/emoji-picker';
import { ICardProps, TMealType } from '@utils/interfaces';
import { getMealThemeColour } from '@utils/theme-utils';

interface ISHeader {
  backgroundColour: string;
}

const SContainer = styled.div``;
const SHeader = styled.div<ISHeader>`
  transition: 0.25s;
  padding: 10px 20px;
  color: ${COLOURS.white_off};
  font-size: 22px;
  font-weight: 200;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px 10px 0 0;
  background: ${({ backgroundColour }) => backgroundColour};
`;
const SIconClose = styled(MdWest)`
  cursor: pointer;
  :hover {
    transform: scale(1.1);
  }
`;
const SIconSubmit = styled(MdCheck)`
  cursor: pointer;
  :hover {
    transform: scale(1.1);
  }
`;
const SContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 20px;
`;

interface IModalProps {
  mealId: TMealType;
  primaryColour: string;
  onClose: () => void;
  onSubmit: (properties?: any) => void;
}

const ModalAddFood: FC<IModalProps> = ({ mealId, onClose, onSubmit }) => {
  const [selectedMeal, setSelectedMeal] = useState<ICardProps | null>(
    DEFAULT_MEAL_CARD_ARRAY.find((meal) => meal.id === mealId) || null
  );
  const [selectedEmoji, setSelectedEmoji] = useState<ISelectedEmoji | null>(
    null
  );
  const [servingSize, setServingSize] = useState('0.5');
  const [measurement, setMeasurement] = useState('plate');
  const [food, setFood] = useState('Asian styled salad');
  const [description, setDescription] = useState(
    'Stir fry veg, chicken strips, rice, \nAsian sesame \n \nstir-fry sauce'
  );

  const MealColour = getMealThemeColour(APP_THEME_DEFAULT, selectedMeal?.id);

  const onSubmitHandler = () => {
    onSubmit({
      emoji: selectedEmoji,
      serving: servingSize,
      measurement,
      food,
      description,
    });
  };

  const commonInputProps = {
    backgroundColour: MealColour,
    hideInitialBorder: true,
    borderColour: MealColour,
  };

  const onSelectChangeHandler = (value: any) => {
    console.log(value);
    const foundMeal =
      DEFAULT_MEAL_CARD_ARRAY.find((meal) => meal.id === value) || null;
    setSelectedMeal(foundMeal);
  };

  return (
    <SContainer>
      <SHeader backgroundColour={MealColour}>
        <SIconClose size={34} onClick={onClose} />
        Add Food
        <SIconSubmit size={34} onClick={onSubmitHandler} />
      </SHeader>
      <SContentContainer>
        <EmojiPicker
          tabIndex={1}
          borderColour={MealColour}
          onChange={(newValue) => setSelectedEmoji(newValue)}
        />
        <InputContainer
          id="serving_size"
          title="Serving size"
          popup="Select a serving size"
          tabIndex={2}
          inputWidth={180}
          value={servingSize}
          placeholder="-"
          onChange={(newValue) => setServingSize(newValue)}
          {...commonInputProps}
        />
        <InputContainer
          id="unit_of_measurement"
          title="Unit of measurement"
          tabIndex={3}
          inputWidth={180}
          popup="Select a unit of measurement"
          value={measurement}
          placeholder="-"
          onChange={(newValue) => setMeasurement(newValue)}
          {...commonInputProps}
        />
        <InputContainer
          id="food"
          title="Food"
          tabIndex={4}
          inputWidth={350}
          popup="Input your food/drink"
          value={food}
          placeholder="Add food"
          onChange={(newValue) => setFood(newValue)}
          {...commonInputProps}
        />
        <InputContainer
          id="description"
          title="Description"
          tabIndex={5}
          popup="Add some extra descriptions to your food"
          backgroundColour={MealColour}
          inputWidth={350}
          type="textarea"
          value={description}
          onChange={(newValue) => setDescription(newValue)}
        />
        <DropdownContainer
          id="meal"
          title="Meal"
          tabIndex={6}
          popup="Change meal to another"
          backgroundColour={MealColour}
          inputWidth={180}
          value={selectedMeal}
          options={DEFAULT_MEAL_CARD_ARRAY}
          onChange={onSelectChangeHandler}
        />
      </SContentContainer>
    </SContainer>
  );
};

export default ModalAddFood;
