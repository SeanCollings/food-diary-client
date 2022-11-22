import { IMealContent, TMealType } from '@utils/interfaces';
import axios, { AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

interface IMealEntryDto {
  mealId: TMealType;
  content: IMealContent;
}
interface IRequest<T extends unknown> extends NextApiRequest {
  query: {
    date: string;
  };
  body: T;
}
interface IResponse {
  ok: boolean;
  message?: string;
}

const handler = async (
  req: IRequest<IMealEntryDto>,
  res: NextApiResponse<IResponse>
) => {
  const session = await getSession({ req });
  const { date } = req.query;

  try {
    if (req.method === 'POST') {
      const { data } = await axios.post(
        `${process.env.SERVER_HOST}/meals?date=${date}`,
        req.body,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );

      return res.status(201).json({ ok: true });
    }

    if (req.method === 'PUT') {
      const { data } = await axios.put(
        `${process.env.SERVER_HOST}/meals?date=${date}`,
        req.body,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );

      return res.status(200).json({ ok: true });
    }

    if (req.method === 'DELETE') {
      const { data } = await axios.delete(
        `${process.env.SERVER_HOST}/meals?date=${date}`,
        {
          data: req.body,
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );

      return res.status(200).json({ ok: true });
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
};

export default handler;
