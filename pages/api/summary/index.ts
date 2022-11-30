import { URI_SUMMARY } from '@client/constants';
import { ISummaryResponseBody } from '@client/interfaces/user-summary-data';
import axios, { AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

interface IRequest extends NextApiRequest {
  query: { dateFrom: string; dateTo: string };
}

const handler = async (
  req: IRequest,
  res: NextApiResponse<ISummaryResponseBody>
) => {
  const session = await getSession({ req });
  const { dateFrom, dateTo } = req.query;
  console.log(`-------- ${URI_SUMMARY} :`, dateFrom, '-', dateTo);

  if (req.method !== 'GET') {
    return res.status(500).json({ ok: false });
  }

  try {
    const { data } = await axios.get(
      `${process.env.SERVER_HOST}/summary/?dateFrom=${dateFrom}&dateTo=${dateTo}`,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );

    return res.status(200).json({
      ok: true,
      data,
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
