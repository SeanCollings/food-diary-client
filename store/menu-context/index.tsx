import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

export interface IMenuContext {
  isOpen: boolean;
  toggleMenu: () => void;
}

const initialState: IMenuContext = {
  isOpen: false,
  toggleMenu: () => null,
};

const MenuContext = createContext(initialState);

export const MenuContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsOpen((curr) => !curr);
  }, []);

  const context = useMemo(() => ({ isOpen, toggleMenu }), [isOpen, toggleMenu]);

  return (
    <MenuContext.Provider value={context}>{children}</MenuContext.Provider>
  );
};

export const useMenuContext = () => useContext<IMenuContext>(MenuContext);
