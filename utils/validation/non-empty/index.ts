import { ERROR_EMPTY_INPUT } from '@utils/validation/validation.constants';
import { TValidateProps } from '@utils/validation/validation.types';
import { validator } from '@utils/validation/non-empty/validator';

/**
 * `true` if input is not empty
 * @param props.id string
 * @param props.value number | string
 * @param props.errors TErrors
 * @returns TValidateProps
 */
export const validateNonEmpty = ({
  id,
  value,
  errors,
}: TValidateProps): TValidateProps => {
  const updatedErrors = { ...errors };

  if (!value || !validator(value)) {
    updatedErrors[id] = ERROR_EMPTY_INPUT;
  }

  return {
    id,
    value,
    errors: updatedErrors,
  };
};
