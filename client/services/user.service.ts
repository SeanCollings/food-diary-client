import {
  URI_GENERATE_LINK,
  URI_LINK_SHAREABLE,
  URI_PREFERENCES,
  URI_USER,
} from '@client/constants';
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

const createService = () => {
  const updateUser = async (body: IPartialUserUpdate) => {
    try {
      const { data } = await axios.patch<IResponse>(URI_USER, body);

      return {};
    } catch (err) {
      console.log('err ::', err);
      return {
        error: (err as AxiosError).message,
      };
    }
  };

  const updatePreferences = async (update: IPartialPreference) => {
    try {
      const { data } = await axios.patch<IResponse>(URI_PREFERENCES, update);

      return {};
    } catch (err) {
      console.log('err ::', err);
      return {
        error: (err as AxiosError).message,
      };
    }
  };

  const updateSharePreference = async (update: IShareLinkPreference) => {
    try {
      const { data } = await axios.put<IResponse>(`${URI_LINK_SHAREABLE}`, {
        isShared: update['isProfileShared'],
      });

      return {};
    } catch (err) {
      console.log('err ::', err);
      return {
        error: (err as AxiosError).message,
      };
    }
  };

  const generateLink = async () => {
    try {
      const { data } = await axios.post<IShareLinkResponse>(URI_GENERATE_LINK);

      return {
        shareLink: data.shareLink,
      };
    } catch (err) {
      console.log('err ::', err);
      return {
        error: (err as AxiosError).message || 'An error occurred',
      };
    }
  };

  return { updateUser, updatePreferences, updateSharePreference, generateLink };
};

export const userService = createService();
