import { ERROR_EMAIL } from '@utils/validation/validation.constants';
import { TValidateProps } from '@utils/validation/validation.types';
import { validator } from '@utils/validation/email-address/validator';

/**
 * `true` if input is correct email format
 * @param props.id string
 * @param props.value number | string
 * @param props.errors TErrors
 * @returns TValidateProps
 */
export const validateEmailAddress = (props: TValidateProps): TValidateProps => {
  const { id, value, errors } = props;
  const updatedErrors = { ...errors };

  if (!value || !validator(value)) {
    updatedErrors[id] = ERROR_EMAIL;
  }

  return {
    id,
    value,
    errors: updatedErrors,
  };
};
