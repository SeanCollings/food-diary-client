import { DEFAULT_AXIOS_ERROR_MSG } from '@client/constants';
import { CustomAxiosError } from '@client/interfaces/axios.types';
import { apiClient } from '@server/api-client';
import { API_AUTH_SIGNUP } from '@server/server.constants';
import { NextApiRequest, NextApiResponse } from 'next';

interface IRequest extends NextApiRequest {
  body: {
    email: string;
    password: string;
    name: string;
    token: string;
  };
}

const handler = async (req: IRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'POST') {
      return;
    }

    await apiClient.post(API_AUTH_SIGNUP, req.body);

    return res.status(201).json({ message: 'User created' });
  } catch (err) {
    return res.status(500).json({
      error:
        (err as CustomAxiosError).response?.data.message ||
        DEFAULT_AXIOS_ERROR_MSG,
    });
  }
};

export default handler;
