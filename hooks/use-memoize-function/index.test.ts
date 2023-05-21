import { renderHook } from '@testing-library/react';
import { useMemoizeFunction } from '.';

describe('hooks - use-memoize-function', () => {
  const mockFn = jest.fn();

  it('should return hook state', () => {
    const { result } = renderHook(() => useMemoizeFunction(mockFn));
    expect(result.current).toMatchInlineSnapshot(`[Function]`);
  });

  it('should memoize function', () => {
    const { result } = renderHook(() => useMemoizeFunction(mockFn));

    result.current({ args: true });
    expect(mockFn).toHaveBeenCalledWith({ args: true });
  });
});
