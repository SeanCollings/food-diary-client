import {
  TWellnessEntry,
  TWellnessValueTypes,
} from '@lib/interfaces/wellness.interface';
import {
  getDaysAwayFromDate,
  setDateMidnightISOString,
} from '@utils/date-utils';

const TEMP_DAY_DATA_1: TWellnessEntry<TWellnessValueTypes> = {
  water: { value: 3 },
  alcohol: { value: 2 },
  tea_coffee: { value: 6 },
  excercise: {
    time: '01:25',
    details: 'weights and rowing',
  },
};
const TEMP_DAY_DATA_2: TWellnessEntry<TWellnessValueTypes> = {
  water: { value: 5 },
  excercise: {
    time: '00:30',
    details: 'treadmill running',
  },
};
const TEMP_DAY_DATA_3: TWellnessEntry<TWellnessValueTypes> = {
  water: { value: 6 },
  excercise: {
    time: '30:00',
    details: '5km run around the canals',
  },
};
const TEMP_DAY_DATA_4: TWellnessEntry<TWellnessValueTypes> = {
  water: { value: 12 },
  tea_coffee: { value: 10 },
  alcohol: { value: 0 },
  excercise: {
    time: '11:45',
  },
};
const TEMP_DAY_DATA_5: TWellnessEntry<TWellnessValueTypes> = {
  water: { value: 3 },
  tea_coffee: { value: 10 },
  alcohol: { value: 2 },
  excercise: {
    time: '01:45',
  },
};

export const diaryWellnessMockData: {
  [date: string]: TWellnessEntry<TWellnessValueTypes>;
} = {
  '2022-04-10T22:00:00.000Z': TEMP_DAY_DATA_4,
  '2022-08-19T22:00:00.000Z': TEMP_DAY_DATA_1,
  '2022-08-18T22:00:00.000Z': TEMP_DAY_DATA_2,
  '2022-08-17T22:00:00.000Z': TEMP_DAY_DATA_3,
  '2022-10-11T22:00:00.000Z': TEMP_DAY_DATA_3,
  '2022-10-17T22:00:00.000Z': TEMP_DAY_DATA_2,
  '2022-10-18T22:00:00.000Z': TEMP_DAY_DATA_3,
  '2022-10-19T22:00:00.000Z': TEMP_DAY_DATA_4,
  '2022-10-24T22:00:00.000Z': TEMP_DAY_DATA_5,
  [setDateMidnightISOString(getDaysAwayFromDate(0))]: TEMP_DAY_DATA_3,
};
