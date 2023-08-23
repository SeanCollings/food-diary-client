import { act, renderHook } from '@testing-library/react';
import axios from 'axios';
import { useRequestUpdateUser } from '.';
import { useUserContext } from '@store/user-context';
import { useWellnessEntriesContext } from '@store/wellness-entries-context';

jest.mock('axios');
jest.mock('@store/user-context');
jest.mock('@store/wellness-entries-context');

const mockAxios = jest.mocked(axios);
const mockUseUserContext = jest.mocked(useUserContext);
const mockUseWellnessEntriesContext = jest.mocked(useWellnessEntriesContext);

describe('hooks - use-request-update-user', () => {
  const mockSetInitialUser = jest.fn();
  const mockResetWellnessUpdated = jest.fn();

  beforeAll(() => {
    mockUseUserContext.mockReturnValue({
      user: null,
      setInitialUser: mockSetInitialUser,
    } as any);
  });

  beforeEach(() => {
    mockUseWellnessEntriesContext.mockReturnValue({
      resetWellnessUpdated: mockResetWellnessUpdated,
    } as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return non-mounted hook state', async () => {
    const { result } = renderHook(() => useRequestUpdateUser(false));

    expect(mockAxios.get).not.toHaveBeenCalled();
    expect(result.current).toMatchInlineSnapshot(`
      {
        "isError": undefined,
        "isLoading": false,
      }
      `);
  });

  it('should fetch user if allowed', async () => {
    mockAxios.get.mockResolvedValue({ data: { user: 'mock_user' } });
    const { result } = renderHook(() => useRequestUpdateUser(true));

    await act(() => Promise.resolve());

    expect(mockAxios.get).toHaveBeenCalledWith('/api/user');
    expect(mockSetInitialUser).toHaveBeenCalledWith('mock_user');
    expect(mockResetWellnessUpdated).toHaveBeenCalled();
    expect(result.current).toMatchInlineSnapshot(`
    {
      "isError": undefined,
      "isLoading": false,
    }
    `);
  });
});
