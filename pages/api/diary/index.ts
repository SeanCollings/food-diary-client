import { diaryMealsMockData, diaryWellnessMockData } from '@client/mock';
import {
  TWellnessEntry,
  TWellnessValueTypes,
} from '@lib/interfaces/wellness.interface';
import { TMealCard } from '@utils/interfaces';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  getMidnightISODaysInMonth,
  getMonthAndYearFromDate,
} from '@utils/date-utils';
import { URI_DIARY } from '@client/constants';
import { IDiaryReponseData } from '@client/interfaces/diary-data';

interface IRequest extends NextApiRequest {
  query: {
    date: string;
  };
}

export const getMealEntriesForMonth = (date: string) => {
  const [month, year] = getMonthAndYearFromDate(date);
  const datesInMonth = getMidnightISODaysInMonth(month, year);

  const mealsEntries = datesInMonth.reduce((acc, date) => {
    if (diaryMealsMockData[date]) {
      acc[date] = diaryMealsMockData[date];
    }

    return acc;
  }, {} as { [date: string]: TMealCard });

  return mealsEntries;
};
export const getWellessEntriesForMonth = (date: string) => {
  const [month, year] = getMonthAndYearFromDate(date);
  const datesInMonth = getMidnightISODaysInMonth(month, year);

  const wellnessEntries = datesInMonth.reduce((acc, date) => {
    if (diaryWellnessMockData[date]) {
      acc[date] = diaryWellnessMockData[date];
    }

    return acc;
  }, {} as { [date: string]: TWellnessEntry<TWellnessValueTypes> });

  return wellnessEntries;
};

const getDataFromAPI = async (date: string) => {
  const meals = getMealEntriesForMonth(date);
  const wellness = getWellessEntriesForMonth(date);

  return Promise.resolve({
    meals,
    wellness,
  });
};

const handler = async (
  req: IRequest,
  res: NextApiResponse<IDiaryReponseData>
) => {
  const { date } = req.query;
  console.log(`-------- ${URI_DIARY} :`, date);

  if (req.method !== 'GET') {
    return;
  }

  const { meals, wellness } = await getDataFromAPI(date);

  return res.status(200).json({
    entry: {
      date,
      meals,
      wellness,
    },
  });
};

export default handler;
