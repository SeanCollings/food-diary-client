import { CustomAxiosError } from '@client/interfaces/axios.types';
import { createApiClientSecure } from '@server/api-client';
import { API_USER_PREFERENCES } from '@server/server.constants';
import { IPartialPreference } from '@store/user-context';
import { NextApiRequest, NextApiResponse } from 'next';

interface IResponse {
  ok: boolean;
  message?: string;
}
interface IPatchRequest extends NextApiRequest {
  body: IPartialPreference;
}

const handler = async (req: IPatchRequest, res: NextApiResponse<IResponse>) => {
  try {
    const apiClientSecure = await createApiClientSecure(req);

    if (req.method === 'PATCH') {
      const { data } = await apiClientSecure.patch(
        API_USER_PREFERENCES,
        req.body,
      );

      return res.status(201).json({ ok: true });
    }
  } catch (err) {
    const typedError = err as CustomAxiosError;

    return res.status(typedError.status || 500).json({
      ok: false,
      message: typedError.response?.data.message,
    });
  }

  return res.status(500).json({ ok: false });
};

export default handler;
