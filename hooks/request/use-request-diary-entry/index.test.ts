import { act, renderHook } from '@testing-library/react';
import axios from 'axios';
import { useRequestDiaryEntry } from '.';
import { useUserContext } from '@store/user-context';
import { useDateSelectedContext } from '@store/date-selected-context';
import { useMealEntriesContext } from '@store/meal-entries-context';
import { useWellnessEntriesContext } from '@store/wellness-entries-context';

jest.mock('axios');
jest.mock('@store/user-context');
jest.mock('@store/date-selected-context');
jest.mock('@store/meal-entries-context');
jest.mock('@store/wellness-entries-context');

const mockUseUserContext = jest.mocked(useUserContext);
const mockAxios = jest.mocked(axios);
const mockUseDateSelectedContext = jest.mocked(useDateSelectedContext);
const mockUseMealEntriesContext = jest.mocked(useMealEntriesContext);
const mockUseWellnessEntriesContext = jest.mocked(useWellnessEntriesContext);

describe('hooks - use-request-diary-entry', () => {
  const mockRequestSetMealEntries = jest.fn();
  const mockRequestSetWellnessEntries = jest.fn();

  beforeAll(() => {
    mockUseDateSelectedContext.mockReturnValue({
      dateSelectedISO: '01-02-2023',
    } as any);
    mockUseMealEntriesContext.mockReturnValue({
      requestSetMealEntries: mockRequestSetMealEntries,
    } as any);
    mockUseWellnessEntriesContext.mockReturnValue({
      requestSetWellnessEntries: mockRequestSetWellnessEntries,
    } as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return non-mounted hook state', () => {
    mockUseUserContext.mockReturnValue({ userLoggedIn: false } as any);
    const { result } = renderHook(() => useRequestDiaryEntry(false));

    expect(mockAxios.get).not.toHaveBeenCalled();
    expect(result.current).toMatchInlineSnapshot(`
      {
        "isError": undefined,
        "isLoading": false,
      }
    `);
  });

  it('should return mounted hook state for non-logged in user', async () => {
    mockUseUserContext.mockReturnValue({ userLoggedIn: false } as any);

    const { result } = renderHook(() => useRequestDiaryEntry(true));

    await act(() => Promise.resolve());

    expect(mockAxios.get).not.toHaveBeenCalled();
    expect(result.current).toMatchInlineSnapshot(`
      {
        "isError": undefined,
        "isLoading": false,
      }
    `);
  });

  it('should return mounted hook state for logged in user', async () => {
    mockUseUserContext.mockReturnValue({ userLoggedIn: true } as any);
    mockAxios.get.mockResolvedValue({
      data: {
        entry: { meals: 'mock_meals_entry', wellness: 'mock_wellness_entry' },
      },
    });

    const { result } = renderHook(() => useRequestDiaryEntry(true));

    await act(() => Promise.resolve());

    expect(mockAxios.get).toHaveBeenCalledWith('/api/diary?date=01-02-2023');
    expect(mockRequestSetMealEntries).toHaveBeenCalledWith({
      meals: 'mock_meals_entry',
    });
    expect(mockRequestSetWellnessEntries).toHaveBeenCalledWith({
      wellness: 'mock_wellness_entry',
    });
    expect(result.current).toMatchInlineSnapshot(`
      {
        "isError": undefined,
        "isLoading": false,
      }
    `);
  });

  it('should handle errors', async () => {
    mockUseUserContext.mockReturnValue({ userLoggedIn: true } as any);
    mockAxios.get.mockRejectedValue({ message: 'mock error occurred' });
    mockUseDateSelectedContext.mockReturnValue({
      dateSelectedISO: '02-02-2023',
    } as any);

    const { result } = renderHook(() => useRequestDiaryEntry(true));

    await act(() => Promise.resolve());

    expect(mockAxios.get).toHaveBeenCalledWith('/api/diary?date=02-02-2023');
    expect(result.current).toMatchInlineSnapshot(`
      {
        "isError": {
          "message": "mock error occurred",
        },
        "isLoading": false,
      }
    `);
  });
});
