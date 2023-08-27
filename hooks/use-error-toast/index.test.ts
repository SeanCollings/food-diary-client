import { useToast } from '@store/toast-context';
import { act, renderHook } from '@testing-library/react';
import { useErrorToast } from '.';

jest.mock('@store/toast-context');

const mockUseToast = jest.mocked(useToast);

describe('hook - useErrorToast', () => {
  const mockShowToast = jest.fn().mockReturnValue('mock_id');
  const mockRemoveToast = jest.fn();

  beforeEach(() => {
    mockUseToast.mockReturnValue({
      showToast: mockShowToast,
      removeToast: mockRemoveToast,
    } as any);
  });

  afterEach(() => jest.clearAllMocks());

  it('should not call showToast if isError undefined', () => {
    renderHook(() =>
      useErrorToast({
        title: 'Mock Title',
        message: 'Mock message.',
      }),
    );

    expect(mockShowToast).not.toHaveBeenCalled();
  });

  it('should call showToast if isError true', () => {
    renderHook(() =>
      useErrorToast({
        error: true,
        title: 'Mock Title',
        message: 'Mock message.',
      }),
    );

    expect(mockShowToast).toHaveBeenCalledWith({
      message: 'Mock message.',
      status: 'error',
      title: 'Mock Title',
    });
  });

  it('should removeToast if clear flag passed in', async () => {
    renderHook(() =>
      useErrorToast({
        error: true,
        title: 'Mock Title',
        message: 'Mock message.',
        clear: true,
      }),
    );

    await act(() => Promise.resolve());

    expect(mockRemoveToast).toHaveBeenCalledWith('mock_id');
  });
});
