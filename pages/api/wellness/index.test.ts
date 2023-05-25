import { createApiClientSecure } from '@server/api-client';
import { IWellnessEntriesDto } from '@lib/interfaces/wellness.interface';
import handler from './';

jest.mock('@server/api-client');

describe('/api - wellness', () => {
  const mockJson = jest.fn();
  const mockStatus = jest.fn().mockReturnValue({ json: mockJson });
  const mockRes = { status: mockStatus };

  const mockApiClientSecure = jest.mocked(createApiClientSecure);
  const mockPut = jest.fn();

  beforeEach(() => {
    mockPut.mockResolvedValue({});
    mockApiClientSecure.mockReturnValue({ put: mockPut } as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('/put', () => {
    const mockBody: IWellnessEntriesDto = {
      '01-02-2023': {
        date: '01-02-2023',
        water: { value: 4 },
        tea_coffee: { value: 2 },
        alcohol: { value: 1 },
        excercise: { time: '00:35', details: 'Run and walk' },
      },
    };

    it('should send request', async () => {
      await handler(
        {
          method: 'PUT',
          body: mockBody,
        } as any,
        mockRes as any,
      );

      expect(mockPut).toHaveBeenCalledWith('/wellness', {
        data: [
          {
            alcohol: { value: 1 },
            date: '01-02-2023',
            excercise: { details: 'Run and walk', time: '00:35' },
            tea_coffee: { value: 2 },
            water: { value: 4 },
          },
        ],
      });
      expect(mockStatus).toHaveBeenCalledWith(201);
      expect(mockJson).toHaveBeenCalledWith({ ok: true });
    });

    it('should handle errors', async () => {
      mockPut.mockRejectedValue({
        response: { data: { message: 'mock error occurred' } },
      });

      await handler(
        {
          method: 'PUT',
          body: mockBody,
        } as any,
        mockRes as any,
      );

      expect(mockPut).toHaveBeenCalled();
      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({
        message: 'mock error occurred',
        ok: false,
      });
    });
  });

  describe('ignore', () => {
    it('should not send request if not a PUT', async () => {
      await handler(
        {
          method: 'POST',
          body: {},
        } as any,
        mockRes as any,
      );

      expect(mockPut).not.toHaveBeenCalled();
      expect(mockStatus).not.toHaveBeenCalled();
      expect(mockJson).not.toHaveBeenCalled();
    });
  });
});
