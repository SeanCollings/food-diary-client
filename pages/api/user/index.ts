import { IUserResponse } from '@client/interfaces/user-data.type';
import axios, { AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

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
  const session = await getSession({ req });

  try {
    if (req.method === 'GET') {
      console.log('-------- /user/profile');

      const { data } = await axios.get<IUserResponse>(
        `${process.env.SERVER_HOST}/user/profile`,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );

      return res.status(201).json({ ok: true, user: data });
    }

    if (req.method === 'PATCH') {
      const { data } = await axios.patch(
        `${process.env.SERVER_HOST}/user`,
        req.body,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
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
