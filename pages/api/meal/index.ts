import { createApiClientSecure } from '@server/api-client';
import { API_MEALS } from '@server/server.constants';
import { IMealContent, TMealType } from '@utils/interfaces';
import { AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

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
  const { date } = req.query;
  const mealsUrl = `${API_MEALS}?date=${date}`;

  try {
    const apiClientSecure = await createApiClientSecure(req);

    if (req.method === 'POST') {
      const { data } = await apiClientSecure.post(mealsUrl, req.body);

      return res.status(201).json({ ok: true });
    }

    if (req.method === 'PUT') {
      const { data } = await apiClientSecure.put(mealsUrl, req.body);

      return res.status(200).json({ ok: true });
    }

    if (req.method === 'DELETE') {
      const { data } = await apiClientSecure.delete(mealsUrl, {
        data: req.body,
      });

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
