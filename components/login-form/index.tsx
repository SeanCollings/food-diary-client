import FormInput from '@components/ui/input/form-input';
import { APP_THEME_DEFAULT, COLOURS, MEDIA_MOBILE } from '@utils/constants';
import { runValidations } from '@utils/validation';
import { FC, MouseEvent, useCallback, useReducer } from 'react';
import styled from 'styled-components';
import { PASSWORD_MIN_LENGTH } from '@utils/validation/validation.constants';
import {
  INITIAL_STATE,
  loginFormReducer,
} from '@components/login-form/reducer';
import {
  ELoginFormType,
  TFormValues,
  TInputTypes,
} from '@components/login-form/types';
import { useMemoizeFunction } from '@hooks/use-memoize-function';
import { loginFormValidators } from '@utils/validation/validators/collections';

const SContainer = styled.form`
  background: ${COLOURS.white};
  max-width: 400px;
  width: 100%;
  border-radius: 20px;
  min-height: 500px;
  padding: 40px 50px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 24px;

  ${MEDIA_MOBILE} {
    padding: 30px 20px;
  }
`;
const SHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const SHeader = styled.div`
  font-size: 25px;
`;
const SSubHeader = styled.div`
  font-size: 17px;
  font-weight: 200;
  opacity: 0.8;
`;
const SChangeButton = styled.button`
  font-size: 17px;
  font-weight: 200;
  background: transparent;
  border: transparent;
  cursor: pointer;
  color: ${APP_THEME_DEFAULT.primary};
`;
const SContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const SInputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
const SLoginButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const SLoginButton = styled.button`
  background: ${APP_THEME_DEFAULT.primary};
  border: transparent;
  font-size: 24px;
  color: ${COLOURS.white};
  padding: 10px;
  width: 150px;
  border-radius: 8px;
  cursor: pointer;

  :hover {
    width: 152px;
  }
  :active {
    opacity: 0.7;
    width: 152px;
  }
`;

const getFormText = (isLogin: boolean, isReset: boolean) => {
  if (isLogin) {
    return {
      headerText: 'Login now',
      subHeaderText: 'Are you new?',
      typeChangeText: 'Create account.',
      loginButtonText: 'Login',
    };
  }

  if (isReset) {
    return {
      headerText: 'Reset password',
      subHeaderText: 'Remember password?',
      typeChangeText: 'Login instead.',
      loginButtonText: 'Reset',
    };
  }

  return {
    headerText: 'Create account',
    subHeaderText: 'Been here before?',
    typeChangeText: 'Login instead.',
    loginButtonText: 'Create',
  };
};

interface IInteractiveSubHeaderProps {
  subHeaderText: string;
  buttonText?: string;
  onClick?: () => void;
}

const InteractiveSubHeader: FC<IInteractiveSubHeaderProps> = ({
  subHeaderText,
  buttonText,
  onClick,
}) => (
  <SSubHeader>
    {subHeaderText}
    {onClick && (
      <SChangeButton type="button" onClick={onClick}>
        {buttonText}
      </SChangeButton>
    )}
  </SSubHeader>
);

const LoginForm: FC = () => {
  const [state, dispatch] = useReducer(loginFormReducer, INITIAL_STATE);

  const isLogin = state.loginSelected && !state.isResetPassword;
  const isCreate = !state.loginSelected && !state.isResetPassword;
  const isReset = state.isResetPassword;
  const showNameInput = isCreate;
  const showPasswordInput = isLogin || isCreate;
  const formText = getFormText(isLogin, isReset);

  const runFormValidations = useCallback(() => {
    const { emailAddress, password, name } = loginFormValidators;

    return runValidations([
      emailAddress({
        value: state.formValues.emailAddress,
      }),
      password({
        value: state.formValues.password,
        shouldValidate: isLogin || isCreate,
      }),
      name({
        value: state.formValues.name,
        shouldValidate: isCreate,
      }),
    ]);
  }, [
    state.formValues.emailAddress,
    state.formValues.password,
    state.formValues.name,
    isCreate,
    isLogin,
  ]);

  const submitHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const errors = runFormValidations();

    dispatch({ type: ELoginFormType.SUBMIT, payload: { errors } });

    const hasErrors = !!Object.keys(errors).length;

    if (hasErrors) {
      return;
    }

    console.log(
      'Sending request:',
      isLogin ? 'LOGIN' : isCreate ? 'CREATE' : 'RESET'
    );
  };

  const handleToggleInteract = () => {
    if (isLogin) {
      return dispatch({ type: ELoginFormType.SELECT_CREATE_ACCOUNT });
    } else if (isCreate || isReset) {
      return dispatch({ type: ELoginFormType.SELECT_LOGIN });
    }

    return dispatch({ type: ELoginFormType.SELECT_RESET_PASSWORD });
  };

  const handleSelectResetPassword = () => {
    dispatch({ type: ELoginFormType.SELECT_RESET_PASSWORD });
  };

  const handleOnBlur = () => {
    if (state.hasSubmitted) {
      dispatch({
        type: ELoginFormType.UPDATE_ERRORS,
        payload: { errors: runFormValidations() },
      });
    }
  };
  const updateFormValues = ({
    id,
    value,
  }: {
    id: TInputTypes;
    value: string;
  }) => {
    const updatedValues: TFormValues = { ...state.formValues, [id]: value };
    dispatch({
      type: ELoginFormType.UPDATE_VALUES,
      payload: { values: updatedValues },
    });
  };

  const updateFormValuesMemoized = useMemoizeFunction(updateFormValues);
  const handleOnBlurMemoized = useMemoizeFunction(handleOnBlur);

  return (
    <SContainer>
      <SHeaderContainer>
        <SHeader>{formText.headerText}</SHeader>
        <InteractiveSubHeader
          subHeaderText={formText.subHeaderText}
          buttonText={formText.typeChangeText}
          onClick={handleToggleInteract}
        />
      </SHeaderContainer>
      <SContentContainer>
        <SInputsContainer>
          {showNameInput && (
            <FormInput<TInputTypes>
              id="name"
              name="Name"
              type="text"
              value={state.formValues.name}
              required
              isError={state.formErrors['name']}
              onChange={updateFormValuesMemoized}
              onBlur={handleOnBlurMemoized}
            />
          )}
          <FormInput<TInputTypes>
            id="emailAddress"
            name="Email address"
            type="email"
            value={state.formValues.emailAddress}
            required
            isError={state.formErrors['emailAddress']}
            onChange={updateFormValuesMemoized}
            onBlur={handleOnBlurMemoized}
          />
          {showPasswordInput && (
            <FormInput<TInputTypes>
              id="password"
              name="Password"
              type="password"
              value={state.formValues.password}
              required
              title={`Minimum of ${PASSWORD_MIN_LENGTH} characters.`}
              isError={state.formErrors['password']}
              onChange={updateFormValuesMemoized}
              onBlur={handleOnBlurMemoized}
            />
          )}
        </SInputsContainer>
        {isLogin && (
          <InteractiveSubHeader
            subHeaderText="Forgot password?"
            buttonText="Reset here."
            onClick={handleSelectResetPassword}
          />
        )}
        {state.isResetPassword && (
          <InteractiveSubHeader subHeaderText="Enter your email address and a reset code will be sent to you." />
        )}
      </SContentContainer>
      <SLoginButtonContainer>
        <SLoginButton type="submit" onClick={submitHandler}>
          {formText.loginButtonText}
        </SLoginButton>
      </SLoginButtonContainer>
    </SContainer>
  );
};

LoginForm.displayName = 'LoginForm';

export default LoginForm;
