import {
  IDiaryEntry,
  IExerciseDetails,
  IMealContent,
  IMealTypeContent,
  TMealCard,
  TMealType,
  TWellnessTypes,
} from '@utils/interfaces';
import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

const TEMP_DAY_DATA: TMealCard = {
  breakfast: {
    contents: [
      {
        emoji: { name: 'Bowl with Spoon', nativeSkin: '🥣' },
        serving: '½',
        measurement: 'cup',
        food: 'Simple Truth muesli',
        description: 'With chocolate and mini marshmellows',
      },
      {
        emoji: { name: 'Glass of Milk', nativeSkin: '🥛' },
        serving: '1',
        measurement: 'serving',
        food: 'milk for cereal',
      },
      {
        emoji: { name: 'Hot Beverage', nativeSkin: '☕️' },
        serving: '1',
        measurement: 'serving',
        food: 'milk with espresso coffee',
      },
      {
        emoji: { name: 'Carrot', nativeSkin: '🥕' },
        serving: '1',
        food: 'carrot',
      },
    ],
  },
  lunch: {
    contents: [
      {
        emoji: { name: 'Bowl with Spoon', nativeSkin: '🥣' },
        serving: '½',
        measurement: 'cup',
        food: 'Simple Truth muesli',
        description: 'With chocolate and mini marshmellows',
      },
      {
        emoji: { name: 'Glass of Milk', nativeSkin: '🥛' },
        serving: '1',
        measurement: 'serving',
        food: 'milk for cereal',
      },
      {
        emoji: { name: 'Green Salad', nativeSkin: '🥗' },
        serving: '0.5',
        measurement: 'plate',
        food: 'Asian styled salad',
        description:
          'Stir fry veg, chicken strips, rice, Asian sesame stir-fry sauce',
      },
    ],
  },
  snack_2: {
    contents: [
      {
        emoji: { name: 'Banana', nativeSkin: '🍌' },
        serving: '1',
        food: 'banana',
      },
    ],
  },
  dinner: {
    contents: [
      {
        serving: '1',
        measurement: 'serving',
        food: 'milk with espresso coffee',
      },
      {
        emoji: { name: 'Banana', nativeSkin: '🍌' },
        serving: '1',
        food: 'banana',
      },
      {
        emoji: { name: 'Carrot', nativeSkin: '🥕' },
        serving: '1',
        food: 'carrot',
      },
      {
        emoji: { name: 'Carrot', nativeSkin: '🥓' },
        serving: '3',
        food: 'streaky bacon',
      },
      {
        emoji: { name: 'Sushi', nativeSkin: '🍣' },
        serving: '1',
        food: 'sushi platter',
      },
      {
        emoji: { name: 'Soft Ice Cream', nativeSkin: '🍦' },
        food: 'ice cream - dessert',
      },
      {
        emoji: { name: 'Wine Glass', nativeSkin: '🍷' },
        serving: '3',
        food: 'glasses wine',
      },
      {
        emoji: { name: 'Grapes', nativeSkin: '🍇' },
        serving: '14',
        food: 'grapes',
      },
      {
        emoji: { name: 'Avocado', nativeSkin: '🥑' },
        serving: '1',
        food: 'avocado',
      },
    ],
  },
};
const TEMP_DAY_DATA_2: TMealCard = {
  breakfast: {
    contents: [],
  },
  snack_1: {
    contents: [],
  },
  lunch: {
    contents: [
      {
        emoji: { name: 'Poultry Leg', nativeSkin: '🍗' },
        serving: '4',
        measurement: '',
        food: 'Chicken',
        description: 'with blue cheese sauce',
      },
    ],
  },
  snack_2: {
    contents: [
      {
        emoji: { name: 'Chocolate Bar', nativeSkin: '🍫' },
        serving: '1',
        food: 'protein bar',
        description: 'USN',
      },
      {
        emoji: { name: 'Strawberry', nativeSkin: '🍓' },
        serving: '1',
        food: 'protein shake',
        description: 'USN',
      },
      {
        emoji: { name: 'Peanuts', nativeSkin: '🥜' },
        serving: '2',
        measurement: 'tablespoons',
        food: 'peanut butter',
      },
    ],
  },
  dinner: {
    contents: [
      {
        emoji: { name: 'Pizza', nativeSkin: '🍕' },
        serving: '1',
        measurement: '',
        food: 'pizza',
        description: 'stuffed crust',
      },
    ],
  },
};

interface IDiaryEntries {
  [date: string]: IDiaryEntry;
}
interface IUpdateMealProps {
  date: string;
  mealId: TMealType;
  newValues: IMealContent;
}
interface IUpdateWellnessProps {
  date: string;
  id: TWellnessTypes;
  value: number;
}
interface IUpdateExerciseProps {
  date: string;
  excerciseDetails: IExerciseDetails;
}

export interface IDiaryEntriesContext {
  diaryEntries: IDiaryEntries;
  setAllDiaryEntries: (diaryEntries: IDiaryEntries) => void;
  updateMealEntry: ({ date, mealId, newValues }: IUpdateMealProps) => void;
  updateWellnessEntry: ({ date, id, value }: IUpdateWellnessProps) => void;
  updateExerciseEntry: ({
    date,
    excerciseDetails,
  }: IUpdateExerciseProps) => void;
}

const initialState: IDiaryEntriesContext = {
  diaryEntries: {
    '2022-08-19T22:00:00.000Z': {
      meals: TEMP_DAY_DATA,
      alcohol: { value: 2 },
      tea_coffee: { value: 6 },
      water: { value: 3 },
      excercise: {
        time: '01:25',
        details: 'weights and rowing',
      },
    },
    '2022-08-18T22:00:00.000Z': {
      meals: TEMP_DAY_DATA_2,
      water: { value: 5 },
      excercise: { time: '00:30', details: 'treadmill running' },
    },
    '2022-08-17T22:00:00.000Z': {
      water: { value: 2 },
      excercise: { time: '01:12' },
      meals: {
        breakfast: {
          contents: [
            { food: 'cake', emoji: { nativeSkin: '🍰', name: 'Cake' } },
          ],
        },
      },
    },
    '2022-08-16T22:00:00.000Z': {
      meals: {},
      excercise: {},
    },
  },
  setAllDiaryEntries: () => null,
  updateMealEntry: () => null,
  updateWellnessEntry: () => null,
  updateExerciseEntry: () => null,
};

const getUpdatedEntries = (date: string, diaryEntries: IDiaryEntries) => {
  const updatedEntries = { ...diaryEntries };

  if (!updatedEntries[date]) {
    updatedEntries[date] = emptyDiaryEntry;
  }

  return updatedEntries as IDiaryEntries;
};

const DiaryEntriesContext = createContext(initialState);

const emptyDiaryEntry: IDiaryEntry = {
  meals: {},
  excercise: {},
  water: {},
  alcohol: {},
  tea_coffee: {},
};

export const DiaryEntriesContextProvider: FC<{
  children: ReactNode;
  initialState?: IDiaryEntriesContext;
}> = ({ children }) => {
  const [diaryEntries, setDiaryEntries] = useState<IDiaryEntries>(
    initialState?.diaryEntries || {}
  );
  const [allEntryDays, setAllEntryDays] = useState([]);

  const setAllDiaryEntries = useCallback((diaryEntries: IDiaryEntries) => {
    setDiaryEntries(diaryEntries);
  }, []);

  const updateMealEntry = useCallback(
    ({ date, mealId, newValues }: IUpdateMealProps) => {
      const updatedEntries = getUpdatedEntries(date, diaryEntries);

      const updatedContentsForId: IMealContent[] = [
        ...(updatedEntries[date].meals[mealId]?.contents || []),
        newValues,
      ];
      const updateMealTypeContent: IMealTypeContent = {
        contents: updatedContentsForId,
      };

      if (!updatedEntries[date].meals[mealId]) {
        updatedEntries[date].meals[mealId] = { contents: [] };
      }

      updatedEntries[date].meals[mealId] = updateMealTypeContent;

      setDiaryEntries(updatedEntries);
    },
    [diaryEntries]
  );

  const updateWellnessEntry = useCallback(
    ({ date, id, value }: IUpdateWellnessProps) => {
      const updatedEntries = getUpdatedEntries(date, diaryEntries);
      updatedEntries[date][id] = { value };

      setDiaryEntries(updatedEntries);
    },
    [diaryEntries]
  );

  const updateExerciseEntry = useCallback(
    ({ date, excerciseDetails }: IUpdateExerciseProps) => {
      const updatedEntries = getUpdatedEntries(date, diaryEntries);
      updatedEntries[date].excercise = excerciseDetails;

      setDiaryEntries(updatedEntries);
    },
    [diaryEntries]
  );

  const context = useMemo(
    () => ({
      diaryEntries,
      setAllDiaryEntries,
      updateMealEntry,
      updateWellnessEntry,
      updateExerciseEntry,
    }),
    [
      diaryEntries,
      setAllDiaryEntries,
      updateMealEntry,
      updateWellnessEntry,
      updateExerciseEntry,
    ]
  );

  return (
    <DiaryEntriesContext.Provider value={context}>
      {children}
    </DiaryEntriesContext.Provider>
  );
};

export const useDiaryEntriesContext = () =>
  useContext<IDiaryEntriesContext>(DiaryEntriesContext);
