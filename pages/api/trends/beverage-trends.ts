import { URI_BEVERAGE_TRENDS } from '@client/constants';
import { TTimePeriod } from '@client/interfaces/meal-trend-data';
import { IBeverageTrendData } from '@client/interfaces/wellness-trend-data';
import { createApiClientSecure } from '@server/api-client';
import { API_TRENDS_BEVERAGE } from '@server/server.constants';
import { AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

interface IRequest extends NextApiRequest {
  query: { type: TTimePeriod };
}

const handler = async (
  req: IRequest,
  res: NextApiResponse<IBeverageTrendData>
) => {
  const { type } = req.query;
  console.log(`-------- ${URI_BEVERAGE_TRENDS} :`);

  if (req.method !== 'GET') {
    return res.status(500).json({ ok: false });
  }

  try {
    const apiClientSecure = await createApiClientSecure(req);

    const { data } = await apiClientSecure.get(
      `${API_TRENDS_BEVERAGE}?type=${type}`
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
