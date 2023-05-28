import { createApiClientSecure } from '@server/api-client';
import handler from '../../../../pages/api/user/preferences';
import { IPartialPreference } from '@store/user-context';

jest.mock('@server/api-client');

describe('/api - user/preferences', () => {
  const mockJson = jest.fn();
  const mockStatus = jest.fn().mockReturnValue({ json: mockJson });
  const mockRes = { status: mockStatus };

  const mockApiClientSecure = jest.mocked(createApiClientSecure);
  const mockPatch = jest.fn();

  beforeEach(() => {
    mockPatch.mockResolvedValue({});
    mockApiClientSecure.mockReturnValue({ patch: mockPatch } as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('/PATCH', () => {
    const mockBody: IPartialPreference = {
      showDayStreak: true,
      showWeeklyExcercise: false,
      showWeeklyWater: true,
    };

    it('should send request', async () => {
      await handler(
        {
          method: 'PATCH',
          body: mockBody,
        } as any,
        mockRes as any,
      );

      expect(mockPatch).toHaveBeenCalledWith('/user/preferences', {
        showDayStreak: true,
        showWeeklyExcercise: false,
        showWeeklyWater: true,
      });
      expect(mockStatus).toHaveBeenCalledWith(201);
      expect(mockJson).toHaveBeenCalledWith({ ok: true });
    });

    it('should handle errors', async () => {
      mockPatch.mockRejectedValue({
        response: { data: { message: 'mock error occurred' } },
      });

      await handler(
        {
          method: 'PATCH',
          body: mockBody,
        } as any,
        mockRes as any,
      );

      expect(mockPatch).toHaveBeenCalled();
      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({
        message: 'mock error occurred',
        ok: false,
      });
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

    expect(mockPatch).not.toHaveBeenCalled();
    expect(mockStatus).toHaveBeenCalledWith(500);
    expect(mockJson).toHaveBeenCalledWith({
      ok: false,
    });
  });
});
