import { URI_SHARE } from '@client/constants';
import { IShareResponseBody } from '@client/interfaces/user-summary-data';
import { getInclusiveDatesBetweenDates } from '@utils/date-utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { getEntriesForDateRange } from '../summary';

interface IRequest extends NextApiRequest {
  query: { guid: string; dateFrom: string; dateTo: string };
}

const getDataFromAPI = async (
  guid: string,
  dateFrom: string,
  dateTo: string
) => {
  const datesInRange = getInclusiveDatesBetweenDates(dateFrom, dateTo);
  const entries = getEntriesForDateRange(datesInRange);

  return Promise.resolve({
    user: 'Firstname Surname',
    totalDays: datesInRange.length,
    dates: datesInRange,
    data: entries,
  });
};

const handler = async (
  req: IRequest,
  res: NextApiResponse<IShareResponseBody>
) => {
  const { guid, dateFrom, dateTo } = req.query;
  console.log(`-------- ${URI_SHARE} :`, guid, ':', dateFrom, '-', dateTo);

  if (req.method !== 'GET') {
    return;
  }

  const { user, data, dates, totalDays } = await getDataFromAPI(
    guid,
    dateFrom,
    dateTo
  );

  return res.status(200).json({ user, data, dates, totalDays });
};

export default handler;
