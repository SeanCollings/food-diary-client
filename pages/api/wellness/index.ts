import { IWellnessEntriesDto } from '@lib/interfaces/wellness.interface';
import axios, { AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

interface IRequest<T extends unknown> extends NextApiRequest {
  body: T;
}
interface IResponse {
  ok: boolean;
  message?: string;
}

const handler = async (
  req: IRequest<IWellnessEntriesDto>,
  res: NextApiResponse<IResponse>
) => {
  const session = await getSession({ req });

  try {
    if (req.method === 'PUT') {
      const transformedBody = Object.values(req.body).reduce((acc, entry) => {
        acc.push(entry);

        return acc;
      }, [] as any);

      const { data } = await axios.put(
        `${process.env.SERVER_HOST}/wellness`,
        { data: transformedBody },
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

  return;
};

export default handler;
