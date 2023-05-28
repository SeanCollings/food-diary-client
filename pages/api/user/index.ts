import { CustomAxiosError } from '@client/interfaces/axios.types';
import { IUserResponse } from '@client/interfaces/user-data.type';
import { createApiClientSecure } from '@server/api-client';
import { API_USER, API_USER_PROFILE } from '@server/server.constants';
import { IPartialUserUpdate } from '@store/user-context';
import { NextApiRequest, NextApiResponse } from 'next';

interface IResponse {
  ok: boolean;
  message?: string;
}
interface IGetUserProfileResponse {
  ok: boolean;
  message?: string;
  user: IUserResponse;
}
interface IPatchRequest extends NextApiRequest {
  body: IPartialUserUpdate;
}

const handler = async (
  req: IPatchRequest,
  res: NextApiResponse<IResponse | IGetUserProfileResponse>,
) => {
  try {
    const apiClientSecure = await createApiClientSecure(req);

    if (req.method === 'GET') {
      const { data } = await apiClientSecure.get<IUserResponse>(
        API_USER_PROFILE,
      );

      return res.status(200).json({ ok: true, user: data });
    }

    if (req.method === 'PATCH') {
      const { data } = await apiClientSecure.patch(API_USER, req.body);

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
