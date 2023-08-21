import { TInputTypes } from '@components/login-form/types';
import {
  emailAddressValidators,
  nonEmptyInputValidators,
  passwordValidators,
  textAreaValidators,
  timeInputValidators,
  emojiValidators,
  maxLengthInputValidators,
} from '@utils/validation/validators';
import { TValidators } from '@utils/validation';
import { EAddMealOptions, TAddMealOptions } from '@utils/interfaces';

type TDynamicArgs<K> = { value: K; shouldValidate?: boolean };
type TStaticFields<T> = {
  id: T;
  validators: TValidators;
};

type TLoginFormValitators = {
  [key in TInputTypes]: (
    args: TDynamicArgs<string>,
  ) => TDynamicArgs<string> & TStaticFields<TInputTypes>;
};

export const loginFormValidators: TLoginFormValitators = {
  email: (args: TDynamicArgs<string>) => ({
    id: 'email',
    validators: emailAddressValidators,
    ...args,
  }),
  password: (args: TDynamicArgs<string>) => ({
    id: 'password',
    validators: passwordValidators,
    ...args,
  }),
  name: (args: TDynamicArgs<string>) => ({
    id: 'name',
    validators: nonEmptyInputValidators,
    ...args,
  }),
};

type TExerciseTypes = 'details' | 'time';
type TExerciseValidators = {
  [key in TExerciseTypes]: (
    args: TDynamicArgs<string>,
  ) => TDynamicArgs<string> & TStaticFields<TExerciseTypes>;
};

export const excerciseValidators: TExerciseValidators = {
  details: (args: TDynamicArgs<string>) => ({
    id: 'details',
    validators: textAreaValidators,
    ...args,
  }),
  time: (args: TDynamicArgs<string>) => ({
    id: 'time',
    validators: timeInputValidators,
    ...args,
  }),
};

type TAddMealValidatorCommon<T> = (
  args: TDynamicArgs<T>,
) => TDynamicArgs<T> & TStaticFields<TAddMealOptions>;

type TAddMealValidators = {
  [EAddMealOptions.EMOJI_PICKER]: TAddMealValidatorCommon<string>;
  [EAddMealOptions.QUANTITY]: TAddMealValidatorCommon<string>;
  [EAddMealOptions.FOOD]: TAddMealValidatorCommon<string>;
  [EAddMealOptions.DESCRIPTION]: TAddMealValidatorCommon<string>;
};

export const addMealOptionsValidators: TAddMealValidators = {
  emojiPicker: (args: TDynamicArgs<string>) => ({
    id: 'emojiPicker',
    validators: emojiValidators,
    ...args,
  }),
  quantity: (args: TDynamicArgs<string>) => ({
    id: 'quantity',
    validators: maxLengthInputValidators,
    ...args,
  }),
  food: (args: TDynamicArgs<string>) => ({
    id: 'food',
    validators: nonEmptyInputValidators,
    ...args,
  }),
  description: (args: TDynamicArgs<string>) => ({
    id: 'description',
    validators: textAreaValidators,
    ...args,
  }),
};
