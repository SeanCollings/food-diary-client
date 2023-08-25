import { useToast } from '@store/toast-context';
import { renderHook } from '@testing-library/react';
import { useErrorToast } from '.';

jest.mock('@store/toast-context');

const mockUseToast = jest.mocked(useToast);

describe('hook - useErrorToast', () => {
  const mockShowToast = jest.fn();

  beforeEach(() => {
    mockUseToast.mockReturnValue({ showToast: mockShowToast } as any);
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
        isError: 'mock error',
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
});
