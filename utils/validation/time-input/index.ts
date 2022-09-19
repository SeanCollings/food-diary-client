import { ERROR_TIME_INPUT } from '@utils/validation/validation.constants';
import { TValidateProps } from '@utils/validation/validation.types';
import { validator } from '@utils/validation/time-input/validator';

/**
 * `true` if value is in the correct time format of `hh:mm`
 * @param props.id string
 * @param props.value string
 * @param props.errors TErrors
 * @returns TValidateProps
 */
export const validateTimeInput = ({
  id,
  value,
  errors,
}: TValidateProps): TValidateProps => {
  const updatedErrors = { ...errors };

  if (!validator(value)) {
    updatedErrors[id] = ERROR_TIME_INPUT;
  }

  return {
    id,
    value,
    errors: updatedErrors,
  };
};
