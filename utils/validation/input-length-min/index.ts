import { ERROR_INPUT_LEGTH_MIN } from '@utils/validation/validation.constants';
import { TValidateProps } from '@utils/validation/validation.types';
import { validator } from '@utils/validation/input-length-min/validator';

/**
 * `true` if input is greater than or equal to minLength
 * @param minLength number
 * @param props.id string
 * @param props.input number | string
 * @param props.errors TErrors
 * @returns TValidateProps
 */
export const validateLengthMin =
  (minLength: number) =>
  ({ id, input, errors }: TValidateProps): TValidateProps => {
    const updatedErrors = { ...errors };

    if (!input || !validator(input, minLength)) {
      updatedErrors[id] = `${ERROR_INPUT_LEGTH_MIN} ${minLength}`;
    }

    return {
      id,
      input,
      errors: updatedErrors,
    };
  };
