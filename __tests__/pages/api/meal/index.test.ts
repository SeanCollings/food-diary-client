import { createApiClientSecure } from '@server/api-client';
import handler from '../../../../pages/api/meal';

jest.mock('@server/api-client');

describe('/api - meal', () => {
  const mockQuery = { date: '01-02-2023' };
  const mockBody = {
    mealId: 'breakfast',
    content: { id: '123', food: 'mock_food' },
  };
  const mockJson = jest.fn();
  const mockStatus = jest.fn().mockReturnValue({ json: mockJson });
  const mockRes = { status: mockStatus };

  const mockApiClientSecure = jest.mocked(createApiClientSecure);
  const mockPost = jest.fn();
  const mockPut = jest.fn();
  const mockDelete = jest.fn();

  beforeEach(() => {
    mockPost.mockResolvedValue({});
    mockPut.mockResolvedValue({});
    mockDelete.mockResolvedValue({});
    mockApiClientSecure.mockReturnValue({
      post: mockPost,
      put: mockPut,
      delete: mockDelete,
    } as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('/POST', () => {
    it('should send request', async () => {
      await handler(
        {
          method: 'POST',
          query: mockQuery,
          body: mockBody,
        } as any,
        mockRes as any,
      );

      expect(mockPost).toHaveBeenCalledWith('/meals?date=01-02-2023', {
        content: { food: 'mock_food', id: '123' },
        mealId: 'breakfast',
      });
      expect(mockStatus).toHaveBeenCalledWith(201);
      expect(mockJson).toHaveBeenCalledWith({ ok: true });
    });
  });

  describe('/PUT', () => {
    it('should send request', async () => {
      await handler(
        {
          method: 'PUT',
          query: mockQuery,
          body: mockBody,
        } as any,
        mockRes as any,
      );

      expect(mockPut).toHaveBeenCalledWith('/meals?date=01-02-2023', {
        content: { food: 'mock_food', id: '123' },
        mealId: 'breakfast',
      });
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith({ ok: true });
    });
  });

  describe('/DELETE', () => {
    it('should send request', async () => {
      await handler(
        {
          method: 'DELETE',
          query: mockQuery,
          body: mockBody,
        } as any,
        mockRes as any,
      );

      expect(mockDelete).toHaveBeenCalledWith('/meals?date=01-02-2023', {
        data: {
          content: { food: 'mock_food', id: '123' },
          mealId: 'breakfast',
        },
      });
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith({ ok: true });
    });
  });

  it('should handle error response', async () => {
    mockPost.mockRejectedValue({
      response: { data: { message: 'mock error message' } },
    });

    await handler(
      {
        method: 'POST',
        query: mockQuery,
      } as any,
      mockRes as any,
    );

    expect(mockPost).toHaveBeenCalled();
    expect(mockStatus).toHaveBeenCalledWith(500);
    expect(mockJson).toHaveBeenCalledWith({
      message: 'mock error message',
      ok: false,
    });
  });
});
