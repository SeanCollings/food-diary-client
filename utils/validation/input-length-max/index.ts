import { ERROR_INPUT_LENGTH_MAX } from '@utils/validation/validation.constants';
import { TValidateProps } from '@utils/validation/validation.types';
import { validator } from '@utils/validation/input-length-max/validator';

/**
 * `true` if input is less or equal to maxLength
 * @param maxLength number
 * @param props.id string
 * @param props.value number | string
 * @param props.errors TErrors
 * @returns TValidateProps
 */
export const validateLengthMax =
  (maxLength: number) =>
  ({ id, value, errors }: TValidateProps): TValidateProps => {
    const updatedErrors = { ...errors };

    if (!validator(value, maxLength)) {
      updatedErrors[id] = `${ERROR_INPUT_LENGTH_MAX} ${maxLength}`;
    }

    return {
      id,
      value,
      errors: updatedErrors,
    };
  };
