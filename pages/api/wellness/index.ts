import { CustomAxiosError } from '@client/interfaces/axios.types';
import {
  IWellnessEntriesDto,
  TWellnessEntryAndDate,
} from '@lib/interfaces/wellness.interface';
import { createApiClientSecure } from '@server/api-client';
import { API_WELLNESS } from '@server/server.constants';
import { NextApiRequest, NextApiResponse } from 'next';

interface IRequest<T extends unknown> extends NextApiRequest {
  body: T;
}
interface IResponse {
  ok: boolean;
  message?: string;
}

const handler = async (
  req: IRequest<IWellnessEntriesDto>,
  res: NextApiResponse<IResponse>,
) => {
  try {
    const apiClientSecure = await createApiClientSecure(req);

    if (req.method === 'PUT') {
      const transformedBody = Object.values(req.body).reduce(
        (acc, entry) => [...acc, entry],
        [] as TWellnessEntryAndDate[],
      );

      const { data } = await apiClientSecure.put(API_WELLNESS, {
        data: transformedBody,
      });

      return res.status(201).json({ ok: true });
    }
  } catch (err) {
    const typedError = err as CustomAxiosError;

    return res.status(typedError.status || 500).json({
      ok: false,
      message: typedError.response?.data.message,
    });
  }

  return;
};

export default handler;
