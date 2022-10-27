import { URI_EXCERCISE_TRENDS } from '@client/constants';
import { TTimePeriod } from '@client/interfaces/meal-trend-data';
import { IExcerciseTrendData } from '@client/interfaces/wellness-trend-data';
import { diaryWellnessMockData } from '@client/mock';
import { TExcercise } from '@lib/interfaces/wellness.interface';
import {
  getDateRangeBackTillDayOfWeek,
  setDateMidnightISOString,
  sortDateArray,
} from '@utils/date-utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSplitTime } from '@utils/time-utils';

const WEEK_LEGEND = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

interface IRequest extends NextApiRequest {
  query: { type: TTimePeriod };
}

const getTimeInMinutes = (time: string) => {
  const [hours, minutes] = getSplitTime(time);
  const timeInMinutes = Number(hours) * 60 + Number(minutes);

  return timeInMinutes;
};

const getWeekTrendData = async (): Promise<IExcerciseTrendData> => {
  const today = setDateMidnightISOString(new Date());
  const dateRangeFromToday = getDateRangeBackTillDayOfWeek(today, 1);
  const sortedDates = sortDateArray(dateRangeFromToday, 'asc');

  let highestValue = 0;

  const data = sortedDates.reduce((acc, date) => {
    const entry = diaryWellnessMockData[date];

    console.log(date, !!entry);

    if (entry) {
      const excerciseTime = (entry.excercise as TExcercise).time || '';
      const time = getTimeInMinutes(excerciseTime);

      if (time > highestValue) {
        highestValue = time;
      }

      acc.push(time);
    } else {
      acc.push(0);
    }

    return acc;
  }, [] as number[]);

  return { data, highestValue, legend: WEEK_LEGEND };
};
const getDataFromAPI = async (): Promise<IExcerciseTrendData> => {
  return await getWeekTrendData();
};

const handler = async (
  req: IRequest,
  res: NextApiResponse<IExcerciseTrendData>
) => {
  console.log(`-------- ${URI_EXCERCISE_TRENDS} :`);

  if (req.method !== 'GET') {
    return;
  }

  const { highestValue, legend, data } = await getDataFromAPI();

  return res.status(200).json({ data, highestValue, legend });
};

export default handler;
