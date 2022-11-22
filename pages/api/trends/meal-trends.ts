import { NextApiRequest, NextApiResponse } from 'next';
import {
  IMealTrendResponseBody,
  TTimePeriod,
} from '@client/interfaces/meal-trend-data';
import { URI_MEAL_TRENDS } from '@client/constants';
import { getSession } from 'next-auth/react';
import axios, { AxiosError } from 'axios';

interface IRequest extends NextApiRequest {
  query: { type: TTimePeriod };
}

const handler = async (
  req: IRequest,
  res: NextApiResponse<IMealTrendResponseBody>
) => {
  const session = await getSession({ req });
  const { type } = req.query;
  console.log(`-------- ${URI_MEAL_TRENDS} :`, type);

  if (req.method !== 'GET') {
    return res.status(500).json({ ok: false });
  }

  try {
    const { data } = await axios.get(
      `${process.env.SERVER_HOST}/trends/meal-trends?type=${type}`,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
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
