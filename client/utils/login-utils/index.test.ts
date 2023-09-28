import { authService } from '@client/services/auth.service';
import { createUser, resetPassword, signInUser } from '.';

jest.mock('@utils/grecaptcha-utils', () => ({
  getRecaptchaToken: jest.fn().mockReturnValue('mock_recaptcha_token'),
}));
jest.mock('@client/services/auth.service', () => ({
  authService: {
    signup: jest.fn(),
    signin: jest.fn(),
    resetPassword: jest.fn(),
  },
}));

describe('login-utils', () => {
  afterEach(() => jest.clearAllMocks());

  describe('createUser', () => {
    const mockUser = {
      email: 'test@email.com',
      name: 'Mock Name',
      password: 'password',
    };

    it('should create a new user', async () => {
      jest
        .spyOn(authService, 'signup')
        .mockResolvedValue({ message: 'Successful' });

      const result = await createUser(mockUser);
      expect(result).toEqual({
        message: 'Successful',
      });
    });

    it('should return error from signup', async () => {
      jest
        .spyOn(authService, 'signup')
        .mockResolvedValue({ error: 'An error occurred', status: 500 });

      const result = await createUser(mockUser);
      expect(result).toEqual({
        error: {
          message: 'An error occurred',
          status: 500,
        },
      });
    });

    it('should catch errors', async () => {
      jest
        .spyOn(authService, 'signup')
        .mockRejectedValue({ message: 'An error occurred', status: 409 });

      const result = await createUser(mockUser);
      expect(result).toEqual({
        error: {
          message: 'An error occurred',
          status: 409,
        },
      });
    });

    it('should catch errors and send default error message', async () => {
      jest.spyOn(authService, 'signup').mockRejectedValue({});

      const result = await createUser(mockUser);
      expect(result).toEqual({
        error: {
          message: 'Something went wrong',
          status: 500,
        },
      });
    });
  });

  describe('signInUser', () => {
    const mockUser = {
      email: 'test@email.com',
      password: 'password',
    };

    it('should sign in a new user', async () => {
      jest.spyOn(authService, 'signin').mockResolvedValue({
        status: 200,
        ok: true,
        error: undefined,
        url: null,
      });

      const result = await signInUser(mockUser);
      expect(result).toEqual({
        error: undefined,
        ok: true,
        status: 200,
        url: null,
      });
    });

    it('should catch errors', async () => {
      jest.spyOn(authService, 'signin').mockRejectedValue({
        message: 'An error occurred',
      });

      const result = await signInUser(mockUser);
      expect(result).toEqual({
        error: 'An error occurred',
      });
    });

    it('should catch errors and send default error message', async () => {
      jest.spyOn(authService, 'signin').mockRejectedValue({});

      const result = await signInUser(mockUser);
      expect(result).toEqual({
        error: 'Something went wrong',
      });
    });
  });

  describe('resetPassword', () => {
    const mockUser = {
      email: 'test@email.com',
    };

    it('should sign in a new user', async () => {
      jest.spyOn(authService, 'resetPassword').mockResolvedValue({
        ok: true,
        message: 'Successful',
      });

      const result = await resetPassword(mockUser);
      expect(result).toEqual({
        message: 'Successful',
        ok: true,
      });
    });

    it('should catch errors', async () => {
      jest.spyOn(authService, 'resetPassword').mockRejectedValue({
        message: 'An error occurred',
      });

      const result = await resetPassword(mockUser);
      expect(result).toEqual({
        error: 'An error occurred',
      });
    });

    it('should catch errors and send default error message', async () => {
      jest.spyOn(authService, 'resetPassword').mockRejectedValue({});

      const result = await resetPassword(mockUser);
      expect(result).toEqual({
        error: 'Something went wrong',
      });
    });
  });
});
