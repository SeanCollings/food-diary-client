import { createApiClientSecure } from '@server/api-client';
import handler from '../../../../pages/api/user/generate-link';

jest.mock('@server/api-client');

describe('/api - user/generate-link', () => {
  const mockJson = jest.fn();
  const mockStatus = jest.fn().mockReturnValue({ json: mockJson });
  const mockRes = { status: mockStatus };

  const mockApiClientSecure = jest.mocked(createApiClientSecure);
  const mockPut = jest.fn();

  beforeEach(() => {
    mockPut.mockResolvedValue({ data: { shareLink: 'mock_sharelink' } });
    mockApiClientSecure.mockReturnValue({ put: mockPut } as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('/PUT', () => {
    it('should send request', async () => {
      await handler(
        {
          method: 'PUT',
        } as any,
        mockRes as any,
      );

      expect(mockPut).toHaveBeenCalledWith('/share/generate-link');
      expect(mockStatus).toHaveBeenCalledWith(201);
      expect(mockJson).toHaveBeenCalledWith({
        ok: true,
        shareLink: 'mock_sharelink',
      });
    });

    it('should handle errors', async () => {
      mockPut.mockRejectedValue({
        response: { data: { message: 'mock error occurred' } },
      });

      await handler(
        {
          method: 'PUT',
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

    it('should not send request if not a PUT', async () => {
      await handler(
        {
          method: 'POST',
          body: {},
        } as any,
        mockRes as any,
      );

      expect(mockPut).not.toHaveBeenCalled();
      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({
        ok: false,
      });
    });
  });
});
