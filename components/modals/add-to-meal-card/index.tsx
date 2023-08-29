import { ALL_MEAL_CARDS } from '@utils/app.constants';
import { ChangeEvent, FC, useReducer, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import InputContainer from '@components/ui/input-container';
import DropdownContainer from '@components/ui/dropdown-container';
import EmojiPicker, { TSelectedEmoji } from '@components/emoji-picker';
import { EAddMealOptions, IMealContent, TMealType } from '@utils/interfaces';
import {
  getThemeColoursFromMealId,
  getThemeVarColor,
} from '@utils/theme-utils';
import { ModalHeader } from '@components/modals/styled';
import { runValidations } from '@utils/validation';
import { addMealOptionsValidators } from '@utils/validation/validators/collections';
import {
  addToMealReducer,
  getIntialState,
} from '@components/modals/add-to-meal-card/reducer';
import {
  EAddToMealType,
  IModalAddMealProps,
  IRunFormValidations,
} from '@components/modals/add-to-meal-card/types';
import { trim } from '@utils/string-utils';
import { ModalFooter } from '@components/modals/styled/modal-footer';

const SContainer = styled.div`
  margin: auto;
  width: 600px;
  background-color: var(--bg-secondary);
`;
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
    addMealOptionsValidators['quantity']({
      value: values.quantity,
    }),
    addMealOptionsValidators['food']({
      value: values.food,
    }),
    addMealOptionsValidators['description']({
      value: values.description,
    }),
  ]);

const ModalAddToMealCard: FC<IModalAddMealProps> = ({
  mealId,
  content,
  onClose,
  onSubmit,
  onEditConfirm,
  onRemoveMeal,
}) => {
  const [state, dispatch] = useReducer(
    addToMealReducer,
    getIntialState({ mealId, content }),
  );

  const isEditing = !!content;
  const mealColour = getThemeColoursFromMealId(state.mealType);
  const themeColour = getThemeVarColor(mealColour);
  const mealTile =
    ALL_MEAL_CARDS.find((meal) => meal.id === state.mealType)?.title || '';

  const onSubmitHandler = useCallback(() => {
    const errors = runFormValidations({
      emojiPicker: state.emojiPicker,
      ...state.inputValues,
    });

    dispatch({ type: EAddToMealType.SUBMIT, payload: { errors } });

    if (!!Object.keys(errors).length) {
      return;
    }

    const mealContent: IMealContent = {
      id: isEditing ? content.id : Date.now().toString(),
      emoji: state.emojiPicker,
      quantity: trim(state.inputValues.quantity),
      food: trim(state.inputValues.food),
      description: trim(state.inputValues.description),
    };

    if (isEditing) {
      onEditConfirm(state.mealType, mealContent);
    } else {
      onSubmit(state.mealType, mealContent);
    }
  }, [
    content?.id,
    isEditing,
    state.emojiPicker,
    state.inputValues,
    state.mealType,
    onEditConfirm,
    onSubmit,
  ]);

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        onSubmitHandler();
      }
    };

    document.addEventListener('keydown', listener);

    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, [onSubmitHandler]);

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
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
    backgroundColour: themeColour,
    hideInitialBorder: true,
    borderColour: themeColour,
  };

  const modalTitle = isEditing ? `Edit Item` : `Add to ${mealTile}`;

  return (
    <SContainer>
      <ModalHeader
        title={modalTitle}
        mealColour={themeColour}
        onClose={onClose}
        onRemoveMeal={onRemoveMeal}
      />
      <SContentContainer>
        <EmojiPicker
          tabIndex={1}
          value={state.emojiPicker}
          borderColour={themeColour}
          onChange={updateSelecteedEmoji}
        />
        <InputContainer
          id={EAddMealOptions.QUANTITY}
          value={state.inputValues.quantity}
          isError={state.formErrors.quantity}
          tabIndex={3}
          inputWidth={350}
          title="Quantity"
          popup="Add any descriptive quantity for your food or drink"
          spellCheck
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
          popup="Input your food or drink *Required"
          required
          spellCheck
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
          backgroundColour={themeColour}
          title="Description"
          popup="Add some extra descriptions to your food or drink"
          inputType="textarea"
          spellCheck
          onChange={updateInputValues}
        />
        <DropdownContainer
          id={EAddMealOptions.MEAL_TYPE}
          value={state.mealType}
          tabIndex={6}
          inputWidth={180}
          backgroundColour={themeColour}
          options={ALL_MEAL_CARDS}
          title="Meal"
          popup="Change this meal to another meal"
          onChange={updateMealType}
        />
      </SContentContainer>
      <ModalFooter
        closeText="Cancel"
        submitText={isEditing ? 'Update' : 'Add'}
        mealColour={mealColour}
        onSubmit={onSubmitHandler}
        onClose={onClose}
      />
    </SContainer>
  );
};

export default ModalAddToMealCard;
