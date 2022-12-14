import { CustomAxiosError } from '@client/interfaces/axios.types';
import { createApiClientSecure } from '@server/api-client';
import { API_SHARE_GENERATE_LINK } from '@server/server.constants';
import { NextApiRequest, NextApiResponse } from 'next';

interface IResponse {
  shareLink?: string;
  ok?: boolean;
  message?: string;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) => {
  if (req.method === 'PUT') {
    console.log('GENERATE LINK PUT:');

    try {
      const apiClientSecure = await createApiClientSecure(req);

      const { data } = await apiClientSecure.put(API_SHARE_GENERATE_LINK);

      return res.status(201).json({ ok: true, shareLink: data.shareLink });
    } catch (err) {
      return res.status(500).json({
        ok: false,
        message: (err as CustomAxiosError).response?.data.message,
      });
    }
  }

  return res.status(500).json({ ok: false });
};

export default handler;
