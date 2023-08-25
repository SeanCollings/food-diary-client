import { useToast } from '@store/toast-context';
import { useState, useEffect } from 'react';

interface ErrorToastProps {
  isError?: string;
  title: string;
  message: string;
}

export const useErrorToast = ({ isError, title, message }: ErrorToastProps) => {
  const { showToast } = useToast();
  const [toastShown, setToastShown] = useState(false);

  useEffect(() => {
    if (!!isError && !toastShown) {
      setToastShown(true);
      showToast({
        status: 'error',
        title,
        message,
      });
    }
  }, [isError, message, title, toastShown, showToast]);
};
