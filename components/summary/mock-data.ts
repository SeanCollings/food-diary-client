import {
  getDaysAwayFromDate,
  setDateMidnightISOString,
} from '@utils/date-utils';
import { EMealType, EWellnessTypes } from '@utils/interfaces';

const DATE_1 = setDateMidnightISOString(getDaysAwayFromDate(-6));
const DATE_2 = setDateMidnightISOString(getDaysAwayFromDate(-5));
const DATE_3 = setDateMidnightISOString(getDaysAwayFromDate(-4));
const DATE_4 = setDateMidnightISOString(getDaysAwayFromDate(-3));
const DATE_5 = setDateMidnightISOString(getDaysAwayFromDate(-2));
const DATE_6 = setDateMidnightISOString(getDaysAwayFromDate(-1));
const DATE_7 = setDateMidnightISOString(getDaysAwayFromDate(0));

type TMealContents = { [key in EMealType]: string[] };
type TWellnessContents = { [key in EWellnessTypes]: number };

export interface IUserData {
  user: string;
  totalDays: number;
  dates: string[];
  data: {
    [key: string]: TMealContents & TWellnessContents;
  };
}

export const MOCK_USER_DATA: IUserData = {
  user: 'Firstname Lastname',
  totalDays: 27,
  dates: [
    DATE_1,
    DATE_2,
    DATE_3,
    DATE_4,
    DATE_5,
    DATE_6,
    DATE_7,
    DATE_1,
    DATE_2,
    DATE_3,
    DATE_4,
    DATE_5,
    DATE_6,
    DATE_7,
    DATE_1,
    DATE_2,
    DATE_3,
    DATE_1,
    DATE_2,
    DATE_3,
    DATE_4,
    DATE_5,
    DATE_6,
    DATE_7,
    DATE_1,
    DATE_2,
    DATE_3,
    DATE_4,
    DATE_5,
    DATE_6,
    DATE_7,
    DATE_1,
    DATE_2,
    DATE_3,
    DATE_1,
    DATE_2,
    DATE_3,
    DATE_4,
    DATE_5,
    DATE_6,
    DATE_7,
    DATE_1,
    DATE_2,
    DATE_3,
    DATE_4,
    DATE_5,
    DATE_6,
    DATE_7,
    DATE_1,
    DATE_2,
    DATE_3,
    DATE_1,
    DATE_2,
    DATE_3,
    DATE_4,
    DATE_5,
    DATE_6,
    DATE_7,
    DATE_1,
    DATE_2,
    DATE_3,
    DATE_4,
    DATE_5,
    DATE_6,
    DATE_7,
    DATE_1,
    DATE_2,
    DATE_3,
    DATE_1,
    DATE_2,
    DATE_3,
    DATE_4,
    DATE_5,
    DATE_6,
    DATE_7,
    DATE_1,
    DATE_2,
    DATE_3,
    DATE_4,
    DATE_5,
    DATE_6,
    DATE_7,
    DATE_1,
    DATE_2,
    DATE_3,
  ],
  data: {
    [DATE_1]: {
      breakfast: [
        '1 ½ cup - Simple Truth muesli (With chocolate and mini marshmellows)',
        '1 1 serving - milk for cereal',
        '1 1 serving - milk with espresso coffee',
        '1 1 carrot ',
      ],
      snack_1: ['1 snack 1'],
      lunch: [
        '1 ½ cup - Simple Truth muesli (With chocolate and mini marshmellows taste)',
        '1 1 serving - milk for cereal',
        '1 0.5 plate - Asian styled salad (Stir fry veg, chicken strips, rice, Asian sesame stir-fry sauce)',
      ],
      snack_2: ['1 snack 2'],
      dinner: [
        '1 1 serving - milk with espresso coffee',
        '1 1 banana',
        '1 1 carrot',
        '1 3 streaky bacon',
        '1 1 sushi platter',
        '1 ice cream - dessert',
        '1 14 grapes',
        '1 1 avocado',
      ],
      water: 14,
      tea_coffee: 12,
      alcohol: 11,
    },
    [DATE_2]: {
      breakfast: [
        '½ cup - Simple Truth muesli (With chocolate and mini marshmellows)',
        '2 carrots ',
      ],
      snack_1: [],
      lunch: [],
      snack_2: [],
      dinner: [
        '1 serving - milk with espresso coffee',
        '1 banana',
        '14 grapes',
        '1 avocado',
      ],
      water: 4,
      tea_coffee: 2,
      alcohol: 0,
    },
    [DATE_3]: {
      breakfast: [
        '½ cup - Simple Truth muesli (With chocolate and mini marshmellows)',
        '1 serving - milk for cereal',
      ],
      snack_1: [],
      lunch: ['1 serving - milk for cereal'],
      snack_2: ['1 banana'],
      dinner: ['14 grapes', '1 avocado'],
      water: 2,
      tea_coffee: 0,
      alcohol: 0,
    },
    [DATE_4]: {
      breakfast: [
        '½ cup - Simple Truth muesli (With chocolate and mini marshmellows)',
      ],
      snack_1: [],
      lunch: [
        '½ cup - Simple Truth muesli (With chocolate and mini marshmellows taste)',
      ],
      snack_2: [],
      dinner: ['1 serving - milk with espresso coffee'],
      water: 4,
      tea_coffee: 4,
      alcohol: 1,
    },
    [DATE_5]: {
      breakfast: [
        '1 - slice Quinoa bread',
        '2tsp peanut butter',
        'cup of fat free milk',
      ],
      snack_1: ['Banana'],
      lunch: [
        '1 - Wrap',
        'Cucumber',
        'Mozzarella',
        '½ chicken breast',
        'tsp sweet chilli',
      ],
      snack_2: ['5 - skinny almonds'],
      dinner: [
        '½ plate of rocket & cucumber salad',
        '1 cup of spaghetti carbonara',
      ],
      water: 1,
      tea_coffee: 2,
      alcohol: 0,
    },
    [DATE_6]: {
      breakfast: [],
      snack_1: ['Banana'],
      lunch: [
        '1 - Wrap',
        'Cucumber',
        'Mozzarella',
        '½ chicken breast',
        'tsp sweet chilli',
      ],
      snack_2: ['5 - skinny almonds'],
      dinner: [],
      water: 4,
      tea_coffee: 1,
      alcohol: 0,
    },
    [DATE_7]: {
      breakfast: [
        '½ cup - Simple Truth muesli (With chocolate and mini marshmellows)',
        '1 serving - milk for cereal',
        '1 serving - milk with espresso coffee',
        '1 carrot ',
      ],
      snack_1: [],
      lunch: [
        '½ cup - Simple Truth muesli (With chocolate and mini marshmellows taste)',
        '1 serving - milk for cereal',
        '0.5 plate - Asian styled salad (Stir fry veg, chicken strips, rice, Asian sesame stir-fry sauce)',
      ],
      snack_2: ['1 banana'],
      dinner: ['1 serving - milk with espresso coffee'],
      water: 5,
      tea_coffee: 0,
      alcohol: 6,
    },
  },
};
