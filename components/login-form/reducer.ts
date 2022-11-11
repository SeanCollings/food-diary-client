import {
  ELoginFormType,
  ILoginFormAction,
  ILoginFormState,
} from '@components/login-form/types';

export const INITIAL_STATE: ILoginFormState = {
  hasSubmitted: false,
  formType: 'login',
  formErrors: {},
  formValues: {
    email: '',
    password: '',
    name: '',
  },
  loginError: '',
};

export const loginFormReducer = (
  state: ILoginFormState,
  action: ILoginFormAction
): ILoginFormState => {
  switch (action.type) {
    case ELoginFormType.SELECT_LOGIN:
      return {
        ...state,
        formType: 'login',
        formErrors: {},
      };
    case ELoginFormType.SELECT_CREATE_ACCOUNT:
      return {
        ...state,
        formType: 'create',
        formErrors: {},
      };
    case ELoginFormType.SELECT_RESET_PASSWORD:
      return {
        ...state,
        formType: 'reset',
        formErrors: {},
      };
    case ELoginFormType.SUBMIT:
      return {
        ...state,
        hasSubmitted: true,
        formErrors: action.payload.errors,
      };
    case ELoginFormType.UPDATE_VALUES:
      return { ...state, formValues: action.payload.values };
    case ELoginFormType.UPDATE_ERRORS:
      return { ...state, formErrors: action.payload.errors };
    case ELoginFormType.LOGIN_ERROR:
      return { ...state, loginError: action.payload };
    default:
      return state;
  }
};
