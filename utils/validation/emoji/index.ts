import { ERROR_EMOJI } from '@utils/validation/validation.constants';
import { TValidateProps } from '@utils/validation/validation.types';
import { validator } from '@utils/validation/emoji/validator';

/**
 * `true` if value either empty or legitimate emoji
 * @param props.id string
 * @param props.value string
 * @param props.errors TErrors
 * @returns TValidateProps
 */
export const validateEmoji = ({
  id,
  value,
  errors,
}: TValidateProps): TValidateProps => {
  const updatedErrors = { ...errors };

  if (!validator(value)) {
    updatedErrors[id] = ERROR_EMOJI;
  }

  return {
    id,
    value,
    errors: updatedErrors,
  };
};
