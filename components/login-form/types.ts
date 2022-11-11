import { TErrors } from '@utils/validation/validation.types';

export enum EInputTypes {
  EMAIL_ADDRESS = 'email',
  PASSWORD = 'password',
  NAME = 'name',
}
export type TInputTypes = `${EInputTypes}`;

export type TFormType = 'login' | 'create' | 'reset';

export type TFormValues = {
  [key in TInputTypes]: string;
};
export type TFormErrors = {
  [key in TInputTypes]?: string;
};

export interface ILoginFormState {
  hasSubmitted: boolean;
  formType: TFormType;
  formErrors: TFormErrors;
  formValues: TFormValues;
  loginError: string;
}

export enum ELoginFormType {
  SELECT_LOGIN = 'select_login',
  SELECT_CREATE_ACCOUNT = 'select_create_account',
  SELECT_RESET_PASSWORD = 'select_reset_password',
  SUBMIT = 'submit',
  UPDATE_VALUES = 'update_values',
  UPDATE_ERRORS = 'update_errors',
  LOGIN_ERROR = 'login_error',
}

export type ILoginFormAction =
  | {
      type: ELoginFormType.SELECT_LOGIN;
    }
  | {
      type: ELoginFormType.SELECT_CREATE_ACCOUNT;
    }
  | {
      type: ELoginFormType.SELECT_RESET_PASSWORD;
    }
  | {
      type: ELoginFormType.SUBMIT;
      payload: { errors: TErrors };
    }
  | {
      type: ELoginFormType.UPDATE_VALUES;
      payload: { values: TFormValues };
    }
  | {
      type: ELoginFormType.UPDATE_ERRORS;
      payload: { errors: TErrors };
    }
  | {
      type: ELoginFormType.LOGIN_ERROR;
      payload: string;
    };
