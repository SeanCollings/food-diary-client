import { createApiClientSecure } from '@server/api-client';
import handler from '../../../../pages/api/trends/excercise-trends';

jest.mock('@server/api-client');

describe('/api - trends/excercise-trends', () => {
  const mockJson = jest.fn();
  const mockStatus = jest.fn().mockReturnValue({ json: mockJson });
  const mockRes = { status: mockStatus };

  const mockApiClientSecure = jest.mocked(createApiClientSecure);
  const mockGet = jest.fn();

  beforeEach(() => {
    mockGet.mockResolvedValue({
      data: {
        highestValue: 4,
        legend: ['WED'],
        excercisePerDay: [3],
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

      expect(mockGet).toHaveBeenCalledWith(
        '/trends/excercise-trends?type=week',
      );
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith({
        excercisePerDay: [3],
        highestValue: 4,
        legend: ['WED'],
        ok: true,
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
        excercisePerDay: undefined,
        highestValue: undefined,
        legend: undefined,
        ok: true,
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
