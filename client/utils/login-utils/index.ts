import { DEFAULT_AXIOS_ERROR_MSG } from '@client/constants';
import { authService } from '@client/services/auth.service';
import { getRecaptchaToken } from '@utils/grecaptcha-utils';
import {
  ICreateUserResponse,
  IResetPasswordParams,
  ISignInUserParams,
  ISignInUserResponse,
  TFormValues,
} from '@components/login-form/types';
import { CustomAxiosError } from '@client/interfaces/axios.types';

export const createUser = async ({
  email,
  password,
  name,
}: TFormValues): Promise<ICreateUserResponse> => {
  try {
    const token = await getRecaptchaToken('create');
    const { error, message, status } = await authService.signup({
      email,
      password,
      name,
      token,
    });

    if (error) {
      return { error: { message: error, status } };
    }

    return { message };
  } catch (err) {
    const error = err as CustomAxiosError;
    return {
      error: {
        message: error?.message || DEFAULT_AXIOS_ERROR_MSG,
        status: error.status || 500,
      },
    };
  }
};

export const signInUser = async ({
  email,
  password,
}: ISignInUserParams): Promise<ISignInUserResponse | undefined> => {
  try {
    const token = await getRecaptchaToken('login');

    return await authService.signin({ email, password, token });
  } catch (err) {
    return {
      error: (err as CustomAxiosError)?.message || DEFAULT_AXIOS_ERROR_MSG,
    };
  }
};

export const resetPassword = async ({ email }: IResetPasswordParams) => {
  try {
    const token = await getRecaptchaToken('reset');

    return await authService.resetPassword({ email, token });
  } catch (err) {
    return {
      error: (err as CustomAxiosError)?.message || DEFAULT_AXIOS_ERROR_MSG,
    };
  }
};
