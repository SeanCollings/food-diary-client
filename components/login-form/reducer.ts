import {
  ELoginFormType,
  ILoginFormAction,
  ILoginFormState,
} from '@components/login-form/types';

export const INITIAL_STATE: ILoginFormState = {
  hasSubmitted: false,
  loginSelected: true,
  isResetPassword: false,
  formErrors: {},
  formValues: {
    emailAddress: '',
    password: '',
    name: '',
  },
};

export const loginFormReducer = (
  state: ILoginFormState,
  action: ILoginFormAction
): ILoginFormState => {
  switch (action.type) {
    case ELoginFormType.SELECT_LOGIN:
      return {
        ...state,
        isResetPassword: false,
        loginSelected: true,
        formErrors: {},
      };
    case ELoginFormType.SELECT_CREATE_ACCOUNT:
      return {
        ...state,
        loginSelected: false,
        formErrors: {},
      };
    case ELoginFormType.SELECT_RESET_PASSWORD:
      return {
        ...state,
        isResetPassword: true,
        loginSelected: false,
        formErrors: {},
      };
    case ELoginFormType.SUBMIT:
      return {
        ...state,
        hasSubmitted: true,
        formErrors: action.payload.errors,
      };
    case ELoginFormType.UPDATE_VALUES:
      return { ...state, formValues: action.payload?.values };
    case ELoginFormType.UPDATE_ERRORS:
      return { ...state, formErrors: action.payload?.errors };
    default:
      return state;
  }
};
