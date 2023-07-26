import { diaryService } from '@client/services/diary.service';
import {
  IWellnessEntries,
  IWellnessEntriesDto,
  TAllWellnessType,
  TWellnessEntries,
  TWellnessValueTypes,
} from '@lib/interfaces/wellness.interface';
import { useUserContext } from '@store/user-context';
import { getStructuredClone } from '@utils/get-structured-clone';
import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export const BOUNCE_TIME = 1000;

export type TDrink = { value: number };
export type TExcercise = { time?: string; details?: string };

interface IUpdateEntryByTypeProps<T> {
  date: string;
  type: TAllWellnessType;
  content: T;
}

interface IRequestSetWellnessEntries {
  wellness: { [date: string]: TWellnessEntries };
}

export interface IWellnessEntriesContext {
  wellnessEntries: IWellnessEntries;
  requestSetWellnessEntries: (args: IRequestSetWellnessEntries) => void;
  updateEntryByKey: <K extends TWellnessValueTypes>(
    args: IUpdateEntryByTypeProps<K>,
  ) => void;
}

export const initialState: IWellnessEntriesContext = {
  wellnessEntries: {},
  requestSetWellnessEntries: () => null,
  updateEntryByKey: () => null,
};

const WellnessEntriesContext = createContext(initialState);

export const WellnessEntriesContextProvider: FC<{
  children: ReactNode;
  initialState?: IWellnessEntries;
}> = ({ initialState, children }) => {
  const { userLoggedIn } = useUserContext();
  const [updatedDates, setUpdatedDates] = useState<string[]>([]);
  const [wellnessEntries, setWellnessEntries] = useState<IWellnessEntries>(
    initialState || {},
  );

  useEffect(() => {
    if (!updatedDates.length) {
      return;
    }

    const timer = setTimeout(async () => {
      const payload = updatedDates.reduce((curr, date) => {
        curr[date] = { ...wellnessEntries[date], date };
        return curr;
      }, {} as IWellnessEntriesDto);

      setUpdatedDates([]);

      const { error } = await diaryService.updateWellnessEntries({
        body: payload,
      });

      if (error) {
        console.error('Error updating wellness entries:', error);
      }
    }, BOUNCE_TIME);

    return () => {
      clearTimeout(timer);
    };
  }, [wellnessEntries, updatedDates, userLoggedIn]);

  const requestSetWellnessEntries = useCallback(
    ({ wellness }: IRequestSetWellnessEntries) => {
      setWellnessEntries((curr) => ({ ...curr, ...wellness }));
    },
    [],
  );

  const updateEntryByKey = useCallback(
    <K extends TWellnessValueTypes>({
      date,
      type,
      content,
    }: IUpdateEntryByTypeProps<K>) => {
      const updatedEntries = getStructuredClone(wellnessEntries);
      const dates = [...updatedDates];

      if (!updatedEntries[date]) {
        updatedEntries[date] = {};
      }

      updatedEntries[date] = {
        ...updatedEntries[date],
        [type]: content,
      };

      if (!updatedDates.includes(date)) {
        dates.push(date);
      }

      setWellnessEntries(updatedEntries);

      if (userLoggedIn) {
        setUpdatedDates(dates);
      }
    },
    [updatedDates, userLoggedIn, wellnessEntries],
  );

  const context = useMemo(
    () => ({ wellnessEntries, requestSetWellnessEntries, updateEntryByKey }),
    [wellnessEntries, requestSetWellnessEntries, updateEntryByKey],
  );

  return (
    <WellnessEntriesContext.Provider value={context}>
      {children}
    </WellnessEntriesContext.Provider>
  );
};

export const useWellnessEntriesContext = () =>
  useContext<IWellnessEntriesContext>(WellnessEntriesContext);
