import { useRef, useEffect, useCallback } from 'react';

//https://stackoverflow.com/questions/55045566/react-hooks-usecallback-causes-child-to-re-render

export const useMemoizeFunction = <T = void>(fn: (args: T) => void) => {
  const fnRef = useRef(fn);

  useEffect(() => {
    fnRef.current = fn;
  });

  const fnMemoized = useCallback((args: T) => {
    fnRef.current(args);
  }, []);

  return fnMemoized;
};
