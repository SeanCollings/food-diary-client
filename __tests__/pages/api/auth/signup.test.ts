import { apiClient } from '@server/api-client';
import handler from '../../../../pages/api/auth/signup';

jest.mock('@server/api-client');

describe('/api - auth/signup', () => {
  const mockJson = jest.fn();
  const mockStatus = jest.fn().mockReturnValue({ json: mockJson });
  const mockRes = { status: mockStatus };
  const mockError = jest.fn();

  const mockApiClient = jest.mocked(apiClient);
  const mockPost = jest.fn();

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(mockError);
  });

  beforeEach(() => {
    mockPost.mockResolvedValue({});
    mockApiClient.post.mockImplementation(mockPost);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('/POST', () => {
    const mockBody = {
      email: 'test@email.com',
      password: 'password',
      name: 'Mock Name',
      token: 'mock_token',
    };

    it('should send request', async () => {
      await handler(
        {
          method: 'POST',
          body: mockBody,
        } as any,
        mockRes as any,
      );

      expect(mockPost).toHaveBeenCalledWith('/auth/signup', {
        email: 'test@email.com',
        name: 'Mock Name',
        password: 'password',
        token: 'mock_token',
      });
      expect(mockStatus).toHaveBeenCalledWith(201);
      expect(mockJson).toHaveBeenCalledWith({
        ok: true,
        message: 'User created',
      });
    });

    it('should handle errors', async () => {
      mockPost.mockRejectedValue({ message: 'mock error occurred' });

      await handler(
        {
          method: 'POST',
          body: mockBody,
        } as any,
        mockRes as any,
      );

      expect(mockPost).toHaveBeenCalled();
      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({
        message: 'mock error occurred',
        ok: false,
      });
    });
  });

  it('should not send request if not a POST', async () => {
    await handler(
      {
        method: 'PUT',
        body: {},
      } as any,
      mockRes as any,
    );

    expect(mockPost).not.toHaveBeenCalled();
    expect(mockStatus).toHaveBeenCalledWith(500);
    expect(mockJson).toHaveBeenCalledWith({ ok: false });
  });
});
