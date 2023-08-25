import axios from 'axios';
import { userService } from './user.service';

jest.mock('axios');

const mockAxios = jest.mocked(axios);

describe('user-service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('updateUser', () => {
    const mockBody = { name: 'Mock Name' };

    it('should patch update user', async () => {
      mockAxios.patch.mockResolvedValue({});

      const result = await userService.updateUser(mockBody);

      expect(result).toEqual({ ok: true });
      expect(mockAxios.patch).toHaveBeenCalledWith('/api/user', mockBody);
    });

    it('should handle errors', async () => {
      mockAxios.patch.mockRejectedValue({});

      const result = await userService.updateUser(mockBody);
      expect(result).toMatchInlineSnapshot(`
        {
          "error": "Something went wrong",
        }
      `);
    });
  });

  describe('updatePreferences', () => {
    const mockBody = { showDayStreak: true };

    it('should patch update user preferences', async () => {
      mockAxios.patch.mockResolvedValue({});

      const result = await userService.updatePreferences(mockBody);

      expect(result).toEqual({ ok: true });
      expect(mockAxios.patch).toHaveBeenCalledWith(
        '/api/user/preferences',
        mockBody,
      );
    });

    it('should handle errors', async () => {
      mockAxios.patch.mockRejectedValue({});

      const result = await userService.updatePreferences(mockBody);
      expect(result).toMatchInlineSnapshot(`
        {
          "error": "Something went wrong",
        }
      `);
    });
  });

  describe('updateSharePreference', () => {
    const mockBody = {
      isProfileShared: true,
    };

    it('should put update share preference', async () => {
      mockAxios.put.mockResolvedValue({});

      const result = await userService.updateSharePreference(mockBody);

      expect(result).toEqual({ ok: true });
      expect(mockAxios.put).toHaveBeenCalledWith('/api/share/link-shareable', {
        isShared: true,
      });
    });

    it('should handle errors', async () => {
      mockAxios.put.mockRejectedValue({});

      const result = await userService.updateSharePreference(mockBody);
      expect(result).toMatchInlineSnapshot(`
        {
          "error": "Something went wrong",
        }
      `);
    });
  });

  describe('generateLink', () => {
    it('should put generate a link', async () => {
      mockAxios.put.mockResolvedValue({
        data: { shareLink: 'mock_sharelink' },
      });

      const result = await userService.generateLink();

      expect(result).toEqual({ ok: true, shareLink: 'mock_sharelink' });
      expect(mockAxios.put).toHaveBeenCalledWith('/api/user/generate-link');
    });

    it('should handle errors', async () => {
      mockAxios.put.mockRejectedValue({});

      const result = await userService.generateLink();
      expect(result).toMatchInlineSnapshot(`
        {
          "error": "Something went wrong",
        }
      `);
    });
  });
});
