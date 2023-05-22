import { act, renderHook } from '@testing-library/react';
import axios from 'axios';
import { useRequestBeverageTrends, useRequestExcerciseTrends } from '.';

jest.mock('axios');

const mockAxios = jest.mocked(axios);

describe('hooks - use-request-wellness-trends', () => {
  afterEach(() => jest.clearAllMocks());

  describe('useRequestBeverageTrends', () => {
    it('should return non-mounted hook state', () => {
      const { result } = renderHook(() =>
        useRequestBeverageTrends(false, 'week'),
      );

      expect(mockAxios.get).not.toHaveBeenCalled();
      expect(result.current).toMatchInlineSnapshot(`
        {
          "data": {},
          "isError": undefined,
          "isLoading": false,
        }
      `);
    });

    it('should return mounted hook state for time-period week', async () => {
      mockAxios.get.mockResolvedValue({ data: 'mock_trend_data' });

      const { result } = renderHook(() =>
        useRequestBeverageTrends(true, 'week'),
      );

      expect(result.current).toMatchInlineSnapshot(`
        {
          "data": {
            "week": undefined,
          },
          "isError": undefined,
          "isLoading": true,
        }
      `);

      await act(() => Promise.resolve());

      expect(mockAxios.get).toHaveBeenCalledWith(
        '/api/trends/beverage-trends?type=week',
      );
      expect(result.current).toMatchInlineSnapshot(`
        {
          "data": {
            "week": "mock_trend_data",
          },
          "isError": undefined,
          "isLoading": true,
        }
      `);
    });
  });

  describe('useRequestExcerciseTrends', () => {
    it('should return non-mounted hook state', () => {
      const { result } = renderHook(() =>
        useRequestExcerciseTrends(false, 'week'),
      );

      expect(mockAxios.get).not.toHaveBeenCalled();
      expect(result.current).toMatchInlineSnapshot(`
        {
          "data": {},
          "isError": undefined,
          "isLoading": false,
        }
      `);
    });

    it('should return mounted hook state for time-period week', async () => {
      mockAxios.get.mockResolvedValue({ data: 'mock_trend_data' });

      const { result } = renderHook(() =>
        useRequestExcerciseTrends(true, 'week'),
      );

      expect(result.current).toMatchInlineSnapshot(`
        {
          "data": {
            "week": undefined,
          },
          "isError": undefined,
          "isLoading": true,
        }
      `);

      await act(() => Promise.resolve());

      expect(mockAxios.get).toHaveBeenCalledWith(
        '/api/trends/excercise-trends?type=week',
      );
      expect(result.current).toMatchInlineSnapshot(`
        {
          "data": {
            "week": "mock_trend_data",
          },
          "isError": undefined,
          "isLoading": true,
        }
      `);
    });
  });
});
