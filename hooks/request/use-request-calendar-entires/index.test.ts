import { act, renderHook } from '@testing-library/react';
import axios from 'axios';
import { useRequestCalendarEntries } from '.';
import { useUserContext } from '@store/user-context';
import { useAllEntriesPerMonthContext } from '@store/all-entries-per-month-context';

jest.mock('axios');
jest.mock('@store/user-context');
jest.mock('@store/all-entries-per-month-context');

const mockAxios = jest.mocked(axios);
const mockUseUserContext = jest.mocked(useUserContext);
const mockUseAllEntriesPerMonthContext = jest.mocked(
  useAllEntriesPerMonthContext,
);

describe('hooks - use-request-calendar-entries', () => {
  const mockDate = '01-02-2023';
  const mockDate2 = '02-02-2023';
  const mockDate3 = '03-02-2023';
  const mockRequestSetAllEntriesPerMonth = jest.fn();

  beforeEach(() => {
    mockUseAllEntriesPerMonthContext.mockReturnValue({
      requestSetAllEntriesPerMonth: mockRequestSetAllEntriesPerMonth,
    } as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('useRequestBeverageTrends', () => {
    it('should return null input hook state', () => {
      mockUseUserContext.mockReturnValue({ userLoggedIn: true } as any);

      const { result } = renderHook(() => useRequestCalendarEntries(null));

      expect(mockAxios.get).not.toHaveBeenCalled();
      expect(result.current).toMatchInlineSnapshot(`
        {
          "isError": undefined,
          "isLoading": null,
        }
      `);
    });

    it('should prevent non-logged in user requests', async () => {
      mockUseUserContext.mockReturnValue({ userLoggedIn: false } as any);

      const { result } = renderHook(() => useRequestCalendarEntries(mockDate));

      expect(result.current).toMatchInlineSnapshot(`
        {
          "isError": undefined,
          "isLoading": false,
        }
      `);

      await act(() => Promise.resolve());

      expect(mockAxios.get).not.toHaveBeenCalled();
      expect(result.current).toMatchInlineSnapshot(`
        {
          "isError": undefined,
          "isLoading": false,
        }
      `);
    });

    it('should return state for logged in users', async () => {
      mockUseUserContext.mockReturnValue({ userLoggedIn: true } as any);
      mockAxios.get.mockResolvedValueOnce({
        data: { months: 6, entries: { [mockDate]: [2, 4, 6, 8] } },
      });

      const { result } = renderHook(() => useRequestCalendarEntries(mockDate));

      expect(result.current).toMatchInlineSnapshot(`
        {
          "isError": undefined,
          "isLoading": true,
        }
      `);

      await act(() => Promise.resolve());

      expect(mockAxios.get).toHaveBeenCalledWith(
        '/api/diary/calendar-entries?date=01-02-2023&months=6',
      );
      expect(mockRequestSetAllEntriesPerMonth).toHaveBeenCalledWith({
        entries: { '01-02-2023': [2, 4, 6, 8] },
      });
      expect(result.current).toMatchInlineSnapshot(`
        {
          "isError": undefined,
          "isLoading": false,
        }
      `);
    });

    it('should cater for undefined data', async () => {
      mockUseUserContext.mockReturnValue({ userLoggedIn: true } as any);
      mockAxios.get.mockResolvedValueOnce({
        data: undefined,
      });

      renderHook(() => useRequestCalendarEntries(mockDate2));

      await act(() => Promise.resolve());

      expect(mockRequestSetAllEntriesPerMonth).not.toHaveBeenCalled();
    });

    it('should return errors', async () => {
      mockUseUserContext.mockReturnValue({ userLoggedIn: true } as any);
      mockAxios.get.mockRejectedValue({ message: 'mock error occurred' });

      const { result } = renderHook(() => useRequestCalendarEntries(mockDate3));

      await act(() => Promise.resolve());

      expect(mockRequestSetAllEntriesPerMonth).not.toHaveBeenCalled();
      expect(result.current).toMatchInlineSnapshot(`
        {
          "isError": "mock error occurred",
          "isLoading": false,
        }
      `);
    });
  });
});
