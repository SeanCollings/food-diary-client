import { URI_EXCERCISE_TRENDS } from '@client/constants';
import { TTimePeriod } from '@client/interfaces/meal-trend-data';
import { IExcerciseTrendData } from '@client/interfaces/wellness-trend-data';
import { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosError } from 'axios';
import { getSession } from 'next-auth/react';

interface IRequest extends NextApiRequest {
  query: { type: TTimePeriod };
}

const handler = async (
  req: IRequest,
  res: NextApiResponse<IExcerciseTrendData>
) => {
  const session = await getSession({ req });
  const { type } = req.query;
  console.log(`-------- ${URI_EXCERCISE_TRENDS} :`);

  if (req.method !== 'GET') {
    return;
  }

  try {
    const { data } = await axios.get(
      `${process.env.SERVER_HOST}/trends/excercise-trends?type=${type}`,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
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
