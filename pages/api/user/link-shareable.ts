import { CustomAxiosError } from '@client/interfaces/axios.types';
import { createApiClientSecure } from '@server/api-client';
import { API_SHARE_LINK_SHAREABLE } from '@server/server.constants';
import { NextApiRequest, NextApiResponse } from 'next';

interface IResponse {
  shareLink?: string;
  ok?: boolean;
  message?: string;
}
interface IRequest extends NextApiRequest {
  isShared: boolean;
}

const handler = async (req: IRequest, res: NextApiResponse<IResponse>) => {
  if (req.method === 'PUT') {
    try {
      const apiClientSecure = await createApiClientSecure(req);

      const { data } = await apiClientSecure.put(
        API_SHARE_LINK_SHAREABLE,
        req.body
      );

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
