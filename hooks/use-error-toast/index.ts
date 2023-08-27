import { useToast } from '@store/toast-context';
import { useState, useEffect } from 'react';

interface ErrorToastProps {
  error?: boolean;
  title: string;
  message: string;
  clear?: boolean;
}

export const useErrorToast = ({
  error,
  title,
  message,
  clear,
}: ErrorToastProps) => {
  const { showToast, removeToast } = useToast();
  const [toastId, setToastId] = useState<string | null>(null);

  useEffect(() => {
    if (!!error && !toastId) {
      const id = showToast({
        status: 'error',
        title,
        message,
      });
      setToastId(id);
    }
  }, [error, message, title, toastId, showToast]);

  useEffect(() => {
    if (toastId && clear) {
      removeToast(toastId);
    }
  }, [clear, toastId, removeToast]);
};
