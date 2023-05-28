import { CustomAxiosError } from '@client/interfaces/axios.types';
import { apiClient } from '@server/api-client';
import { API_AUTH_RESET } from '@server/server.constants';
import { NextApiRequest, NextApiResponse } from 'next';

interface IRequest extends NextApiRequest {
  body: {
    email: string;
    token: string;
  };
}

const handler = async (req: IRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(500).json({ ok: false });
  }

  try {
    await apiClient.post(API_AUTH_RESET, req.body);

    return res.status(202).json({ ok: true, message: 'Email sent' });
  } catch (err) {
    const typedError = err as CustomAxiosError;

    return res.status(typedError.status || 500).json({
      ok: false,
      message: typedError.response?.data.message,
    });
  }
};

export default handler;
