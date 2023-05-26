import { TTimePeriod } from '@client/interfaces/meal-trend-data';
import { IExcerciseTrendData } from '@client/interfaces/wellness-trend-data';
import { NextApiRequest, NextApiResponse } from 'next';
import { createApiClientSecure } from '@server/api-client';
import { API_TRENDS_EXCERCISE } from '@server/server.constants';
import { CustomAxiosError } from '@client/interfaces/axios.types';

interface IRequest extends NextApiRequest {
  query: { type: TTimePeriod };
}

const handler = async (
  req: IRequest,
  res: NextApiResponse<IExcerciseTrendData>,
) => {
  const { type } = req.query;

  if (req.method !== 'GET') {
    return;
  }

  try {
    const apiClientSecure = await createApiClientSecure(req);

    const { data } = await apiClientSecure.get(
      `${API_TRENDS_EXCERCISE}?type=${type}`,
    );

    const { highestValue, legend, excercisePerDay } = data;

    return res.status(200).json({ highestValue, legend, excercisePerDay });
  } catch (err) {
    const typedError = err as CustomAxiosError;

    return res.status(typedError.status || 500).json({
      ok: false,
      message: typedError.response?.data.message,
    });
  }
};

export default handler;
