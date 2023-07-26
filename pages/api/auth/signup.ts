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
  if (req.method !== 'POST') {
    return res.status(500).json({ ok: false });
  }

  try {
    await apiClient.post(API_AUTH_SIGNUP, req.body);

    return res.status(201).json({ ok: true, message: 'User created' });
  } catch (err) {
    const typedError = err as CustomAxiosError;
    console.error('[signup error] ::', typedError.message);

    return res.status(typedError.status || 500).json({
      ok: false,
      message: typedError.message,
    });
  }
};

export default handler;
