import axios, { AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

interface IResponse {
  ok: boolean;
  message?: string;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) => {
  const session = await getSession({ req });

  try {
    if (req.method === 'PATCH') {
      console.log('PREFERENCES PATCH:', req.body);

      const { data } = await axios.patch(
        `${process.env.SERVER_HOST}/user/preferences`,
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
