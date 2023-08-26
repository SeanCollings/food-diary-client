import {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { getUniqueId } from '@utils/unique-id';

export enum ToastStatus {
  SUCCESS = 'success',
  ERROR = 'error',
}

export type TToastStatus = `${ToastStatus}`;

export interface Toast {
  title: string;
  message: string;
  status: TToastStatus;
  isHiding?: boolean;
  timeDismissed?: boolean;
}

export interface ToastWithId extends Toast {
  id: string;
}

export type ToastData = {
  [id in string]: ToastWithId;
};

interface ToastContextProps {
  children: ReactNode;
}

type TToastContext = ReturnType<typeof useToastContext>;

const ToastContext = createContext<TToastContext>({} as TToastContext);

const useToastContext = () => {
  const [activeToasts, setActiveToasts] = useState<ToastData>({});

  const showToast = useCallback((notificatioData: Toast) => {
    const id = getUniqueId();

    setActiveToasts((currentToasts) => {
      const updatedToast = {
        ...currentToasts,
        [id]: { ...notificatioData, id },
      };
      return updatedToast;
    });
    return id;
  }, []);

  const removeToast = useCallback(
    (id: string) => {
      setActiveToasts((currentToasts) => {
        const updatedToast = { ...currentToasts };
        delete updatedToast[id];
        return updatedToast;
      });
    },
    [setActiveToasts],
  );

  const hideToast = useCallback(
    (id: string) => {
      setActiveToasts((currentToasts) => {
        const updatedToast = { ...currentToasts };
        updatedToast[id] = {
          ...updatedToast[id],
          isHiding: true,
        };
        return updatedToast;
      });
    },
    [setActiveToasts],
  );

  const context = useMemo(
    () => ({
      toasts: activeToasts,
      showToast,
      removeToast,
      hideToast,
    }),
    [activeToasts, showToast, removeToast, hideToast],
  );

  return context;
};

export const ToastContextProvider: FC<ToastContextProps> = ({ children }) => {
  return (
    <ToastContext.Provider value={useToastContext()}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext<TToastContext>(ToastContext);
