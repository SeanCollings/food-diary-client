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
interface IRequestSetAllEntries {
  entries: TEntriePerMonth;
}

export interface IAllEntriesPerMonthContext {
  allEntriesPerMonth: TEntriePerMonth;
  requestSetAllEntriesPerMonth: (entries: IRequestSetAllEntries) => void;
}

const initialState: IAllEntriesPerMonthContext = {
  allEntriesPerMonth: {},
  requestSetAllEntriesPerMonth: () => null,
};

const AllEntriesPerMonthContext = createContext(initialState);

export const AllEntriesPerMonthContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [allEntriesPerMonth, setAllEntriesPerMonth] = useState<TEntriePerMonth>(
    {}
  );

  const requestSetAllEntriesPerMonth = useCallback(
    ({ entries }: IRequestSetAllEntries) => {
      setAllEntriesPerMonth((curr) => ({ ...curr, ...entries }));
    },
    []
  );

  const context = useMemo(
    () => ({
      allEntriesPerMonth,
      requestSetAllEntriesPerMonth,
    }),
    [allEntriesPerMonth, requestSetAllEntriesPerMonth]
  );

  return (
    <AllEntriesPerMonthContext.Provider value={context}>
      {children}
    </AllEntriesPerMonthContext.Provider>
  );
};

export const useAllEntriesPerMonthContext = () =>
  useContext<IAllEntriesPerMonthContext>(AllEntriesPerMonthContext);
