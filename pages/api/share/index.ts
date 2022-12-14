import { URI_SHARE } from '@client/constants';
import { IShareResponseBody } from '@client/interfaces/user-summary-data';
import { apiClient } from '@server/api-client';
import { API_SHARE } from '@server/server.constants';
import { AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
interface IRequest extends NextApiRequest {
  query: { link: string; dateFrom: string; dateTo: string };
}

const handler = async (
  req: IRequest,
  res: NextApiResponse<IShareResponseBody>
) => {
  const { link, dateFrom, dateTo } = req.query;
  console.log(`-------- ${URI_SHARE} :`, link, ':', dateFrom, '-', dateTo);

  if (req.method !== 'GET') {
    return res.status(500).json({ ok: false });
  }

  try {
    const { data } = await apiClient.get(
      `${API_SHARE}?link=${link}&dateFrom=${dateFrom}&dateTo=${dateTo}`
    );

    return res.status(200).json({
      ok: true,
      summary: data,
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
