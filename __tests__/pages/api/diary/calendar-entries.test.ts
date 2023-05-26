import { createApiClientSecure } from '@server/api-client';
import handler from '../../../../pages/api/diary/calendar-entries';

jest.mock('@server/api-client');

describe('/api - calendar-entries', () => {
  const mockJson = jest.fn();
  const mockStatus = jest.fn().mockReturnValue({ json: mockJson });
  const mockRes = { status: mockStatus };

  const mockApiClientSecure = jest.mocked(createApiClientSecure);
  const mockGet = jest.fn();

  beforeEach(() => {
    mockGet.mockResolvedValue({
      data: {
        entries: { '02-2023': [1, 4, 7] },
        monthRange: { '02-2023': true },
      },
    });
    mockApiClientSecure.mockReturnValue({ get: mockGet } as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('/GET', () => {
    const mockQuery = {
      date: '01-02-2023',
      months: '4',
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
        '/diary/calendar-entries?date=01-02-2023&months=4',
      );
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith({
        ok: true,
        entries: {
          '02-2023': [1, 4, 7],
        },
        months: {
          '02-2023': true,
        },
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
        entries: undefined,
        months: undefined,
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
