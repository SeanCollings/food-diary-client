import { NextApiRequest, NextApiResponse } from 'next';
import {
  IMealTrendResponseBody,
  TTimePeriod,
} from '@client/interfaces/meal-trend-data';
import { URI_MEAL_TRENDS } from '@client/constants';
import {
  getCurrentMonthAndYear,
  getDateRangeBackTillDayOfWeek,
  getMidnightISODaysInMonth,
  isDayAfter,
  sortDateArray,
} from '@utils/date-utils';
import { diaryMealsMockData } from '@client/mock';
import { EMealType } from '@utils/interfaces';

const WEEK_TOTAL_VALUES = 7;
const WEEK_LEGEND = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

interface IRequest extends NextApiRequest {
  query: { type: TTimePeriod };
}

const getMonthTrendData = async () => {
  const [month, year] = getCurrentMonthAndYear();
  const datesInMonth = getMidnightISODaysInMonth(month, year);
  const totals: { [key in EMealType]: number } = {
    breakfast: 0,
    snack_1: 0,
    lunch: 0,
    snack_2: 0,
    dinner: 0,
  };
  const monthLegend = datesInMonth.map((_, index) => `${index + 1}`);
  const data = datesInMonth.reduce((acc, date, index) => {
    if (isDayAfter(date, new Date())) {
      return acc;
    }

    const entry = diaryMealsMockData[date];

    if (entry) {
      const breakfast = !!entry.breakfast?.contents.length ? 1 : 0;
      const snack1 = !!entry.snack_1?.contents.length ? 1 : 0;
      const lunch = !!entry.lunch?.contents.length ? 1 : 0;
      const snack2 = !!entry.snack_2?.contents.length ? 1 : 0;
      const dinner = !!entry.dinner?.contents.length ? 1 : 0;

      totals.breakfast += breakfast;
      totals.snack_1 += snack1;
      totals.lunch += lunch;
      totals.snack_2 += snack2;
      totals.dinner += dinner;

      acc.push({
        id: `day_${index + 1}`,
        meals: [breakfast, snack1, lunch, snack2, dinner],
      });
    } else {
      acc.push({
        id: `day_${index + 1}`,
        meals: [0, 0, 0, 0, 0],
      });
    }

    return acc;
  }, [] as { id: string; meals: number[] }[]);

  return Promise.resolve({
    totalValues: datesInMonth.length,
    legend: monthLegend,
    totals,
    data,
  });
};
const getWeekTrendData = async () => {
  const today = new Date();
  const dateRangeFromToday = getDateRangeBackTillDayOfWeek(today, 1);
  const sortedDates = sortDateArray(dateRangeFromToday, 'asc');
  const totals: { [key in EMealType]: number } = {
    breakfast: 0,
    snack_1: 0,
    lunch: 0,
    snack_2: 0,
    dinner: 0,
  };

  const data = sortedDates.reduce((acc, date, index) => {
    const entry = diaryMealsMockData[date];

    if (entry) {
      const breakfast = !!entry.breakfast?.contents.length ? 1 : 0;
      const snack1 = !!entry.snack_1?.contents.length ? 1 : 0;
      const lunch = !!entry.lunch?.contents.length ? 1 : 0;
      const snack2 = !!entry.snack_2?.contents.length ? 1 : 0;
      const dinner = !!entry.dinner?.contents.length ? 1 : 0;

      totals.breakfast += breakfast;
      totals.snack_1 += snack1;
      totals.lunch += lunch;
      totals.snack_2 += snack2;
      totals.dinner += dinner;

      acc.push({
        id: `day_${index + 1}`,
        meals: [breakfast, snack1, lunch, snack2, dinner],
      });
    } else {
      acc.push({
        id: `day_${index + 1}`,
        meals: [0, 0, 0, 0, 0],
      });
    }

    return acc;
  }, [] as { id: string; meals: number[] }[]);

  return Promise.resolve({
    totalValues: WEEK_TOTAL_VALUES,
    legend: WEEK_LEGEND,
    totals,
    data,
  });
};

const getDataFromAPI = async (
  type: TTimePeriod
): Promise<IMealTrendResponseBody> => {
  if (type === 'week') {
    return await getWeekTrendData();
  }

  return await getMonthTrendData();
};

const handler = async (
  req: IRequest,
  res: NextApiResponse<IMealTrendResponseBody>
) => {
  const { type } = req.query;
  console.log(`-------- ${URI_MEAL_TRENDS} :`, type);

  if (req.method !== 'GET') {
    return;
  }

  const { totalValues, legend, totals, data } = await getDataFromAPI(type);

  return res.status(200).json({ totalValues, legend, totals, data });
};

export default handler;
