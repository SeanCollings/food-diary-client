import axios, { AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

interface IResponse {
  shareLink?: string;
  ok?: boolean;
  message?: string;
}
interface IRequest extends NextApiRequest {
  isShared: boolean;
}

const handler = async (req: IRequest, res: NextApiResponse<IResponse>) => {
  const session = await getSession({ req });

  if (req.method === 'PUT') {
    try {
      const { data } = await axios.put(
        `${process.env.SERVER_HOST}/share/link-shareable`,
        req.body,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );

      return res.status(201).json({ ok: true, shareLink: data.shareLink });
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
  }

  return res.status(500).json({ ok: false });
};

export default handler;
