import {
  formatMonthNumberYear,
  getDayFromDate,
  getMidnightISODaysInMonth,
  getMonthAndYearFromDate,
  getNewMonth,
  setDateMidnightISOString,
} from '@utils/date-utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { diaryMealsMockData, diaryWellnessMockData } from '@client/mock';
import { URI_DIARY_CALENDAR_ENTRIES } from '@client/constants';
import { ICalendarEntriesResponseBody } from '@client/interfaces/diary-data';

interface IRequest extends NextApiRequest {
  query: {
    date: string;
    months: string;
  };
}

interface IEntriesPerMonth {
  [date: string]: number[];
}

const getDatesOfEntriesInDateRange = <T extends unknown>(
  dateRange: string[],
  entries: { [date: string]: T }
) => {
  const entryDates = dateRange.reduce((acc, date) => {
    if (entries[date]) {
      acc.push(getDayFromDate(date));
    }

    return acc;
  }, [] as number[]);

  return entryDates;
};

const getEntriesPerMonth = (monthRange: {
  [date: string]: boolean;
}): IEntriesPerMonth => {
  const entries = Object.keys(monthRange).reduce((acc, date) => {
    const [month, year] = getMonthAndYearFromDate(date);
    const datesInMonth = getMidnightISODaysInMonth(month, year);

    const mealEntryDays = getDatesOfEntriesInDateRange(
      datesInMonth,
      diaryMealsMockData
    );
    const wellnessEntryDays = getDatesOfEntriesInDateRange(
      datesInMonth,
      diaryWellnessMockData
    );

    const combinedEntryDays = mealEntryDays.concat(wellnessEntryDays);
    const uniqueDays = [...new Set(combinedEntryDays)];

    if (uniqueDays.length) {
      acc[formatMonthNumberYear(date)] = uniqueDays;
    }

    return acc;
  }, {} as IEntriesPerMonth);

  return entries;
};

const getPreviousMonthsRange = (date: string, months: number) => {
  let previousMonth = new Date(date);
  let monthRange = months;
  const formattedMonthRange: { [date: string]: boolean } = {
    [formatMonthNumberYear(date)]: true,
  };
  const monthRangeISO: { [date: string]: boolean } = {
    [setDateMidnightISOString(date)]: true,
  };

  while (monthRange > 1) {
    previousMonth = getNewMonth(previousMonth, 'previous');
    formattedMonthRange[formatMonthNumberYear(previousMonth)] = true;
    monthRangeISO[setDateMidnightISOString(previousMonth)] = true;
    monthRange -= 1;
  }

  return [formattedMonthRange, monthRangeISO];
};

const getDataFromAPI = async (date: string, months: string) => {
  const [monthRange, monthRangeISO] = getPreviousMonthsRange(
    date,
    parseInt(months)
  );
  const entries = getEntriesPerMonth(monthRangeISO);

  return Promise.resolve({ monthRange, entries });
};

const handler = async (
  req: IRequest,
  res: NextApiResponse<ICalendarEntriesResponseBody>
) => {
  const { date, months } = req.query;
  console.log(`-------- ${URI_DIARY_CALENDAR_ENTRIES} :`, date, months);

  if (req.method !== 'GET') {
    return;
  }

  const { monthRange, entries } = await getDataFromAPI(date, months);

  return res.status(200).json({ months: monthRange, entries });
};

export default handler;
