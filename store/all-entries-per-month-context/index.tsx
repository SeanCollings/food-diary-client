import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

type TEntries = { [key: string]: number[] };

export interface IAllEntriesPerMonthContext {
  allEntriesPerMonth: TEntries;
  updateAllEntriesPerMonth: (newEntries: number[], date: string) => void;
}

const initialState: IAllEntriesPerMonthContext = {
  allEntriesPerMonth: {
    'Jul 2022': [17],
    'Aug 2022': [18, 19, 20],
  },
  updateAllEntriesPerMonth: () => null,
};

const AllEntriesPerMonthContext = createContext(initialState);

export const AllEntriesPerMonthContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [allEntriesPerMonth, setAllEntriesPerMonth] = useState<TEntries>({});

  const updateAllEntriesPerMonth = useCallback(
    (newEntries: number[], date: string) => {
      const updatedEntires: TEntries = { ...allEntriesPerMonth };
      updatedEntires[date] = newEntries;
      setAllEntriesPerMonth(updatedEntires);
    },
    [allEntriesPerMonth]
  );

  const context = useMemo(
    () => ({ allEntriesPerMonth, updateAllEntriesPerMonth }),
    [allEntriesPerMonth, updateAllEntriesPerMonth]
  );

  return (
    <AllEntriesPerMonthContext.Provider value={context}>
      {children}
    </AllEntriesPerMonthContext.Provider>
  );
};

export const useAllEntriesPerMonthContext = () =>
  useContext<IAllEntriesPerMonthContext>(AllEntriesPerMonthContext);
