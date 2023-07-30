import FormInput from '@components/ui/input/form-input';
import { MEDIA_MOBILE } from '@utils/app.constants';
import { runValidations } from '@utils/validation';
import { FC, FormEvent, useCallback, useEffect, useReducer } from 'react';
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
import { useRouter } from 'next/router';
import {
  createRecaptchaScript,
  hideRecaptchaBadge,
} from '@utils/grecaptcha-utils';
import {
  createUser,
  resetPassword,
  signInUser,
} from '@client/utils/login-utils';

const SForm = styled.form`
  background: var(--bg-secondary);
  max-width: 400px;
  width: 100%;
  border-radius: 12px;
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
  background: transparent;
  border: transparent;
  cursor: pointer;
  color: var(--th-primary);

  :hover {
    text-decoration: underline;
  }
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
  background: var(--th-primary);
  border: transparent;
  font-size: 24px;
  color: var(--text);
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
const SRecaptchaContainer = styled.span`
  margin-top: 12px;
  font-size: 12px;
  text-align: center;
  max-width: 400px;
  background-color: var(--bg-secondary);
  border-radius: 4px;
  padding: 4px;
`;
const SGoogleLink = styled.a`
  color: var(--th-primary);
  :hover {
    text-decoration: underline;
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

interface IGoogleLinkProps {
  link: string;
  label: string;
}

const GoogleLink: FC<IGoogleLinkProps> = ({ link, label }) => (
  <SGoogleLink href={link} target={'_blank'} rel="noreferrer noopener">
    {label}
  </SGoogleLink>
);

const LoginForm: FC = () => {
  const router = useRouter();
  const [state, dispatch] = useReducer(loginFormReducer, INITIAL_STATE);

  const isLogin = state.formType === 'login';
  const isCreate = state.formType === 'create';
  const isReset = state.formType === 'reset';

  const showNameInput = isCreate;
  const showPasswordInput = isLogin || isCreate;
  const formText = getFormText(isLogin, isReset);

  useEffect(() => {
    createRecaptchaScript();
  }, []);

  const signIn = async () => {
    const result = await signInUser({
      email: state.formValues.email,
      password: state.formValues.password,
    });

    if (!result || result?.error) {
      return dispatch({
        type: ELoginFormType.LOGIN_ERROR,
        payload: result?.error || 'Something went wrong',
      });
    }

    hideRecaptchaBadge();
    router.replace('/');
  };

  const runFormValidations = useCallback(() => {
    const { email, password, name } = loginFormValidators;

    return runValidations([
      email({
        value: state.formValues.email,
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
    state.formValues.email,
    state.formValues.password,
    state.formValues.name,
    isCreate,
    isLogin,
  ]);

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = runFormValidations();
    // set loading true
    dispatch({ type: ELoginFormType.SUBMIT, payload: { errors } });

    const hasErrors = !!Object.keys(errors).length;

    if (hasErrors) {
      return;
    }

    try {
      switch (state.formType) {
        case 'login':
          await signIn();
          break;
        case 'create':
          const { error } = await createUser(state.formValues);

          if (!error) {
            await signIn();
          }
          break;
        case 'reset':
          await resetPassword({ email: state.formValues.email });
          break;
      }
    } catch (err) {
      console.error(err);
    }
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
    <>
      <SForm onSubmit={submitHandler}>
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
                label="Name"
                type="text"
                autoComplete="name"
                value={state.formValues.name}
                required
                isError={state.formErrors['name']}
                onChange={updateFormValuesMemoized}
                onBlur={handleOnBlurMemoized}
              />
            )}
            <FormInput<TInputTypes>
              id="email"
              label="Email address"
              name="email"
              type="email"
              autoComplete="email"
              value={state.formValues.email}
              required
              isError={state.formErrors['email']}
              onChange={updateFormValuesMemoized}
              onBlur={handleOnBlurMemoized}
            />
            {showPasswordInput && (
              <FormInput<TInputTypes>
                id="password"
                name="password"
                label="Password"
                type="password"
                autoComplete={
                  state.formType === 'create'
                    ? 'new-password'
                    : 'current-password'
                }
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
          {isReset && (
            <InteractiveSubHeader subHeaderText="Enter your email address and a reset code will be sent to you." />
          )}
        </SContentContainer>
        <SLoginButtonContainer>
          <SLoginButton type="submit">{formText.loginButtonText}</SLoginButton>
        </SLoginButtonContainer>
      </SForm>
      <SRecaptchaContainer>
        This page is protected by reCAPTCHA and the Google{' '}
        <GoogleLink
          link="https://policies.google.com/privacy"
          label="Privacy Policy"
        />{' '}
        and{' '}
        <GoogleLink
          link="https://policies.google.com/terms"
          label="Terms of Service"
        />{' '}
        apply
      </SRecaptchaContainer>
    </>
  );
};

LoginForm.displayName = 'LoginForm';

export default LoginForm;
