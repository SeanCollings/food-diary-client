import { TValidators } from '@utils/validation';
import { validateEmailAddress } from '@utils/validation/email-address';
import { validateNonEmpty } from '@utils/validation/non-empty';
import { validateLengthMin } from '@utils/validation/input-length-min';
import { validateLengthMax } from '@utils/validation/input-length-max';
import {
  EMAIL_MIN_LENGTH,
  INPUT_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  TEXTAREA_MAX_LENGTH,
} from '@utils/validation/validation.constants';
import { validateTimeInput } from '@utils/validation/time-input';
import { validateEmoji } from '@utils/validation/emoji';

export const emailAddressValidators: TValidators = [
  validateNonEmpty,
  validateEmailAddress,
  validateLengthMin(EMAIL_MIN_LENGTH),
  validateLengthMax(INPUT_MAX_LENGTH),
];

export const passwordValidators: TValidators = [
  validateLengthMin(PASSWORD_MIN_LENGTH),
  validateLengthMax(INPUT_MAX_LENGTH),
];

export const nonEmptyInputValidators: TValidators = [
  validateNonEmpty,
  validateLengthMax(INPUT_MAX_LENGTH),
];

export const maxLengthInputValidators: TValidators = [
  validateLengthMax(INPUT_MAX_LENGTH),
];

export const notEmptyValidator: TValidators = [validateNonEmpty];

export const textAreaValidators: TValidators = [
  validateLengthMax(TEXTAREA_MAX_LENGTH),
];

export const timeInputValidators: TValidators = [validateTimeInput];

export const emojiValidators: TValidators = [validateEmoji];
