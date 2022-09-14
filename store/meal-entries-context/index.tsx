import { getStructuredClone } from '@utils/get-structured-clone';
import { IMealContent, TMealCard, TMealType } from '@utils/interfaces';
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
        id: 11,
        emoji: { name: 'Bowl with Spoon', nativeSkin: '🥣' },
        serving: '½',
        measurement: 'cup',
        food: 'Simple Truth muesli',
        description: 'With chocolate and mini marshmellows',
      },
      {
        id: 12,
        emoji: { name: 'Glass of Milk', nativeSkin: '🥛' },
        serving: '1',
        measurement: 'serving',
        food: 'milk for cereal',
      },
      {
        id: 13,
        emoji: { name: 'Hot Beverage', nativeSkin: '☕️' },
        serving: '1',
        measurement: 'serving',
        food: 'milk with espresso coffee',
      },
      {
        id: 14,
        emoji: { name: 'Carrot', nativeSkin: '🥕' },
        serving: '1',
        food: 'carrot',
      },
    ],
  },
  lunch: {
    contents: [
      {
        id: 21,
        emoji: { name: 'Bowl with Spoon', nativeSkin: '🥣' },
        serving: '½',
        measurement: 'cup',
        food: 'Simple Truth muesli',
        description: 'With chocolate and mini marshmellows',
      },
      {
        id: 22,
        emoji: { name: 'Glass of Milk', nativeSkin: '🥛' },
        serving: '1',
        measurement: 'serving',
        food: 'milk for cereal',
      },
      {
        id: 23,
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
        id: 31,
        emoji: { name: 'Banana', nativeSkin: '🍌' },
        serving: '1',
        food: 'banana',
      },
    ],
  },
  dinner: {
    contents: [
      {
        id: 41,
        serving: '1',
        measurement: 'serving',
        food: 'milk with espresso coffee',
      },
      {
        id: 42,
        emoji: { name: 'Banana', nativeSkin: '🍌' },
        serving: '1',
        food: 'banana',
      },
      {
        id: 43,
        emoji: { name: 'Carrot', nativeSkin: '🥕' },
        serving: '1',
        food: 'carrot',
      },
      {
        id: 44,
        emoji: { name: 'Carrot', nativeSkin: '🥓' },
        serving: '3',
        food: 'streaky bacon',
      },
      {
        id: 45,
        emoji: { name: 'Sushi', nativeSkin: '🍣' },
        serving: '1',
        food: 'sushi platter',
      },
      {
        id: 46,
        emoji: { name: 'Soft Ice Cream', nativeSkin: '🍦' },
        food: 'ice cream - dessert',
      },
      {
        id: 47,
        emoji: { name: 'Wine Glass', nativeSkin: '🍷' },
        serving: '3',
        food: 'glasses wine',
      },
      {
        id: 48,
        emoji: { name: 'Grapes', nativeSkin: '🍇' },
        serving: '14',
        food: 'grapes',
      },
      {
        id: 49,
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
        id: 11,
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
        id: 21,
        emoji: { name: 'Chocolate Bar', nativeSkin: '🍫' },
        serving: '1',
        food: 'protein bar',
        description: 'USN',
      },
      {
        id: 22,
        emoji: { name: 'Strawberry', nativeSkin: '🍓' },
        serving: '1',
        food: 'protein shake',
        description: 'USN',
      },
      {
        id: 23,
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
        id: 31,
        emoji: { name: 'Pizza', nativeSkin: '🍕' },
        serving: '1',
        measurement: '',
        food: 'pizza',
        description: 'stuffed crust',
      },
    ],
  },
};

interface IAddMealProps {
  date: string;
  mealId: TMealType;
  newValues: IMealContent;
}
interface IUpdateMealProps {
  date: string;
  mealId: TMealType;
  updatedMealId: TMealType;
  updatedContent: IMealContent;
}
interface IRemoveMealProps {
  date: string;
  mealId: TMealType;
  contentId: number;
}
interface IMealEntries {
  [date: string]: TMealCard;
}

export interface IMealEntriesContext {
  mealEntries: IMealEntries;
  addMealEntry: (args: IAddMealProps) => void;
  updateMealEntry: (args: IUpdateMealProps) => void;
  removeMealEntryById: (args: IRemoveMealProps) => void;
}

const initialState: IMealEntriesContext = {
  mealEntries: {
    '2022-08-30T22:00:00.000Z': {
      breakfast: {
        contents: [
          { id: 11, food: 'cake', emoji: { nativeSkin: '🍰', name: 'Cake' } },
        ],
      },
    },
    '2022-08-19T22:00:00.000Z': TEMP_DAY_DATA,
    '2022-08-18T22:00:00.000Z': TEMP_DAY_DATA_2,
    '2022-08-17T22:00:00.000Z': {
      breakfast: {
        contents: [
          { id: 11, food: 'cake', emoji: { nativeSkin: '🍰', name: 'Cake' } },
        ],
      },
    },
  },
  addMealEntry: () => null,
  updateMealEntry: () => null,
  removeMealEntryById: () => null,
};

const MealEntriesContext = createContext(initialState);

export const MealEntriesContextProvider: FC<{
  children: ReactNode;
  initialState?: IMealEntries;
}> = ({ children }) => {
  const [mealEntries, setMealEntries] = useState<IMealEntries>(
    initialState?.mealEntries || {}
  );

  const addMealEntry = useCallback(
    ({ date, mealId, newValues }: IAddMealProps) => {
      const updatedEntries = getStructuredClone(mealEntries);

      if (!updatedEntries[date]) {
        updatedEntries[date] = {};
      }
      const updatedContentsForId = getStructuredClone(
        updatedEntries[date][mealId]?.contents || []
      );
      updatedEntries[date][mealId] = {
        contents: [...updatedContentsForId, newValues],
      };

      console.log('MEAL POST:', {
        date,
        [mealId]: newValues,
      });

      setMealEntries(updatedEntries);
    },
    [mealEntries, setMealEntries]
  );

  const updateMealEntry = useCallback(
    ({ date, mealId, updatedContent, updatedMealId }: IUpdateMealProps) => {
      const updatedEntries = getStructuredClone(mealEntries);
      const isNewMealId = mealId !== updatedMealId;
      const targetMealId = isNewMealId ? updatedMealId : mealId;

      const targetMealContents = [
        ...(updatedEntries[date][targetMealId]?.contents || []),
      ];

      if (isNewMealId) {
        const currentMealContents = [
          ...(updatedEntries[date][mealId]?.contents || []),
        ];

        const filteredCurrentContent = currentMealContents.filter(
          (content) => content.id !== updatedContent.id
        );
        targetMealContents.push(updatedContent);

        updatedEntries[date][mealId] = { contents: filteredCurrentContent };
        updatedEntries[date][updatedMealId] = { contents: targetMealContents };
      } else {
        const foundIndex = targetMealContents.findIndex(
          (content) => content.id === updatedContent.id
        );

        if (foundIndex !== -1) {
          targetMealContents[foundIndex] = updatedContent;
          updatedEntries[date][mealId] = {
            contents: targetMealContents,
          };
        }
      }

      setMealEntries(updatedEntries);
      console.log('MEAL PUT:', {
        date,
        oldMealId: mealId,
        newMealId: updatedMealId,
        content: updatedContent,
      });
    },
    [mealEntries]
  );

  const removeMealEntryById = useCallback(
    ({ date, mealId, contentId }: IRemoveMealProps) => {
      const updatedEntries = getStructuredClone(mealEntries);
      const targetMealContents = [
        ...(updatedEntries[date][mealId]?.contents || []),
      ];

      if (!!targetMealContents.length) {
        const filtered = targetMealContents.filter(
          (content) => content.id !== contentId
        );
        updatedEntries[date][mealId] = {
          contents: filtered,
        };

        setMealEntries(updatedEntries);

        console.log('MEAL DELETE:', {
          date,
          [mealId]: contentId,
        });
      }
    },
    [mealEntries]
  );

  const context = useMemo(
    () => ({ mealEntries, addMealEntry, updateMealEntry, removeMealEntryById }),
    [mealEntries, addMealEntry, updateMealEntry, removeMealEntryById]
  );

  return (
    <MealEntriesContext.Provider value={context}>
      {children}
    </MealEntriesContext.Provider>
  );
};

export const useMealEntriesContext = () =>
  useContext<IMealEntriesContext>(MealEntriesContext);
