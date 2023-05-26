import { CustomAxiosError } from '@client/interfaces/axios.types';
import { ISummaryResponseBody } from '@client/interfaces/user-summary-data';
import { createApiClientSecure } from '@server/api-client';
import { API_SUMMARY } from '@server/server.constants';
import { NextApiRequest, NextApiResponse } from 'next';

interface IRequest extends NextApiRequest {
  query: { dateFrom: string; dateTo: string };
}

const handler = async (
  req: IRequest,
  res: NextApiResponse<ISummaryResponseBody>,
) => {
  const { dateFrom, dateTo } = req.query;

  if (req.method !== 'GET') {
    return res.status(500).json({ ok: false });
  }

  try {
    const apiClientSecure = await createApiClientSecure(req);

    const { data } = await apiClientSecure.get(
      `${API_SUMMARY}?dateFrom=${dateFrom}&dateTo=${dateTo}`,
    );

    return res.status(200).json({
      ok: true,
      data,
    });
  } catch (err) {
    const typedError = err as CustomAxiosError;

    return res.status(typedError.status || 500).json({
      ok: false,
      message: typedError.response?.data.message,
    });
  }
};

export default handler;
