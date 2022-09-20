import { APP_THEME_DEFAULT, ALL_MEAL_CARDS } from '@utils/constants';
import { ChangeEvent, FC, useReducer } from 'react';
import styled from 'styled-components';
import InputContainer from '@components/ui/input-container';
import DropdownContainer from '@components/ui/dropdown-container';
import EmojiPicker, { TSelectedEmoji } from '@components/emoji-picker';
import { EAddMealOptions, IMealContent, TMealType } from '@utils/interfaces';
import { getMealThemeColour } from '@utils/theme-utils';
import { ModalHeader } from '@components/modals/styled';
import { runValidations } from '@utils/validation';
import { addMealOptionsValidators } from '@utils/validation/validators/collections';
import {
  addToMealReducer,
  getIntialState,
} from '@components/modals/add-to-meal-card/reducer';
import {
  EAddToMealType,
  IModalProps,
  IRunFormValidations,
} from '@components/modals/add-to-meal-card/types';

const SContainer = styled.div``;
const SContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 20px;
`;

const runFormValidations = (values: IRunFormValidations) =>
  runValidations([
    addMealOptionsValidators['emojiPicker']({
      value: values.emojiPicker?.nativeSkin || '',
    }),
    addMealOptionsValidators['servingSize']({
      value: values.servingSize,
    }),
    addMealOptionsValidators['unitOfMeasurement']({
      value: values.unitOfMeasurement,
    }),
    addMealOptionsValidators['food']({
      value: values.food,
    }),
    addMealOptionsValidators['description']({
      value: values.description,
    }),
  ]);

const ModalAddToMealCard: FC<IModalProps> = ({
  mealId,
  content,
  onClose,
  onSubmit,
  onEditConfirm,
}) => {
  const [state, dispatch] = useReducer(
    addToMealReducer,
    getIntialState({ mealId, content })
  );

  const isEditing = !!content;
  const mealColour = getMealThemeColour(APP_THEME_DEFAULT, state.mealType);
  const mealTile =
    ALL_MEAL_CARDS.find((meal) => meal.id === state.mealType)?.title || '';

  const onSubmitHandler = () => {
    const errors = runFormValidations({
      emojiPicker: state.emojiPicker,
      ...state.inputValues,
    });

    dispatch({ type: EAddToMealType.SUBMIT, payload: { errors } });

    if (!!Object.keys(errors).length) {
      return;
    }

    const mealContent: IMealContent = {
      id: isEditing ? content.id : Date.now(),
      emoji: state.emojiPicker,
      serving: state.inputValues.servingSize,
      measurement: state.inputValues.unitOfMeasurement,
      food: state.inputValues.food,
      description: state.inputValues.description,
    };

    if (isEditing) {
      onEditConfirm(state.mealType, mealContent);
    } else {
      onSubmit(state.mealType, mealContent);
    }
  };

  const updateMealType = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: EAddToMealType.UPDATE_MEAL_TYPE,
      payload: event.target.value as TMealType,
    });
  };
  const updateSelecteedEmoji = (emoji: TSelectedEmoji) => {
    dispatch({
      type: EAddToMealType.UPDATE_EMOJI,
      payload: emoji,
    });
  };
  const updateInputValues = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch({
      type: EAddToMealType.UPDATE_INPUT_VALUES,
      payload: { [event.target.name]: event.target.value },
    });
  };

  const onBlurHandler = () => {
    if (!state.hasSubmitted) {
      return;
    }

    const errors = runFormValidations({
      emojiPicker: state.emojiPicker,
      ...state.inputValues,
    });

    dispatch({
      type: EAddToMealType.UPDATE_ERRORS,
      payload: { errors },
    });
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
          value={state.emojiPicker}
          borderColour={mealColour}
          onChange={updateSelecteedEmoji}
        />
        <InputContainer
          id={EAddMealOptions.SERVING_SIZE}
          value={state.inputValues.servingSize}
          isError={state.formErrors.servingSize}
          tabIndex={2}
          inputWidth={180}
          title="Serving size"
          popup="Select a serving size"
          onChange={updateInputValues}
          {...commonInputProps}
        />
        <InputContainer
          id={EAddMealOptions.UNIT_OF_MEASUREMENT}
          value={state.inputValues.unitOfMeasurement}
          isError={state.formErrors.unitOfMeasurement}
          tabIndex={3}
          inputWidth={180}
          title="Unit of measurement"
          popup="Select a unit of measurement"
          onChange={updateInputValues}
          {...commonInputProps}
        />
        <InputContainer
          id={EAddMealOptions.FOOD}
          value={state.inputValues.food}
          isError={state.formErrors.food}
          tabIndex={4}
          inputWidth={350}
          title="Food"
          popup="Input your food/drink"
          required
          onBlur={onBlurHandler}
          onChange={updateInputValues}
          {...commonInputProps}
        />
        <InputContainer
          id={EAddMealOptions.DESCRIPTION}
          value={state.inputValues.description}
          isError={state.formErrors.description}
          tabIndex={5}
          inputWidth={350}
          backgroundColour={mealColour}
          title="Description"
          popup="Add some extra descriptions to your food"
          inputType="textarea"
          onChange={updateInputValues}
        />
        <DropdownContainer
          id={EAddMealOptions.MEAL_TYPE}
          value={state.mealType}
          tabIndex={6}
          inputWidth={180}
          backgroundColour={mealColour}
          options={ALL_MEAL_CARDS}
          title="Meal"
          popup="Change meal to another"
          onChange={updateMealType}
        />
      </SContentContainer>
    </SContainer>
  );
};

export default ModalAddToMealCard;
