import FormInput from '@components/ui/input/form-input';
import { APP_THEME_DEFAULT, COLOURS, MEDIA_MOBILE } from '@utils/constants';
import { runValidations, TValidators } from '@utils/validation';
import {
  FC,
  MouseEvent,
  useState,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import styled from 'styled-components';
import {
  emailAddressValidators,
  nameValidators,
  passwordValidators,
} from '@utils/validation/validators';
import { PASSWORD_MIN_LENGTH } from '@utils/validation/validation.constants';

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

enum EInputTypes {
  EMAIL_ADDRESS = 'emailAddress',
  PASSWORD = 'password',
  NAME = 'name',
}

type TInputTypes = `${EInputTypes}`;

const getFormText = (loginSelected: boolean, resetSelected: boolean) => {
  if (loginSelected && !resetSelected) {
    return {
      headerText: 'Login now',
      subHeaderText: 'Are you new?',
      typeChangeText: 'Create account.',
      loginButtonText: 'Login',
    };
  } else if (resetSelected) {
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

type TLoginFormValitators = {
  [key in TInputTypes]: (
    formValues: TFormValues,
    shouldValidate: boolean
  ) => {
    id: TInputTypes;
    shouldValidate: boolean;
    value: string;
    validators: TValidators;
  };
};

const loginFormValidators: TLoginFormValitators = {
  emailAddress: (formValues: TFormValues, shouldValidate: boolean) => ({
    id: 'emailAddress',
    shouldValidate,
    value: formValues.emailAddress,
    validators: emailAddressValidators,
  }),
  password: (formValues: TFormValues, shouldValidate: boolean) => ({
    id: 'password',
    shouldValidate,
    value: formValues.password,
    validators: passwordValidators,
  }),
  name: (formValues: TFormValues, shouldValidate: boolean) => ({
    id: 'name',
    shouldValidate,
    value: formValues.name,
    validators: nameValidators,
  }),
};

type TFormValues = {
  [key in TInputTypes]: string;
};
type TFormErrors = {
  [key in TInputTypes]?: string;
};

const defaultFormValues: TFormValues = {
  emailAddress: '',
  password: '',
  name: '',
};

const LoginForm: FC = () => {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [loginSelected, setLoginSelected] = useState(true);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<TFormErrors>({});
  const [formValues, setFormValues] = useState<TFormValues>(defaultFormValues);

  const formText = getFormText(loginSelected, isResetPassword);
  const isLogin = loginSelected && !isResetPassword;
  const isCreate = !loginSelected && !isResetPassword;
  const showNameInput = isCreate;
  const showPasswordInput = isLogin || isCreate;

  const runFormValidations = useCallback(
    () =>
      runValidations([
        loginFormValidators['emailAddress'](formValues, true),
        loginFormValidators['password'](formValues, isLogin || isCreate),
        loginFormValidators['name'](formValues, isCreate),
      ]),
    [formValues, isCreate, isLogin]
  );

  const submitHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const errors = runFormValidations();

    setFormErrors(errors);
    setHasSubmitted(true);

    if (!Object.keys(errors).length) {
      console.log(
        'Sending request:',
        isLogin ? 'LOGIN' : isCreate ? 'CREATE' : 'RESET'
      );
    }
  };

  const handleInteract = () => {
    if (isResetPassword) {
      setIsResetPassword(false);
      setLoginSelected(true);
    } else {
      setLoginSelected(!loginSelected);
    }

    setFormErrors({});
  };

  const handleResetPassword = () => {
    setIsResetPassword(true);
    setFormValues(defaultFormValues);
  };

  const handleOnBlur = () => {
    if (hasSubmitted) {
      setFormErrors(runFormValidations());
    }
  };
  const updateFormValues = useCallback(
    (id: TInputTypes, value: string) => {
      const updatedValues: TFormValues = { ...formValues, [id]: value };
      setFormValues(updatedValues);
    },
    [formValues]
  );
  const handleOnBlurRef = useRef(handleOnBlur);
  const updateFormValuesRef = useRef(updateFormValues);

  //https://stackoverflow.com/questions/55045566/react-hooks-usecallback-causes-child-to-re-render

  useEffect(() => {
    handleOnBlurRef.current = handleOnBlur;
    updateFormValuesRef.current = updateFormValues;
  });

  const handleOnBlurMemoized = useCallback(() => {
    handleOnBlurRef.current();
  }, []);
  const updateFormValuesMemoized = useCallback(
    (type: TInputTypes, value: string) => {
      updateFormValuesRef.current(type, value);
    },
    []
  );

  return (
    <SContainer>
      <SHeaderContainer>
        <SHeader>{formText.headerText}</SHeader>
        <InteractiveSubHeader
          subHeaderText={formText.subHeaderText}
          buttonText={formText.typeChangeText}
          onClick={handleInteract}
        />
      </SHeaderContainer>
      <SContentContainer>
        <SInputsContainer>
          {showNameInput && (
            <FormInput<TInputTypes>
              id="name"
              name="Name"
              type="text"
              value={formValues.name}
              required
              isError={formErrors['name']}
              onChange={updateFormValuesMemoized}
              onBlur={handleOnBlurMemoized}
            />
          )}
          <FormInput<TInputTypes>
            id="emailAddress"
            name="Email address"
            type="email"
            value={formValues.emailAddress}
            required
            isError={formErrors['emailAddress']}
            onChange={updateFormValuesMemoized}
            onBlur={handleOnBlurMemoized}
          />
          {showPasswordInput && (
            <FormInput<TInputTypes>
              id="password"
              name="Password"
              type="password"
              value={formValues.password}
              required
              title={`Minimum of ${PASSWORD_MIN_LENGTH} characters.`}
              isError={formErrors['password']}
              onChange={updateFormValuesMemoized}
              onBlur={handleOnBlurMemoized}
            />
          )}
        </SInputsContainer>
        {isLogin && (
          <InteractiveSubHeader
            subHeaderText="Forgot password?"
            buttonText="Reset here."
            onClick={handleResetPassword}
          />
        )}
        {isResetPassword && (
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
