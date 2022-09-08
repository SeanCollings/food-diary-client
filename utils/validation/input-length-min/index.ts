import { ERROR_INPUT_LEGTH_MIN } from '@utils/validation/validation.constants';
import { TValidateProps } from '@utils/validation/validation.types';
import { validator } from '@utils/validation/input-length-min/validator';

/**
 * `true` if value is greater than or equal to minLength
 * @param minLength number
 * @param props.id string
 * @param props.value number | string
 * @param props.errors TErrors
 * @returns TValidateProps
 */
export const validateLengthMin =
  (minLength: number) =>
  ({ id, value, errors }: TValidateProps): TValidateProps => {
    const updatedErrors = { ...errors };

    if (!value || !validator(value, minLength)) {
      updatedErrors[id] = `${ERROR_INPUT_LEGTH_MIN} ${minLength}`;
    }

    return {
      id,
      value,
      errors: updatedErrors,
    };
  };
