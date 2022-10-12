import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

export type TEntriePerMonth = { [key: string]: number[] };

export interface IAllEntriesPerMonthContext {
  allEntriesPerMonth: TEntriePerMonth;
  updateAllEntriesPerMonth: (newEntries: number[], date: string) => void;
}

const initialState: IAllEntriesPerMonthContext = {
  allEntriesPerMonth: {
    'Jul 2022': [17],
    'Aug 2022': [18, 19, 20, 31],
    'Oct 2022': [12, 11, 10],
  },
  updateAllEntriesPerMonth: () => null,
};

const AllEntriesPerMonthContext = createContext(initialState);

export const AllEntriesPerMonthContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [allEntriesPerMonth, setAllEntriesPerMonth] = useState<TEntriePerMonth>(
    {}
  );

  const updateAllEntriesPerMonth = useCallback(
    (newEntries: number[], date: string) => {
      const updatedEntires: TEntriePerMonth = { ...allEntriesPerMonth };
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
