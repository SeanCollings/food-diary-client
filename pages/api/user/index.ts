import { IUserResponse } from '@client/interfaces/user-data.type';
import { createApiClientSecure } from '@server/api-client';
import { API_USER_PROFILE } from '@server/server.constants';
import { AxiosError } from 'axios';
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

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponse | IGetUserProfileResponse>
) => {
  try {
    const apiClientSecure = await createApiClientSecure(req);

    if (req.method === 'GET') {
      console.log('-------- /user/profile');

      const { data } = await apiClientSecure.get<IUserResponse>(
        API_USER_PROFILE
      );

      return res.status(201).json({ ok: true, user: data });
    }

    if (req.method === 'PATCH') {
      const { data } = await apiClientSecure.patch(
        `${process.env.SERVER_HOST}/user`,
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
