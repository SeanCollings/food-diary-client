import {
  DEFAULT_AXIOS_ERROR_MSG,
  URI_RESET_PASSWORD,
  URI_SIGNUP,
} from '@client/constants';
import { CustomAxiosError } from '@client/interfaces/axios.types';
import axios from 'axios';
import { signIn } from 'next-auth/react';

interface IResponse {
  ok?: boolean;
  error?: string;
  message?: string;
}
interface ISignupArgs {
  email: string;
  password: string;
  name: string;
  token: string;
}
interface ISigninArgs {
  email: string;
  password: string;
  token: string;
}
interface IResetPasswordArgs {
  email: string;
  token: string;
}

const createService = () => {
  const signup = async (body: ISignupArgs): Promise<IResponse> => {
    try {
      const { data } = await axios.post<IResponse>(URI_SIGNUP, body);

      return { ok: true, message: data.message };
    } catch (err) {
      return {
        error: (err as CustomAxiosError).message || DEFAULT_AXIOS_ERROR_MSG,
      };
    }
  };

  const signin = async (body: ISigninArgs) => {
    try {
      return await signIn('credentials', {
        redirect: false,
        ...body,
      });
    } catch (err) {
      return { error: (err as Error).message };
    }
  };

  const resetPassword = async (
    body: IResetPasswordArgs,
  ): Promise<IResponse> => {
    try {
      const { data } = await axios.post<IResponse>(URI_RESET_PASSWORD, body);

      return { ok: true, message: data.message };
    } catch (err) {
      return {
        error: (err as CustomAxiosError).message || DEFAULT_AXIOS_ERROR_MSG,
      };
    }
  };

  return {
    signup,
    signin,
    resetPassword,
  };
};

export const authService = createService();
