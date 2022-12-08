import { DEFAULT_AXIOS_ERROR_MSG } from '@client/constants';
import { CustomAxiosError } from '@client/interfaces/axios.types';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

interface IRequest extends NextApiRequest {
  body: {
    email: string;
    token: string;
  };
}

const handler = async (req: IRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'POST') {
      return;
    }

    await axios.post(`${process.env.SERVER_HOST}/auth/reset`, req.body);

    return res.status(209).json({ ok: true, message: 'Email sent' });
  } catch (err) {
    return res.status(500).json({
      error:
        (err as CustomAxiosError).response?.data.message ||
        DEFAULT_AXIOS_ERROR_MSG,
    });
  }
};

export default handler;
