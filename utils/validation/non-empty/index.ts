import { ERROR_EMPTY_INPUT } from '@utils/validation/validation.constants';
import { TValidateProps } from '@utils/validation/validation.types';
import { validator } from '@utils/validation/non-empty/validator';

/**
 * `true` if input is not empty
 * @param props.id string
 * @param props.input number | string
 * @param props.errors TErrors
 * @returns TValidateProps
 */
export const validateNonEmpty = ({
  id,
  input,
  errors,
}: TValidateProps): TValidateProps => {
  const updatedErrors = { ...errors };

  if (!input || !validator(input)) {
    updatedErrors[id] = ERROR_EMPTY_INPUT;
  }

  return {
    id,
    input,
    errors: updatedErrors,
  };
};
