import { createApiClientSecure } from '@server/api-client';
import { API_USER_PREFERENCES } from '@server/server.constants';
import { AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

interface IResponse {
  ok: boolean;
  message?: string;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) => {
  try {
    const apiClientSecure = await createApiClientSecure(req);

    if (req.method === 'PATCH') {
      console.log('PREFERENCES PATCH:', req.body);

      const { data } = await apiClientSecure.patch(
        API_USER_PREFERENCES,
        req.body
      );

      return res.status(201).json({ ok: true });
    }
  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: (
        err as AxiosError<{
          statusCode: number;
          message: string;
          error: string;
        }>
      ).response?.data.message,
    });
  }

  return res.status(500).json({ ok: false });
};

export default handler;
