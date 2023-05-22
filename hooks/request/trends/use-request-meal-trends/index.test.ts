import { act, renderHook } from '@testing-library/react';
import axios from 'axios';
import { useRequestMealTrends } from '.';

jest.mock('axios');

const mockAxios = jest.mocked(axios);

describe('hooks - use-request-meal-trends', () => {
  afterEach(() => jest.clearAllMocks());

  it('should return non-mounted hook state', () => {
    const { result } = renderHook(() => useRequestMealTrends(false, 'week'));

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

    const { result } = renderHook(() => useRequestMealTrends(true, 'week'));

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
      '/api/trends/meal-trends?type=week',
    );
    expect(result.current).toMatchInlineSnapshot(`
      {
        "data": {
          "week": "mock_trend_data",
        },
        "isError": undefined,
        "isLoading": false,
      }
    `);
  });

  it('should return mounted hook state for time-period month', async () => {
    mockAxios.get.mockResolvedValue({ data: 'mock_trend_data' });

    const { result } = renderHook(() => useRequestMealTrends(true, 'month'));

    expect(result.current).toMatchInlineSnapshot(`
          {
            "data": {
              "month": undefined,
            },
            "isError": undefined,
            "isLoading": true,
          }
        `);

    await act(() => Promise.resolve());

    expect(mockAxios.get).toHaveBeenCalledWith(
      '/api/trends/meal-trends?type=month',
    );
    expect(result.current).toMatchInlineSnapshot(`
      {
        "data": {
          "month": "mock_trend_data",
        },
        "isError": undefined,
        "isLoading": false,
      }
    `);
  });
});
