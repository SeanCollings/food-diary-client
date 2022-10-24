import { URI_SUMMARY } from '@client/constants';
import {
  ISummaryResponseBody,
  TMealContents,
  TMealWellnessContents,
  TWellnessContents,
} from '@client/interfaces/user-summary-data';
import { diaryMealsMockData, diaryWellnessMockData } from '@client/mock';
import { TDrink } from '@store/wellness-entries-context';
import {
  getMidnightISODaysInMonth,
  getMonthAndYearFromDate,
  getInclusiveDatesBetweenDates,
} from '@utils/date-utils';
import { IMealContent } from '@utils/interfaces';
import { NextApiRequest, NextApiResponse } from 'next';

interface IRequest extends NextApiRequest {
  query: { dateFrom: string; dateTo: string };
}

const formatMealContent = (
  mealContent: IMealContent[] | undefined
): string[] | undefined => {
  if (!mealContent) {
    return;
  }

  return mealContent.reduce((acc, content) => {
    const measurement = content.measurement ? `${content.measurement} ` : '';
    const serving = content.serving ? `${content.serving} ` : '';
    const separator = !!content.serving || !!content.measurement ? '- ' : '';
    const food = content.food;
    const description = content.description ? ` (${content.description})` : '';

    const formattedContent = `${measurement}${serving}${separator}${food}${description}`;

    acc.push(formattedContent);

    return acc;
  }, [] as string[]);
};
const formattedMealEntry = (date: string): TMealContents => {
  const mealEntry = diaryMealsMockData[date];

  if (!mealEntry) {
    return {};
  }

  return {
    breakfast: formatMealContent(mealEntry.breakfast?.contents),
    snack_1: formatMealContent(mealEntry.snack_1?.contents),
    lunch: formatMealContent(mealEntry.lunch?.contents),
    snack_2: formatMealContent(mealEntry.snack_2?.contents),
    dinner: formatMealContent(mealEntry.dinner?.contents),
  };
};
const formattedWellnessEntry = (date: string): TWellnessContents => {
  const wellnessEntry = diaryWellnessMockData[date];

  return {
    water: (wellnessEntry?.water as TDrink)?.value,
    tea_coffee: (wellnessEntry?.tea_coffee as TDrink)?.value,
    alcohol: (wellnessEntry?.alcohol as TDrink)?.value,
  };
};

// const getAllDatesFromMonthRange = (monthRange: TMonthRange) => {
//   const dates = Object.keys(monthRange).reduce((acc, date) => {
//     const [month, year] = getMonthAndYearFromDate(date);
//     let datesInMonth = getMidnightISODaysInMonth(month, year);

//     const currentMonth = isCurrentMonth(date);

//     if (currentMonth) {
//       datesInMonth = datesInMonth.reduce((acc, date) => {
//         const dateAfterToday = isDayAfter(date, new Date());

//         if (dateAfterToday) {
//           return acc;
//         }

//         acc.push(date);

//         return acc;
//       }, [] as string[]);
//     }

//     acc = [...acc, ...datesInMonth];

//     return acc;
//   }, [] as string[]);

//   return dates;
// };

const getEntriesForMonth = (date: string) => {
  const [month, year] = getMonthAndYearFromDate(date);
  const datesInMonth = getMidnightISODaysInMonth(month, year);

  const entries = datesInMonth.reduce((acc, date) => {
    if (diaryMealsMockData[date] || diaryWellnessMockData[date]) {
      acc[date] = {
        ...formattedMealEntry(date),
        ...formattedWellnessEntry(date),
      };
    }

    return acc;
  }, {} as TMealWellnessContents);

  return entries;
};
export const getEntriesForDateRange = (dateRange: string[]) => {
  const entries = dateRange.reduce((acc, date) => {
    acc = { ...acc, ...getEntriesForMonth(date) };
    return acc;
  }, {});

  return entries;
};

// const getEntriesPerMonth = (monthRange: TMonthRange) => {
//   const entries = Object.keys(monthRange).reduce((acc, date) => {
//     acc = { ...acc, ...getEntriesForMonth(date) };
//     return acc;
//   }, {});

//   return entries;
// };

// const getMonthRangeBetweenDates = (start: string, end: string) => {
//   const startDate = new Date(start);
//   const endDate = new Date(end);

//   if (endDate < startDate) {
//     return {};
//   }

//   const startYear = startDate.getFullYear();
//   const startMonth = startDate.getMonth();
//   const endYear = endDate.getFullYear();
//   const endMonth = endDate.getMonth();
//   const monthRange: TMonthRange = {};

//   for (let year = startYear; year <= endYear; year++) {
//     let monthNum = year === startYear ? startMonth : 0;
//     const monthLimit = year === endYear ? endMonth : 11;

//     for (; monthNum <= monthLimit; monthNum++) {
//       const date = new Date(year, monthNum);
//       monthRange[formatMonthNumberYear(date)] = true;
//     }
//   }

//   return monthRange;
// };

const getDataFromAPI = async (dateFrom: string, dateTo: string) => {
  const datesInRange = getInclusiveDatesBetweenDates(dateFrom, dateTo);
  const entries = getEntriesForDateRange(datesInRange);

  return Promise.resolve({ datesInRange, entries });
};

const handler = async (
  req: IRequest,
  res: NextApiResponse<ISummaryResponseBody>
) => {
  const { dateFrom, dateTo } = req.query;
  console.log(`-------- ${URI_SUMMARY} :`, dateFrom, '-', dateTo);

  if (req.method !== 'GET') {
    return;
  }

  const { datesInRange, entries } = await getDataFromAPI(dateFrom, dateTo);

  return res.status(200).json({
    data: entries,
    totalDays: datesInRange.length,
    dates: datesInRange,
  });
};

export default handler;
