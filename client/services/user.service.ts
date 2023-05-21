import {
  DEFAULT_AXIOS_ERROR_MSG,
  URI_GENERATE_LINK,
  URI_LINK_SHAREABLE,
  URI_PREFERENCES,
  URI_USER,
} from '@client/constants';
import { CustomAxiosError } from '@client/interfaces/axios.types';
import {
  IPartialPreference,
  IPartialUserUpdate,
  IShareLinkPreference,
} from '@store/user-context';
import axios, { AxiosError } from 'axios';

interface IResponse {
  ok?: boolean;
  error?: string;
}
interface IShareLinkResponse {
  shareLink: string;
}
interface IGenerateReponse extends IResponse {
  shareLink?: string;
}

const createService = () => {
  const updateUser = async (body: IPartialUserUpdate) => {
    try {
      const { data } = await axios.patch<IResponse>(URI_USER, body);

      return { ok: true };
    } catch (err) {
      return {
        error: (err as CustomAxiosError).message || DEFAULT_AXIOS_ERROR_MSG,
      };
    }
  };

  const updatePreferences = async (update: IPartialPreference) => {
    try {
      const { data } = await axios.patch<IResponse>(URI_PREFERENCES, update);

      return { ok: true };
    } catch (err) {
      return {
        error: (err as CustomAxiosError).message || DEFAULT_AXIOS_ERROR_MSG,
      };
    }
  };

  const updateSharePreference = async (update: IShareLinkPreference) => {
    try {
      const { data } = await axios.put<IResponse>(`${URI_LINK_SHAREABLE}`, {
        isShared: update['isProfileShared'],
      });

      return { ok: true };
    } catch (err) {
      return {
        error: (err as CustomAxiosError).message || DEFAULT_AXIOS_ERROR_MSG,
      };
    }
  };

  const generateLink = async (): Promise<IGenerateReponse> => {
    try {
      const { data } = await axios.put<IShareLinkResponse>(URI_GENERATE_LINK);

      return {
        ok: true,
        shareLink: data.shareLink,
      };
    } catch (err) {
      return {
        error: (err as CustomAxiosError).message || DEFAULT_AXIOS_ERROR_MSG,
      };
    }
  };

  return { updateUser, updatePreferences, updateSharePreference, generateLink };
};

export const userService = createService();
