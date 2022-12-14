import { NextApiRequest, NextApiResponse } from 'next';
import { URI_DIARY_CALENDAR_ENTRIES } from '@client/constants';
import { ICalendarEntriesResponseBody } from '@client/interfaces/diary-data';
import { AxiosError } from 'axios';
import { createApiClientSecure } from '@server/api-client';
import { API_DIARY_CALENDAR_ENTRIES } from '@server/server.constants';

interface IRequest extends NextApiRequest {
  query: {
    date: string;
    months: string;
  };
}

const handler = async (
  req: IRequest,
  res: NextApiResponse<ICalendarEntriesResponseBody>
) => {
  const { date, months } = req.query;
  console.log(`-------- ${URI_DIARY_CALENDAR_ENTRIES} :`, date, months);

  if (req.method !== 'GET') {
    return res.status(500).json({ ok: false });
  }

  try {
    const apiClientSecure = await createApiClientSecure(req);

    const { data } = await apiClientSecure.get(
      `${API_DIARY_CALENDAR_ENTRIES}?date=${date}&months=${months}`
    );

    const { monthRange, entries } = data;

    return res.status(200).json({ ok: true, months: monthRange, entries });
  } catch (err) {
    return res.status(401).json({
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
