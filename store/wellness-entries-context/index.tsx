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
  useRef,
  useState,
} from 'react';

const TEMP_DAY_DATA_1: TWellnessEntry<TValueTypes> = {
  water: { value: 3 },
  alcohol: { value: 2 },
  tea_coffee: { value: 6 },
  excercise: {
    time: '01:25',
    details: 'weights and rowing',
  },
};
const TEMP_DAY_DATA_2: TWellnessEntry<TValueTypes> = {
  water: { value: 5 },
  alcohol: { value: 0 },
  tea_coffee: { value: 0 },
  excercise: {
    time: '00:30',
    details: 'treadmill running',
  },
};
const TEMP_DAY_DATA_3: TWellnessEntry<TValueTypes> = {
  water: { value: 2 },
  tea_coffee: { value: 0 },
  excercise: {
    time: '01:12',
  },
};

export type TAllWellnessType = TWellnessTypes | 'excercise';
export type TDrink = { value: number };
export type TExcercise = { time?: string; details?: string };

type TValueTypes = TDrink | TExcercise;
type TValue<K> = K;
type TWellnessEntry<K> = {
  [key in TAllWellnessType]?: TValue<K>;
};
interface IWellnessEntries {
  [date: string]: TWellnessEntry<TValueTypes>;
}
interface IUpdateEntryByTypeProps<T> {
  date: string;
  type: TAllWellnessType;
  content: T;
}

export interface IWellnessEntriesContext {
  wellnessEntries: IWellnessEntries;
  updateEntryByKey: <K extends TValueTypes>(
    args: IUpdateEntryByTypeProps<K>
  ) => void;
}

const initialState: IWellnessEntriesContext = {
  wellnessEntries: {
    '2022-08-19T22:00:00.000Z': TEMP_DAY_DATA_1,
    '2022-08-18T22:00:00.000Z': TEMP_DAY_DATA_2,
    '2022-08-17T22:00:00.000Z': TEMP_DAY_DATA_3,
  },
  updateEntryByKey: () => null,
};

const WellnessEntriesContext = createContext(initialState);

export const WellnessEntriesContextProvider: FC<{
  children: ReactNode;
  initialState?: IWellnessEntries;
}> = ({ children }) => {
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
        curr[date] = { ...wellnessEntries[date] };
        return curr;
      }, {} as IWellnessEntries);

      console.log('WELLNESS POST:', payload);

      setUpdatedDates([]);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [wellnessEntries, updatedDates]);

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
      setUpdatedDates(dates);
    },
    [wellnessEntries, updatedDates]
  );

  const context = useMemo(
    () => ({ wellnessEntries, updateEntryByKey }),
    [wellnessEntries, updateEntryByKey]
  );

  return (
    <WellnessEntriesContext.Provider value={context}>
      {children}
    </WellnessEntriesContext.Provider>
  );
};

export const useWellnessEntriesContext = () =>
  useContext<IWellnessEntriesContext>(WellnessEntriesContext);
