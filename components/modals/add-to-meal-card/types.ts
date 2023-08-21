import { TSelectedEmoji } from '@components/emoji-picker';
import {
  EAddMealOptions,
  IMealContent,
  TAddMealOptions,
  TMealType,
} from '@utils/interfaces';
import { TErrors } from '@utils/validation/validation.types';

export interface IModalAddMealProps {
  mealId: TMealType;
  content: IMealContent | null;
  onClose: () => void;
  onSubmit: (mealId: TMealType, values: IMealContent) => void;
  onEditConfirm: (
    updatedMealId: TMealType,
    updatedContent: IMealContent,
  ) => void;
}

export type TInputValues = {
  [key in Exclude<
    EAddMealOptions,
    EAddMealOptions.MEAL_TYPE | EAddMealOptions.EMOJI_PICKER
  >]: string;
};
export type TFormErrors = {
  [key in TAddMealOptions]?: string;
};

export interface IAddToMealState {
  hasSubmitted: boolean;
  [EAddMealOptions.MEAL_TYPE]: TMealType;
  [EAddMealOptions.EMOJI_PICKER]: TSelectedEmoji;
  inputValues: TInputValues;
  formErrors: TFormErrors;
}

export interface IRunFormValidations {
  emojiPicker: TSelectedEmoji;
  quantity: string;
  food: string;
  description: string;
}

export enum EAddToMealType {
  UPDATE_INPUT_VALUES = 'update_input_values',
  UPDATE_EMOJI = 'update_emoji',
  UPDATE_MEAL_TYPE = 'update_meal_Type',
  UPDATE_ERRORS = 'update_errors',
  SUBMIT = 'submit',
}

export type IAddToMealAction =
  | {
      type: EAddToMealType.UPDATE_INPUT_VALUES;
      payload: Partial<TInputValues>;
    }
  | {
      type: EAddToMealType.UPDATE_EMOJI;
      payload: TSelectedEmoji;
    }
  | {
      type: EAddToMealType.UPDATE_MEAL_TYPE;
      payload: TMealType;
    }
  | {
      type: EAddToMealType.UPDATE_ERRORS;
      payload: { errors: TErrors };
    }
  | {
      type: EAddToMealType.SUBMIT;
      payload: { errors: TErrors };
    };
