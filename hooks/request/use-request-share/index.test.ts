import { act, renderHook } from '@testing-library/react';
import axios from 'axios';
import { useRequestShare } from '.';

jest.mock('axios');

const mockAxios = jest.mocked(axios);

describe('hooks - use-request-share', () => {
  const mockGuid = 'mock_guid';
  const mockDateFrom = new Date('01-02-2023');
  const mockDateTo = new Date('02-02-2023');

  it('should return non-mounted hook state', async () => {
    const { result } = renderHook(() =>
      useRequestShare(false, mockGuid, mockDateFrom, mockDateTo),
    );

    expect(mockAxios.get).not.toHaveBeenCalled();
    expect(result.current).toMatchInlineSnapshot(`
      {
        "data": undefined,
        "isError": undefined,
        "isLoading": false,
      }
    `);
  });

  it('should return mounted hook state', async () => {
    mockAxios.get.mockResolvedValue({ data: 'mock_data' });

    const { result } = renderHook(() =>
      useRequestShare(true, mockGuid, mockDateFrom, mockDateTo),
    );

    await act(() => Promise.resolve());

    expect(mockAxios.get).toHaveBeenCalledWith(
      '/api/share?link=mock_guid&dateFrom=2023-01-01T22:00:00.000Z&dateTo=2023-02-01T22:00:00.000Z',
    );
    expect(result.current).toMatchInlineSnapshot(`
      {
        "data": "mock_data",
        "isError": undefined,
        "isLoading": false,
      }
    `);
  });
});
