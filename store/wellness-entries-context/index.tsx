import { diaryService } from '@client/services/diary.service';
import {
  IWellnessEntries,
  IWellnessEntriesDto,
  TWellnessEntry,
  TWellnessValueTypes,
} from '@lib/interfaces/wellness.interface';
import { useUserContext } from '@store/user-context';
import { getStructuredClone } from '@utils/get-structured-clone';
import { TWellnessTypes } from '@utils/interfaces';
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

export type TAllWellnessType = TWellnessTypes | 'excercise';
export type TDrink = { value: number };
export type TExcercise = { time?: string; details?: string };

type TValueTypes = TDrink | TExcercise;

interface IUpdateEntryByTypeProps<T> {
  date: string;
  type: TAllWellnessType;
  content: T;
}

interface IRequestSetWellnessEntries {
  wellness: { [date: string]: TWellnessEntry<TWellnessValueTypes> };
}

export interface IWellnessEntriesContext {
  wellnessEntries: IWellnessEntries;
  requestSetWellnessEntries: (args: IRequestSetWellnessEntries) => void;
  updateEntryByKey: <K extends TValueTypes>(
    args: IUpdateEntryByTypeProps<K>
  ) => void;
}

const initialState: IWellnessEntriesContext = {
  wellnessEntries: {},
  requestSetWellnessEntries: () => null,
  updateEntryByKey: () => null,
};

const WellnessEntriesContext = createContext(initialState);

export const WellnessEntriesContextProvider: FC<{
  children: ReactNode;
  initialState?: IWellnessEntries;
}> = ({ children }) => {
  const { userLoggedIn } = useUserContext();
  const [updatedDates, setUpdatedDates] = useState<string[]>([]);
  const [wellnessEntries, setWellnessEntries] = useState<IWellnessEntries>(
    initialState?.wellnessEntries || {}
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
        console.log('Error:', error);
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [wellnessEntries, updatedDates, userLoggedIn]);

  const requestSetWellnessEntries = useCallback(
    ({ wellness }: IRequestSetWellnessEntries) => {
      setWellnessEntries((curr) => ({ ...curr, ...wellness }));
    },
    []
  );

  const updateEntryByKey = useCallback(
    <K extends TValueTypes>({
      date,
      type,
      content,
    }: IUpdateEntryByTypeProps<K>) => {
      const updatedEntries = getStructuredClone(wellnessEntries);
      const dates = [...updatedDates];

      if (!updatedEntries[date]) {
        updatedEntries[date] = {};
      }
      updatedEntries[date][type] = content;

      if (!updatedDates.includes(date)) {
        dates.push(date);
      }

      setWellnessEntries(updatedEntries);

      if (userLoggedIn) {
        setUpdatedDates(dates);
      }
    },
    [wellnessEntries, updatedDates, userLoggedIn]
  );

  const context = useMemo(
    () => ({ wellnessEntries, requestSetWellnessEntries, updateEntryByKey }),
    [wellnessEntries, requestSetWellnessEntries, updateEntryByKey]
  );

  return (
    <WellnessEntriesContext.Provider value={context}>
      {children}
    </WellnessEntriesContext.Provider>
  );
};

export const useWellnessEntriesContext = () =>
  useContext<IWellnessEntriesContext>(WellnessEntriesContext);
