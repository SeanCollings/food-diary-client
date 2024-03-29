import { NextApiRequest, NextApiResponse } from 'next';
import { IDiaryReponseData } from '@client/interfaces/diary-data';
import { createApiClientSecure } from '@server/api-client';
import { API_DIARY } from '@server/server.constants';
import { CustomAxiosError } from '@client/interfaces/axios.types';

interface IRequest extends NextApiRequest {
  query: {
    date: string;
  };
}

const handler = async (
  req: IRequest,
  res: NextApiResponse<IDiaryReponseData>,
) => {
  const { date } = req.query;

  if (req.method !== 'GET') {
    return res.status(500).json({ ok: false });
  }

  try {
    const apiClientSecure = await createApiClientSecure(req);

    const { data } = await apiClientSecure.get(`${API_DIARY}?date=${date}`);

    return res.status(200).json({
      ok: true,
      entry: {
        meals: data?.meals || {},
        wellness: data?.wellness || {},
      },
    });
  } catch (err) {
    const typedError = err as CustomAxiosError;

    return res.status(typedError.status || 500).json({
      ok: false,
      message: typedError.response?.data.message,
    });
  }
};

export default handler;
