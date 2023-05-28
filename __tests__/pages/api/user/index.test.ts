import { createApiClientSecure } from '@server/api-client';
import handler from '../../../../pages/api/user';

jest.mock('@server/api-client');

describe('/api - user', () => {
  const mockJson = jest.fn();
  const mockStatus = jest.fn().mockReturnValue({ json: mockJson });
  const mockRes = { status: mockStatus };

  const mockApiClientSecure = jest.mocked(createApiClientSecure);
  const mockGet = jest.fn();
  const mockPatch = jest.fn();

  beforeEach(() => {
    mockGet.mockResolvedValue({});
    mockPatch.mockResolvedValue({});
    mockApiClientSecure.mockReturnValue({
      get: mockGet,
      patch: mockPatch,
    } as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('/GET', () => {
    it('should send request', async () => {
      await handler(
        {
          method: 'GET',
        } as any,
        mockRes as any,
      );

      expect(mockGet).toHaveBeenCalledWith('/user/profile');
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith({ ok: true });
    });
  });

  describe('/PATCH', () => {
    it('should send request', async () => {
      await handler(
        {
          method: 'PATCH',
          body: { name: 'Mock Name' },
        } as any,
        mockRes as any,
      );

      expect(mockPatch).toHaveBeenCalledWith('/user', { name: 'Mock Name' });
      expect(mockStatus).toHaveBeenCalledWith(201);
      expect(mockJson).toHaveBeenCalledWith({ ok: true });
    });
  });

  it('should handle errors', async () => {
    mockGet.mockRejectedValue({
      response: { data: { message: 'mock error occurred' } },
    });

    await handler(
      {
        method: 'GET',
      } as any,
      mockRes as any,
    );

    expect(mockGet).toHaveBeenCalled();
    expect(mockStatus).toHaveBeenCalledWith(500);
    expect(mockJson).toHaveBeenCalledWith({
      ok: false,
      message: 'mock error occurred',
    });
  });

  it('should not send request if not GET or PATCH', async () => {
    await handler(
      {
        method: 'POST',
        body: { name: 'Mock Name' },
      } as any,
      mockRes as any,
    );

    expect(mockPatch).not.toHaveBeenCalled();
    expect(mockGet).not.toHaveBeenCalled();
    expect(mockStatus).toHaveBeenCalledWith(500);
    expect(mockJson).toHaveBeenCalledWith({ ok: false });
  });
});
