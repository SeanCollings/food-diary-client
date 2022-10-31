import {
  URI_GENERATE_LINK,
  URI_PREFERENCES,
  URI_USER,
} from '@client/constants';
import { IPartialPreference, IPartialUserUpdate } from '@store/user-context';
import axios, { AxiosError } from 'axios';

interface IResponse {
  ok?: boolean;
  error?: string;
}
interface IShareLinkResponse {
  shareLink: string;
}

const createService = () => {
  const updateUser = async (update: IPartialUserUpdate) => {
    try {
      console.log('updateUser ::', update);

      const { data } = await axios.patch<IResponse>(URI_USER, update);

      console.log('DATA ::', data);

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
      console.log('updatePreferences ::', update);

      const { data } = await axios.patch<IResponse>(URI_PREFERENCES, update);

      console.log('DATA ::', data);

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
      console.log('generateLink ::');

      const { data } = await axios.post<IShareLinkResponse>(URI_GENERATE_LINK);

      console.log('DATA ::', data);
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

  return { updateUser, updatePreferences, generateLink };
};

export const userService = createService();
