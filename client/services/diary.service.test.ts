import axios from 'axios';
import { diaryService } from './diary.service';

jest.mock('axios');

const mockAxios = jest.mocked(axios);

describe('diary-service', () => {
  const mockBody = { mock: 'body' } as any;
  const today = '01-02-2023';

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createMealEntry', () => {
    it('should post to create meal entry', async () => {
      mockAxios.post.mockReturnValue({} as any);

      const result = await diaryService.createMealEntry({
        date: today,
        body: mockBody,
      });
      expect(result).toEqual({ ok: true });
      expect(mockAxios.post).toHaveBeenCalledWith(
        '/api/meal?date=01-02-2023',
        mockBody,
      );
    });

    it('should handle errors', async () => {
      mockAxios.post.mockRejectedValue({} as any);

      const result = await diaryService.createMealEntry({
        date: today,
        body: mockBody,
      });
      expect(result).toMatchInlineSnapshot(`
        {
          "error": "Something went wrong",
        }
      `);
    });
  });

  describe('updateMealEntry', () => {
    it('should put to update meal entry', async () => {
      mockAxios.put.mockReturnValue({} as any);

      const result = await diaryService.updateMealEntry({
        date: today,
        body: mockBody,
      });
      expect(result).toEqual({ ok: true });
      expect(mockAxios.put).toHaveBeenCalledWith(
        '/api/meal?date=01-02-2023',
        mockBody,
      );
    });

    it('should handle errors', async () => {
      mockAxios.put.mockRejectedValue({} as any);

      const result = await diaryService.updateMealEntry({
        date: today,
        body: mockBody,
      });
      expect(result).toMatchInlineSnapshot(`
        {
          "error": "Something went wrong",
        }
      `);
    });
  });

  describe('deleteMealEntry', () => {
    it('should delete meal entry', async () => {
      mockAxios.delete.mockReturnValue({} as any);

      const result = await diaryService.deleteMealEntry({
        date: today,
        body: mockBody,
      });
      expect(result).toEqual({ ok: true });
      expect(mockAxios.delete).toHaveBeenCalledWith(
        '/api/meal?date=01-02-2023',
        { data: mockBody },
      );
    });

    it('should handle errors', async () => {
      mockAxios.delete.mockRejectedValue({} as any);

      const result = await diaryService.deleteMealEntry({
        date: today,
        body: mockBody,
      });
      expect(result).toMatchInlineSnapshot(`
        {
          "error": "Something went wrong",
        }
      `);
    });
  });

  describe('updateWellnessEntries', () => {
    it('should put to update wellness entries', async () => {
      mockAxios.put.mockReturnValue({} as any);

      const result = await diaryService.updateWellnessEntries({
        body: mockBody,
      });
      expect(result).toEqual({ ok: true });
      expect(mockAxios.put).toHaveBeenCalledWith('/api/wellness', mockBody);
    });

    it('should handle errors', async () => {
      mockAxios.put.mockRejectedValue({} as any);

      const result = await diaryService.updateWellnessEntries({
        body: mockBody,
      });
      expect(result).toMatchInlineSnapshot(`
        {
          "error": "Something went wrong",
        }
      `);
    });
  });
});
