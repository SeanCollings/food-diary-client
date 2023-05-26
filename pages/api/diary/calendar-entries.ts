import { NextApiRequest, NextApiResponse } from 'next';
import { ICalendarEntriesResponseBody } from '@client/interfaces/diary-data';
import { createApiClientSecure } from '@server/api-client';
import { API_DIARY_CALENDAR_ENTRIES } from '@server/server.constants';
import { CustomAxiosError } from '@client/interfaces/axios.types';

interface IRequest extends NextApiRequest {
  query: {
    date: string;
    months: string;
  };
}

const handler = async (
  req: IRequest,
  res: NextApiResponse<ICalendarEntriesResponseBody>,
) => {
  const { date, months } = req.query;

  if (req.method !== 'GET') {
    return res.status(500).json({ ok: false });
  }

  try {
    const apiClientSecure = await createApiClientSecure(req);

    const { data } = await apiClientSecure.get(
      `${API_DIARY_CALENDAR_ENTRIES}?date=${date}&months=${months}`,
    );

    const { monthRange, entries } = data || {};

    return res.status(200).json({ ok: true, months: monthRange, entries });
  } catch (err) {
    const typedError = err as CustomAxiosError;

    return res.status(typedError.status || 500).json({
      ok: false,
      message: typedError.response?.data.message,
    });
  }
};

export default handler;
