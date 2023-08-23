import { act, renderHook } from '@testing-library/react';
import axios from 'axios';
import { useRequestUser } from '.';
import { useUserContext } from '@store/user-context';

jest.mock('axios');
jest.mock('@store/user-context');

const mockAxios = jest.mocked(axios);
const mockUseUserContext = jest.mocked(useUserContext);

describe('hooks - use-request-user', () => {
  const mockSetInitialUser = jest.fn();

  beforeAll(() => {
    mockUseUserContext.mockReturnValue({
      user: null,
      setInitialUser: mockSetInitialUser,
    } as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return non-mounted hook state', async () => {
    const { result } = renderHook(() => useRequestUser(false));

    expect(mockAxios.get).not.toHaveBeenCalled();
    expect(result.current).toMatchInlineSnapshot(`
      {
        "data": undefined,
        "isError": undefined,
        "isLoading": false,
      }
      `);
  });

  it('should not get user if user already exists', async () => {
    mockUseUserContext.mockReturnValue({
      user: { user: 'present' },
      setInitialUser: mockSetInitialUser,
    } as any);

    const { result } = renderHook(() => useRequestUser(true));

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
    mockUseUserContext.mockReturnValue({
      user: null,
      setInitialUser: mockSetInitialUser,
    } as any);

    mockAxios.get.mockResolvedValue({ data: { user: 'mock_user' } });
    const { result } = renderHook(() => useRequestUser(true));

    await act(() => Promise.resolve());

    expect(mockAxios.get).toHaveBeenCalledWith('/api/user');
    expect(mockSetInitialUser).toHaveBeenCalledWith('mock_user');
    expect(result.current).toMatchInlineSnapshot(`
    {
      "data": "mock_user",
      "isError": undefined,
      "isLoading": false,
    }
    `);
  });
});
