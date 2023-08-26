import { render } from '@testing-library/react';
import { ToastContextProvider, useToast } from './toast-context';
import { useEffect, useRef } from 'react';
import { Toasts } from '@components/toasts';

jest.useFakeTimers();
jest.mock('@utils/unique-id', () => ({
  getUniqueId: () => 'randomId',
}));

const TestComponent = () => <div>Test component</div>;

const MockComponentShowToast = () => {
  const stateUpdateRef = useRef<number>(0);
  const { toasts, showToast } = useToast();

  useEffect(() => {
    stateUpdateRef.current += 1;

    if (!Object.keys(toasts).length) {
      const id = showToast({
        message: 'Mock message.',
        title: 'Mock Title',
        status: 'success',
      });
      expect(id).toBeDefined();
    }

    if (stateUpdateRef.current === 2) {
      expect(toasts).toMatchInlineSnapshot(`
        {
          "randomId": {
            "id": "randomId",
            "message": "Mock message.",
            "status": "success",
            "title": "Mock Title",
          },
        }
      `);
    }
  }, [toasts, showToast]);

  return <Toasts toasts={toasts} />;
};

const MockComponentHideToast = () => {
  const firstRenderRef = useRef<boolean>(false);
  const { toasts, showToast, hideToast } = useToast();

  useEffect(() => {
    if (!firstRenderRef.current) {
      if (!Object.keys(toasts).length) {
        showToast({
          message: 'Mock message.',
          title: 'mock Title',
          status: 'success',
        });
      } else {
        firstRenderRef.current = true;
        hideToast('randomId');
      }
    } else if (toasts['randomId']?.isHiding) {
      expect(toasts['randomId'].isHiding).toBeTruthy();
    }
  }, [toasts, showToast, hideToast]);

  return <Toasts toasts={toasts} />;
};

const MockComponentRemoveToast = () => {
  const firstRenderRef = useRef<boolean>(false);
  const { toasts, showToast, removeToast } = useToast();

  useEffect(() => {
    if (!firstRenderRef.current) {
      if (!toasts) {
        showToast({
          message: 'Mock message.',
          title: 'Mock Title',
          status: 'success',
        });
      } else {
        firstRenderRef.current = true;
        removeToast('test');
      }
    }
  }, [toasts, showToast, removeToast]);

  return <Toasts toasts={toasts} />;
};

describe('store - toast-context', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render provider with children', () => {
    const { asFragment } = render(
      <ToastContextProvider>
        <TestComponent />
      </ToastContextProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should show Toast', () => {
    const { asFragment } = render(
      <ToastContextProvider>
        <MockComponentShowToast />
      </ToastContextProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should hide Toast', () => {
    const { asFragment } = render(
      <ToastContextProvider>
        <MockComponentHideToast />
      </ToastContextProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should remove Toast', () => {
    const { asFragment } = render(
      <ToastContextProvider>
        <MockComponentRemoveToast />
      </ToastContextProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
