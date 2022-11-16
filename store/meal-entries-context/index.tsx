import { diaryService } from '@client/services/diary.service';
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

interface IRequestSetMealEntries {
  meals: { [date: string]: TMealCard };
}
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
  contentId: string;
}
interface IMealEntries {
  [date: string]: TMealCard;
}

export interface IMealEntriesContext {
  mealEntries: IMealEntries;
  requestSetMealEntries: (args: IRequestSetMealEntries) => void;
  addMealEntry: (args: IAddMealProps) => void;
  updateMealEntry: (args: IUpdateMealProps) => void;
  removeMealEntryById: (args: IRemoveMealProps) => void;
}

const initialState: IMealEntriesContext = {
  mealEntries: {},
  requestSetMealEntries: () => null,
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

  const requestSetMealEntries = useCallback(
    ({ meals }: IRequestSetMealEntries) => {
      setMealEntries((curr) => ({ ...curr, ...meals }));
    },
    []
  );

  const addMealEntry = useCallback(
    async ({ date, mealId, newValues }: IAddMealProps) => {
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

      const { error } = await diaryService.createMealEntry({
        date,
        body: { mealId, content: newValues },
      });

      if (error) {
        return console.log('Error:', error);
      }

      setMealEntries(updatedEntries);
    },
    [mealEntries, setMealEntries]
  );

  const updateMealEntry = useCallback(
    async ({
      date,
      mealId,
      updatedContent,
      updatedMealId,
    }: IUpdateMealProps) => {
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

      const { error } = await diaryService.updateMealEntry({
        date,
        body: {
          content: updatedContent,
          newMealId: updatedMealId,
          oldMealId: mealId,
        },
      });

      if (error) {
        return console.log('Error:', error);
      }

      setMealEntries(updatedEntries);
    },
    [mealEntries]
  );

  const removeMealEntryById = useCallback(
    async ({ date, mealId, contentId }: IRemoveMealProps) => {
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

        const { error } = await diaryService.deleteMealEntry({
          date,
          body: {
            mealId,
            id: contentId,
          },
        });

        if (error) {
          return console.log('Error:', error);
        }

        setMealEntries(updatedEntries);
      }
    },
    [mealEntries]
  );

  const context = useMemo(
    () => ({
      mealEntries,
      requestSetMealEntries,
      addMealEntry,
      updateMealEntry,
      removeMealEntryById,
    }),
    [
      mealEntries,
      requestSetMealEntries,
      addMealEntry,
      updateMealEntry,
      removeMealEntryById,
    ]
  );

  return (
    <MealEntriesContext.Provider value={context}>
      {children}
    </MealEntriesContext.Provider>
  );
};

export const useMealEntriesContext = () =>
  useContext<IMealEntriesContext>(MealEntriesContext);
