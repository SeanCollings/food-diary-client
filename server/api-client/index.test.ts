import { apiClient, createApiClientSecure, createInstance } from '.';
import { getSession } from 'next-auth/react';
import axios from 'axios';

jest.mock('next-auth/react');
jest.mock('axios');

describe('server', () => {
  const mockGetSession = jest.mocked(getSession);
  const mockAxios = jest.mocked(axios);

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('apiClient', () => {
    it('should not fail', () => {
      let error = false;

      try {
        apiClient;
      } catch (err) {
        error = true;
      }

      expect(error).toBeFalsy();
    });

    it('should create an api-client', () => {
      (axios.create as jest.Mock).mockReturnValue({ axios: 'instance' } as any);
      const client = createInstance(false);

      expect(client).toEqual({ axios: 'instance' });
      expect(mockAxios.create).toHaveBeenNthCalledWith(1, {
        baseURL: undefined,
        headers: { Authorization: '' },
        timeout: 5000,
      });
    });
  });

  describe('createApiClientSecure', () => {
    it('should create a secure api-client', async () => {
      mockGetSession.mockResolvedValue({
        accessToken: 'mock_access_token',
      } as any);

      await createApiClientSecure({} as any);
      expect(mockAxios.create).toHaveBeenLastCalledWith({
        baseURL: undefined,
        headers: { Authorization: 'Bearer mock_access_token' },
        timeout: 5000,
      });
    });
  });
});
