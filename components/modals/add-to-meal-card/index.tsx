import { APP_THEME_DEFAULT, ALL_MEAL_CARDS } from '@utils/constants';
import { FC, useState } from 'react';
import styled from 'styled-components';
import InputContainer from '@components/ui/input-container';
import DropdownContainer from '@components/ui/dropdown-container';
import EmojiPicker, { ISelectedEmoji } from '@components/emoji-picker';
import { IMealContent, TMealType } from '@utils/interfaces';
import { getMealThemeColour } from '@utils/theme-utils';
import { ModalHeader } from '@components/modals/styled';

const SContainer = styled.div``;
const SContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 20px;
`;

interface IModalProps {
  mealId: TMealType;
  content: IMealContent | null;
  onClose: () => void;
  onSubmit: (mealId: TMealType, values: IMealContent) => void;
  onEditConfirm: (
    updatedMealId: TMealType,
    updatedContent: IMealContent
  ) => void;
}

const ModalAddToMealCard: FC<IModalProps> = ({
  mealId,
  content,
  onClose,
  onSubmit,
  onEditConfirm,
}) => {
  const [selectedMealId, setSelectedMealId] = useState<TMealType>(mealId);
  const [selectedEmoji, setSelectedEmoji] = useState<ISelectedEmoji | null>(
    content?.emoji ?? null
  );
  const [servingSize, setServingSize] = useState(content?.serving ?? '');
  const [measurement, setMeasurement] = useState(content?.measurement ?? '');
  const [food, setFood] = useState(content?.food ?? '');
  const [description, setDescription] = useState(content?.description ?? '');

  const isEditing = !!content;
  const mealColour = getMealThemeColour(APP_THEME_DEFAULT, selectedMealId);
  const mealTile =
    ALL_MEAL_CARDS.find((meal) => meal.id === selectedMealId)?.title || '';

  const onSubmitHandler = () => {
    const mealContent: IMealContent = {
      id: isEditing ? content.id : Date.now(),
      emoji: selectedEmoji,
      serving: servingSize,
      measurement,
      food,
      description,
    };

    if (isEditing) {
      onEditConfirm(selectedMealId, mealContent);
    } else {
      onSubmit(selectedMealId, mealContent);
    }
  };
  const onSelectChangeHandler = (value: TMealType) => {
    setSelectedMealId(value);
  };

  const commonInputProps = {
    backgroundColour: mealColour,
    hideInitialBorder: true,
    borderColour: mealColour,
  };

  const modalTitle = isEditing ? `Edit Item` : `Add to ${mealTile}`;

  return (
    <SContainer>
      <ModalHeader
        title={modalTitle}
        mealColour={mealColour}
        onClose={onClose}
        onSubmit={onSubmitHandler}
      />
      <SContentContainer>
        <EmojiPicker
          tabIndex={1}
          value={selectedEmoji}
          borderColour={mealColour}
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
          required
          onChange={(newValue) => setFood(newValue)}
          {...commonInputProps}
        />
        <InputContainer
          id="description"
          title="Description"
          tabIndex={5}
          popup="Add some extra descriptions to your food"
          backgroundColour={mealColour}
          inputWidth={350}
          inputType="textarea"
          value={description}
          onChange={(newValue) => setDescription(newValue)}
        />
        <DropdownContainer
          id="meal"
          title="Meal"
          tabIndex={6}
          popup="Change meal to another"
          backgroundColour={mealColour}
          inputWidth={180}
          value={selectedMealId}
          options={ALL_MEAL_CARDS}
          onChange={onSelectChangeHandler}
        />
      </SContentContainer>
    </SContainer>
  );
};

export default ModalAddToMealCard;
