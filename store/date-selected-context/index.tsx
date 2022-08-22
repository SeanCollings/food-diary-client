import { setDateMidnightISOString } from '@utils/date-utils';
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';

export interface IDateSelectedContext {
  dateSelectedISO: string;
  updateSelectedDateISO: (date: string | Date) => void;
}

const initialState: IDateSelectedContext = {
  dateSelectedISO: '',
  updateSelectedDateISO: () => null,
};

const DateSelectedContext = createContext(initialState);

export const DateSelectedContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [dateSelectedISO, setDateSelectedISO] = useState(
    new Date(new Date().setHours(0, 0, 0, 0)).toISOString()
  );

  const updateSelectedDateISO = (newDate: string | Date) => {
    const newMidnightDateISO = setDateMidnightISOString(newDate);
    setDateSelectedISO(newMidnightDateISO);
  };

  const context = useMemo(
    () => ({ dateSelectedISO, updateSelectedDateISO }),
    [dateSelectedISO]
  );

  return (
    <DateSelectedContext.Provider value={context}>
      {children}
    </DateSelectedContext.Provider>
  );
};

export const useDateSelectedContext = () =>
  useContext<IDateSelectedContext>(DateSelectedContext);
