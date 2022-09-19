import { TErrors } from '@utils/validation/validation.types';

export enum EInputTypes {
  EMAIL_ADDRESS = 'emailAddress',
  PASSWORD = 'password',
  NAME = 'name',
}

export type TInputTypes = `${EInputTypes}`;

export type TFormValues = {
  [key in TInputTypes]: string;
};
export type TFormErrors = {
  [key in TInputTypes]?: string;
};

export interface ILoginFormState {
  hasSubmitted: boolean;
  loginSelected: boolean;
  isResetPassword: boolean;
  formErrors: TFormErrors;
  formValues: TFormValues;
}

export enum ELoginFormType {
  SELECT_LOGIN = 'select_login',
  SELECT_CREATE_ACCOUNT = 'select_create_account',
  SELECT_RESET_PASSWORD = 'select_reset_password',
  SUBMIT = 'submit',
  UPDATE_VALUES = 'update_values',
  UPDATE_ERRORS = 'update_errors',
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
    };
