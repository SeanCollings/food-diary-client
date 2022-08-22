import { APP_THEME_DEFAULT, COLOURS, ALL_MEAL_CARDS } from '@utils/constants';
import { FC, useState } from 'react';
import styled from 'styled-components';
import { MdCheck, MdWest } from 'react-icons/md';
import InputContainer from '@components/ui/input-container';
import DropdownContainer from '@components/ui/dropdown-container';
import EmojiPicker, { ISelectedEmoji } from '@components/emoji-picker';
import { IMealContent, TMealType } from '@utils/interfaces';
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
  onSubmit: (mealId: TMealType, values: IMealContent) => void;
}

const ModalAddFood: FC<IModalProps> = ({ mealId, onClose, onSubmit }) => {
  const [selectedMealId, setSelectedMealId] = useState<TMealType>(mealId);
  const [selectedEmoji, setSelectedEmoji] = useState<ISelectedEmoji | null>(
    null
  );
  const [servingSize, setServingSize] = useState('');
  const [measurement, setMeasurement] = useState('');
  const [food, setFood] = useState('');
  const [description, setDescription] = useState('');

  const MealColour = getMealThemeColour(APP_THEME_DEFAULT, selectedMealId);

  const onSubmitHandler = () => {
    onSubmit(selectedMealId, {
      emoji: selectedEmoji,
      serving: servingSize,
      measurement,
      food,
      description,
    });
  };
  const onSelectChangeHandler = (value: TMealType) => {
    setSelectedMealId(value);
  };

  const commonInputProps = {
    backgroundColour: MealColour,
    hideInitialBorder: true,
    borderColour: MealColour,
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
          value={selectedMealId}
          options={ALL_MEAL_CARDS}
          onChange={onSelectChangeHandler}
        />
      </SContentContainer>
    </SContainer>
  );
};

export default ModalAddFood;
