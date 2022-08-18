import { createContext, FC, ReactNode, useContext, useMemo } from 'react';

export interface IMealCardsContext {}

const initialState: IMealCardsContext = {};

const MealCardsContext = createContext(initialState);

export const MealCardsContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const context = useMemo(() => ({}), []);

  return (
    <MealCardsContext.Provider value={context}>
      {children}
    </MealCardsContext.Provider>
  );
};

export const useMealCardsContext = () =>
  useContext<IMealCardsContext>(MealCardsContext);
