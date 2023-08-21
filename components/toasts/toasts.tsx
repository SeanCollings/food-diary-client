import { ToastData, useToast } from '@store/toast-context';
import { FC, memo, useEffect, useState } from 'react';
import { Toast } from '@components/toasts';

const TOAST_MARGIN_BOTTOM = 16;
const TOTAL_TOASTS_AT_ONCE = 5;

interface ToastsProps {
  toasts: ToastData;
}

export const Toasts: FC<ToastsProps> = memo(({ toasts }) => {
  const [allToastHeights, setAllToastHeights] = useState<number[]>([]);

  const allToastIds = Object.keys(toasts);

  useEffect(() => {
    if (allToastIds.length !== allToastHeights.length) {
      const allHeights = allToastIds.map((toastId) => {
        const toastElement = document.getElementById(`toast-${toastId}`);

        if (toastElement) {
          return toastElement.offsetHeight;
        }

        return 0;
      });

      setAllToastHeights(allHeights);
    }
  }, [allToastHeights.length, allToastIds]);

  const getPreviousToastHeights = (currentIndex: number) =>
    allToastHeights.reduce((totalHeight, height, index) => {
      if (index < currentIndex) {
        totalHeight += height;
      }

      return totalHeight;
    }, 0);

  const getTotalMarginTop = (index: number) =>
    (index + 1) * TOAST_MARGIN_BOTTOM;

  const getToastPosition = (index: number) =>
    getPreviousToastHeights(index) + getTotalMarginTop(index);

  if (!allToastIds.length) {
    return null;
  }

  return (
    <div>
      {allToastIds.map((toastId, index) => {
        const toast = toasts[toastId];

        if (index + 1 > TOTAL_TOASTS_AT_ONCE) {
          return null;
        }

        return (
          <Toast
            key={toastId}
            toastId={toastId}
            toast={toast}
            toastPosition={getToastPosition(index)}
          />
        );
      })}
    </div>
  );
});
Toasts.displayName = 'Toasts';

export const DisplayToasts: FC = () => {
  const { toasts } = useToast();

  if (!Object.keys(toasts).length) {
    return null;
  }

  return <Toasts toasts={toasts} />;
};
