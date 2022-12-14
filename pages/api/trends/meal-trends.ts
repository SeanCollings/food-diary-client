import { NextApiRequest, NextApiResponse } from 'next';
import {
  IMealTrendResponseBody,
  TTimePeriod,
} from '@client/interfaces/meal-trend-data';
import { URI_MEAL_TRENDS } from '@client/constants';
import { AxiosError } from 'axios';
import { createApiClientSecure } from '@server/api-client';
import { API_TRENDS_MEAL } from '@server/server.constants';

interface IRequest extends NextApiRequest {
  query: { type: TTimePeriod };
}

const handler = async (
  req: IRequest,
  res: NextApiResponse<IMealTrendResponseBody>
) => {
  const { type } = req.query;
  console.log(`-------- ${URI_MEAL_TRENDS} :`, type);

  if (req.method !== 'GET') {
    return res.status(500).json({ ok: false });
  }

  try {
    const apiClientSecure = await createApiClientSecure(req);

    const { data } = await apiClientSecure.get(
      `${API_TRENDS_MEAL}?type=${type}`
    );

    const { totalValues, legend, mealTotals, mealsPerDay } = data;

    return res
      .status(200)
      .json({ totalValues, legend, mealTotals, mealsPerDay });
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
