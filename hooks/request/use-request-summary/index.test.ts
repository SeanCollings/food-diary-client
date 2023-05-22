import { act, renderHook } from '@testing-library/react';
import axios from 'axios';
import { useRequestSummary } from '.';
import { useUserContext } from '@store/user-context';

jest.mock('axios');
jest.mock('@store/user-context');

const mockAxios = jest.mocked(axios);
const mockUseUserContext = jest.mocked(useUserContext);

describe('hooks - use-request-summary', () => {
  const mockDateFrom = new Date('01-02-2023');
  const mockDateTo = new Date('02-02-2023');

  it('should return non-mounted hook state', async () => {
    mockUseUserContext.mockReturnValue({ userLoggedIn: true } as any);

    const { result } = renderHook(() =>
      useRequestSummary(false, mockDateFrom, mockDateTo),
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

  it('should return mounted hook state for non-logged in user', async () => {
    mockUseUserContext.mockReturnValue({ userLoggedIn: false } as any);

    const { result } = renderHook(() =>
      useRequestSummary(true, mockDateFrom, mockDateTo),
    );

    await act(() => Promise.resolve());

    expect(mockAxios.get).not.toHaveBeenCalled();
    expect(result.current).toMatchInlineSnapshot(`
      {
        "data": undefined,
        "isError": undefined,
        "isLoading": false,
      }
    `);
  });

  it('should return mounted hook state for logged in user', async () => {
    mockUseUserContext.mockReturnValue({ userLoggedIn: true } as any);
    mockAxios.get.mockResolvedValue({
      data: 'mocked_data',
    });

    const { result } = renderHook(() =>
      useRequestSummary(true, mockDateFrom, mockDateTo),
    );

    await act(() => Promise.resolve());

    expect(mockAxios.get).toHaveBeenCalled();
    expect(result.current).toMatchInlineSnapshot(`
      {
        "data": "mocked_data",
        "isError": undefined,
        "isLoading": false,
      }
    `);
  });

  it('should return error', async () => {
    mockUseUserContext.mockReturnValue({ userLoggedIn: true } as any);
    mockAxios.get.mockRejectedValue({
      message: 'mock error message',
    });

    const { result } = renderHook(() =>
      useRequestSummary(true, mockDateFrom, new Date('03-02-2023')),
    );

    await act(() => Promise.resolve());

    expect(mockAxios.get).toHaveBeenCalled();
    expect(result.current).toMatchInlineSnapshot(`
      {
        "data": undefined,
        "isError": {
          "message": "mock error message",
        },
        "isLoading": false,
      }
    `);
  });
});
