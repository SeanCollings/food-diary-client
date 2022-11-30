import { NextApiRequest, NextApiResponse } from 'next';
import { URI_DIARY } from '@client/constants';
import { IDiaryReponseData } from '@client/interfaces/diary-data';
import axios, { AxiosError } from 'axios';
import { getSession } from 'next-auth/react';

interface IRequest extends NextApiRequest {
  query: {
    date: string;
  };
}

const handler = async (
  req: IRequest,
  res: NextApiResponse<IDiaryReponseData>
) => {
  const session = await getSession({ req });
  const { date } = req.query;
  console.log(`-------- ${URI_DIARY} :`, date);

  if (req.method !== 'GET') {
    return res.status(500).json({ ok: false });
  }

  try {
    const { data } = await axios.get(
      `${process.env.SERVER_HOST}/diary?date=${date}`,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );

    return res.status(200).json({
      ok: true,
      entry: {
        meals: data?.meals || {},
        wellness: data?.wellness || {},
      },
    });
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
