import { createApiClientSecure } from '@server/api-client';
import handler from '../../../../pages/api/trends/meal-trends';

jest.mock('@server/api-client');

describe('/api - trends/meal-trends', () => {
  const mockJson = jest.fn();
  const mockStatus = jest.fn().mockReturnValue({ json: mockJson });
  const mockRes = { status: mockStatus };

  const mockApiClientSecure = jest.mocked(createApiClientSecure);
  const mockGet = jest.fn();

  beforeEach(() => {
    mockGet.mockResolvedValue({
      data: {
        totalValues: 4,
        legend: ['WED'],
        mealTotals: { breakfast: 1 },
        mealsPerDay: [{ id: '123', meals: [3] }],
      },
    });
    mockApiClientSecure.mockReturnValue({ get: mockGet } as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('/GET', () => {
    const mockQuery = { type: 'week' };

    it('should send request', async () => {
      await handler(
        {
          method: 'GET',
          query: mockQuery,
        } as any,
        mockRes as any,
      );

      expect(mockGet).toHaveBeenCalledWith('/trends/meal-trends?type=week');
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith({
        legend: ['WED'],
        mealTotals: { breakfast: 1 },
        mealsPerDay: [{ id: '123', meals: [3] }],
        ok: true,
        totalValues: 4,
      });
    });

    it('should cater for missing data', async () => {
      mockGet.mockResolvedValue({
        data: undefined,
      });

      await handler(
        {
          method: 'GET',
          query: mockQuery,
        } as any,
        mockRes as any,
      );

      expect(mockGet).toHaveBeenCalled();
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith({
        legend: undefined,
        mealTotals: undefined,
        mealsPerDay: undefined,
        ok: true,
        totalValues: undefined,
      });
    });

    it('should handle error response', async () => {
      mockGet.mockRejectedValue({
        response: { data: { message: 'mock error message' } },
      });

      await handler(
        {
          method: 'GET',
          query: mockQuery,
        } as any,
        mockRes as any,
      );

      expect(mockGet).toHaveBeenCalled();
      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({
        message: 'mock error message',
        ok: false,
      });
    });

    it('should not allow any other request', async () => {
      await handler(
        {
          method: 'POST',
          query: mockQuery,
        } as any,
        mockRes as any,
      );

      expect(mockGet).not.toHaveBeenCalled();
      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({ ok: false });
    });
  });
});
