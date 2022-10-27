import { URI_BEVERAGE_TRENDS } from '@client/constants';
import { TTimePeriod } from '@client/interfaces/meal-trend-data';
import { IBeverageTrendData } from '@client/interfaces/wellness-trend-data';
import { diaryWellnessMockData } from '@client/mock';
import { TDrink } from '@lib/interfaces/wellness.interface';
import {
  getDateRangeBackTillDayOfWeek,
  setDateMidnightISOString,
  sortDateArray,
} from '@utils/date-utils';
import { EWellnessTypes } from '@utils/interfaces';
import { NextApiRequest, NextApiResponse } from 'next';

const WEEK_LEGEND = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

interface IRequest extends NextApiRequest {
  query: { type: TTimePeriod };
}

const getHighestValue = () => {};

const getWeekTrendData = async (): Promise<IBeverageTrendData> => {
  const today = setDateMidnightISOString(new Date());
  const dateRangeFromToday = getDateRangeBackTillDayOfWeek(today, 1);
  const sortedDates = sortDateArray(dateRangeFromToday, 'asc');
  const defaultDay: { [key in EWellnessTypes]: number } = {
    water: 0,
    tea_coffee: 0,
    alcohol: 0,
  };

  let highestValue = 0;

  const data = sortedDates.reduce((acc, date, index) => {
    const entry = diaryWellnessMockData[date];

    if (entry) {
      const water = (entry.water as TDrink)?.value ?? 0;
      const tea_coffee = (entry.tea_coffee as TDrink)?.value ?? 0;
      const alcohol = (entry.alcohol as TDrink)?.value ?? 0;
      const highestValueInEntry = Math.max(...[water, tea_coffee, alcohol]);

      if (highestValueInEntry > highestValue) {
        highestValue = highestValueInEntry;
      }

      acc.push({
        water,
        tea_coffee,
        alcohol,
      });
    } else {
      acc.push(defaultDay);
    }

    return acc;
  }, [] as { [key in EWellnessTypes]: number }[]);

  return { data, highestValue, legend: WEEK_LEGEND };
};
const getDataFromAPI = async (): Promise<IBeverageTrendData> => {
  return await getWeekTrendData();
};

const handler = async (
  req: IRequest,
  res: NextApiResponse<IBeverageTrendData>
) => {
  console.log(`-------- ${URI_BEVERAGE_TRENDS} :`);

  if (req.method !== 'GET') {
    return;
  }

  const { highestValue, legend, data } = await getDataFromAPI();

  return res.status(200).json({ data, highestValue, legend });
};

export default handler;
