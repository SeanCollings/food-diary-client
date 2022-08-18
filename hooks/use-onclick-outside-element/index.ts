import { RefObject, useEffect, useRef } from 'react';

export const useOnClickOutsideElementsArray = (
  elementRefs: RefObject<HTMLDivElement>[],
  handler: (event: MouseEvent) => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (elementRefs.length) {
        const someClicked = elementRefs.some((ref) =>
          ref?.current?.contains(event.target as Node)
        );
        if (someClicked) {
          return;
        }

        handler(event);
      }
    };

    document.addEventListener('click', listener);
    return () => {
      document.removeEventListener('click', listener);
    };
  }, [elementRefs, handler]);
};

export const useOnClickOutsideElement = (
  elementRef: RefObject<HTMLDivElement> | null,
  handler: (event: MouseEvent) => void
) => {
  const firstUseRef = useRef(true);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (firstUseRef.current) {
        firstUseRef.current = false;
        return;
      }

      if (elementRef?.current) {
        if (elementRef.current.contains(event.target as Node)) {
          return;
        }

        handler(event);
      }
    };

    document.addEventListener('click', listener);
    return () => {
      document.removeEventListener('click', listener);
    };
  }, [elementRef, handler]);
};
