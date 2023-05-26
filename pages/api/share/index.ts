import { CustomAxiosError } from '@client/interfaces/axios.types';
import { IShareResponseBody } from '@client/interfaces/user-summary-data';
import { apiClient } from '@server/api-client';
import { API_SHARE } from '@server/server.constants';
import { NextApiRequest, NextApiResponse } from 'next';
interface IRequest extends NextApiRequest {
  query: { link: string; dateFrom: string; dateTo: string };
}

const handler = async (
  req: IRequest,
  res: NextApiResponse<IShareResponseBody>,
) => {
  const { link, dateFrom, dateTo } = req.query;

  if (req.method !== 'GET') {
    return res.status(500).json({ ok: false });
  }

  try {
    const { data } = await apiClient.get(
      `${API_SHARE}?link=${link}&dateFrom=${dateFrom}&dateTo=${dateTo}`,
    );

    return res.status(200).json({
      ok: true,
      summary: data,
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
