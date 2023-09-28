import axios from 'axios';
import { signIn } from 'next-auth/react';
import { authService } from './auth.service';

jest.mock('axios');
jest.mock('next-auth/react');

const mockAxios = jest.mocked(axios);
const mockSignIn = jest.mocked(signIn);

describe('auth-service', () => {
  const mockBody = { mock: 'body' } as any;

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('signup', () => {
    it('should send signup request', async () => {
      mockAxios.post.mockResolvedValue({ data: { message: 'mock_success' } });

      const result = await authService.signup(mockBody);

      expect(mockAxios.post).toHaveBeenCalledWith('/api/auth/signup', mockBody);
      expect(result).toMatchInlineSnapshot(`
        {
          "message": "mock_success",
          "ok": true,
        }
      `);
    });

    it('should handle errors', async () => {
      mockAxios.post.mockRejectedValue({});

      const result = await authService.signup(mockBody);
      expect(result).toMatchInlineSnapshot(`
        {
          "error": "Something went wrong",
          "status": 500,
        }
      `);
    });
  });

  describe('signin', () => {
    it('should send signin request', async () => {
      mockSignIn.mockResolvedValue({ ok: true, status: 201 } as any);

      const result = await authService.signin(mockBody);

      expect(mockSignIn).toHaveBeenCalledWith('credentials', {
        ...mockBody,
        redirect: false,
      });
      expect(result).toMatchInlineSnapshot(`
        {
          "ok": true,
          "status": 201,
        }
      `);
    });

    it('should handle errors', async () => {
      mockSignIn.mockRejectedValueOnce({ message: 'An error occurred' });

      const result = await authService.signin(mockBody);
      expect(result).toMatchInlineSnapshot(`
        {
          "error": "An error occurred",
        }
      `);
    });
  });

  describe('resetPassword', () => {
    it('should send resetPassword request', async () => {
      mockAxios.post.mockResolvedValue({ data: { message: 'mock_success' } });

      const result = await authService.resetPassword(mockBody);

      expect(mockAxios.post).toHaveBeenCalledWith(
        '/api/auth/reset-password',
        mockBody,
      );
      expect(result).toMatchInlineSnapshot(`
        {
          "message": "mock_success",
          "ok": true,
        }
      `);
    });

    it('should handle errors', async () => {
      mockAxios.post.mockRejectedValue({});

      const result = await authService.resetPassword(mockBody);
      expect(result).toMatchInlineSnapshot(`
        {
          "error": "Something went wrong",
        }
      `);
    });
  });
});
