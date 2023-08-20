import { IMealContent, TMealType } from '@utils/interfaces';
import {
  EAddToMealType,
  IAddToMealAction,
  IAddToMealState,
} from '@components/modals/add-to-meal-card/types';

export const getIntialState = ({
  mealId,
  content,
}: {
  mealId: TMealType;
  content: IMealContent | null;
}): IAddToMealState => {
  return {
    hasSubmitted: false,
    inputValues: {
      servingSize: content?.serving ?? '',
      quantity: content?.quantity ?? '',
      food: content?.food ?? '',
      description: content?.description ?? '',
    },
    emojiPicker: content?.emoji ?? null,
    mealType: mealId,
    formErrors: {},
  };
};

export const addToMealReducer = (
  state: IAddToMealState,
  action: IAddToMealAction,
): IAddToMealState => {
  switch (action.type) {
    case EAddToMealType.UPDATE_INPUT_VALUES:
      return {
        ...state,
        inputValues: { ...state.inputValues, ...action.payload },
      };
    case EAddToMealType.UPDATE_EMOJI:
      return {
        ...state,
        emojiPicker: action.payload,
      };
    case EAddToMealType.UPDATE_MEAL_TYPE:
      return {
        ...state,
        mealType: action.payload,
      };
    case EAddToMealType.SUBMIT:
      return {
        ...state,
        hasSubmitted: true,
        formErrors: action.payload.errors,
      };
    case EAddToMealType.UPDATE_ERRORS:
      return { ...state, formErrors: action.payload.errors };
    default:
      return state;
  }
};
