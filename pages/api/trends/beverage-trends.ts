import { URI_BEVERAGE_TRENDS } from '@client/constants';
import { TTimePeriod } from '@client/interfaces/meal-trend-data';
import { IBeverageTrendData } from '@client/interfaces/wellness-trend-data';
import axios, { AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

interface IRequest extends NextApiRequest {
  query: { type: TTimePeriod };
}

const handler = async (
  req: IRequest,
  res: NextApiResponse<IBeverageTrendData>
) => {
  const session = await getSession({ req });
  const { type } = req.query;
  console.log(`-------- ${URI_BEVERAGE_TRENDS} :`);

  if (req.method !== 'GET') {
    return res.status(500).json({ ok: false });
  }

  try {
    const { data } = await axios.get(
      `${process.env.SERVER_HOST}/trends/beverage-trends?type=${type}`,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );

    const { highestValue, legend, beveragesPerDay } = data;

    return res.status(200).json({ highestValue, legend, beveragesPerDay });
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
