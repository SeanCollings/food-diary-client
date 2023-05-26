import { createApiClientSecure } from '@server/api-client';
import handler from '../../../../pages/api/summary';

jest.mock('@server/api-client');

describe('/api - summary', () => {
  const mockJson = jest.fn();
  const mockStatus = jest.fn().mockReturnValue({ json: mockJson });
  const mockRes = { status: mockStatus };

  const mockApiClientSecure = jest.mocked(createApiClientSecure);
  const mockGet = jest.fn();

  beforeEach(() => {
    mockGet.mockResolvedValue({ data: 'mock_data' });
    mockApiClientSecure.mockReturnValue({ get: mockGet } as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('/GET', () => {
    const mockQuery = { dateFrom: '01-02-2023', dateTo: '02-02-2023' };

    it('should send request', async () => {
      await handler(
        {
          method: 'GET',
          query: mockQuery,
        } as any,
        mockRes as any,
      );

      expect(mockGet).toHaveBeenCalledWith(
        '/summary?dateFrom=01-02-2023&dateTo=02-02-2023',
      );
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith({ data: 'mock_data', ok: true });
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
