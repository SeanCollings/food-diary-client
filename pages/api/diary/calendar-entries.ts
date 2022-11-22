import { NextApiRequest, NextApiResponse } from 'next';
import { URI_DIARY_CALENDAR_ENTRIES } from '@client/constants';
import { ICalendarEntriesResponseBody } from '@client/interfaces/diary-data';
import axios, { AxiosError } from 'axios';
import { getSession } from 'next-auth/react';

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
  const session = await getSession({ req });
  const { date, months } = req.query;
  console.log(`-------- ${URI_DIARY_CALENDAR_ENTRIES} :`, date, months);

  if (req.method !== 'GET') {
    return res.status(500).json({ ok: false });
  }

  try {
    const { data } = await axios.get(
      `${process.env.SERVER_HOST}/diary/calendar-entries?date=${date}&months=${months}`,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );

    const { monthRange, entries } = data;

    return res.status(200).json({ ok: true, months: monthRange, entries });
  } catch (err) {
    console.log('ERR::', (err as AxiosError).message);
    return res
      .status(401)
      .json({ ok: false, message: (err as AxiosError).message });
  }
};

export default handler;
