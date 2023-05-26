import { NextApiRequest, NextApiResponse } from 'next';
import {
  IMealTrendResponseBody,
  TTimePeriod,
} from '@client/interfaces/meal-trend-data';
import { createApiClientSecure } from '@server/api-client';
import { API_TRENDS_MEAL } from '@server/server.constants';
import { CustomAxiosError } from '@client/interfaces/axios.types';

interface IRequest extends NextApiRequest {
  query: { type: TTimePeriod };
}

const handler = async (
  req: IRequest,
  res: NextApiResponse<IMealTrendResponseBody>,
) => {
  const { type } = req.query;

  if (req.method !== 'GET') {
    return res.status(500).json({ ok: false });
  }

  try {
    const apiClientSecure = await createApiClientSecure(req);

    const { data } = await apiClientSecure.get(
      `${API_TRENDS_MEAL}?type=${type}`,
    );

    const { totalValues, legend, mealTotals, mealsPerDay } = data || {};

    return res
      .status(200)
      .json({ totalValues, legend, mealTotals, mealsPerDay, ok: true });
  } catch (err) {
    const typedError = err as CustomAxiosError;

    return res.status(typedError.status || 500).json({
      ok: false,
      message: typedError.response?.data.message,
    });
  }
};

export default handler;
