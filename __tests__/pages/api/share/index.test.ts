import { apiClient } from '@server/api-client';
import handler from '../../../../pages/api/share';

jest.mock('@server/api-client');

describe('/api - share', () => {
  const mockJson = jest.fn();
  const mockStatus = jest.fn().mockReturnValue({ json: mockJson });
  const mockRes = { status: mockStatus };

  const mockApiClient = jest.mocked(apiClient);
  const mockGet = jest.fn();

  beforeEach(() => {
    mockGet.mockResolvedValue({ data: 'mock_data' });
    mockApiClient.get.mockImplementation(mockGet);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('/GET', () => {
    const mockQuery = {
      link: 'mock_link',
      dateFrom: '01-02-2023',
      dateTo: '02-02-2023',
    };

    it('should send request', async () => {
      await handler(
        {
          method: 'GET',
          query: mockQuery,
        } as any,
        mockRes as any,
      );

      expect(mockGet).toHaveBeenCalledWith(
        '/share?link=mock_link&dateFrom=01-02-2023&dateTo=02-02-2023',
      );
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith({ ok: true, summary: 'mock_data' });
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
