import { URI_EXCERCISE_TRENDS } from '@client/constants';
import { TTimePeriod } from '@client/interfaces/meal-trend-data';
import { IExcerciseTrendData } from '@client/interfaces/wellness-trend-data';
import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosError } from 'axios';
import { createApiClientSecure } from '@server/api-client';
import { API_TRENDS_EXCERCISE } from '@server/server.constants';

interface IRequest extends NextApiRequest {
  query: { type: TTimePeriod };
}

const handler = async (
  req: IRequest,
  res: NextApiResponse<IExcerciseTrendData>
) => {
  const { type } = req.query;
  console.log(`-------- ${URI_EXCERCISE_TRENDS} :`);

  if (req.method !== 'GET') {
    return;
  }

  try {
    const apiClientSecure = await createApiClientSecure(req);

    const { data } = await apiClientSecure.get(
      `${API_TRENDS_EXCERCISE}?type=${type}`
    );

    const { highestValue, legend, excercisePerDay } = data;

    return res.status(200).json({ highestValue, legend, excercisePerDay });
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
