import {
  TToastStatus,
  ToastStatus,
  ToastWithId,
  useToast,
} from '@store/toast-context';
import { FC, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { MdErrorOutline, MdOutlineCheck, MdClose } from 'react-icons/md';
import { getClassNames } from '@utils/string-utils';
import { APP_THEME_DEFAULT, MEDIA_MOBILE } from '@utils/app.constants';

const TOAST_HEIGHT = 78;
const MAX_WIDTH = 416;
const TOP_PADDING = 4;
export const HIDE_TOAST_TIMER = 5000;

interface ISToastContainer {
  animateStyle: AnimateStyle;
  toastPosition: number;
}

const SToastContainer = styled.div<ISToastContainer>`
  position: fixed;
  min-height: ${TOAST_HEIGHT}px;
  display: table;
  width: 90%;
  max-width: ${MAX_WIDTH}px;
  box-shadow: 0px 4px 8px rgba(35, 35, 35, 0.2);
  border-radius: 4px;
  color: ${APP_THEME_DEFAULT.textLight};

  ${({ toastPosition }) => `top: ${toastPosition + TOP_PADDING}px`};
  z-index: 1000;

  animation-name: ${({ animateStyle }) => animateStyle.type};
  animation-duration: 0.1s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;

  right: 2rem;
  ${MEDIA_MOBILE} {
    right: 1rem;
  }

  @keyframes enter {
    from {
      opacity: 0;
      right: -${MAX_WIDTH / 4}px;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes exit {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
      right: -${MAX_WIDTH / 4}px;
    }
  }
`;
const SInnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 4px;
  padding: 16px;

  &.success {
    background-color: var(--success);
  }
  &.error {
    background-color: var(--error);
  }
`;
const SContentWrapper = styled.div`
  flex: 1;
  padding-left: 8px;
  padding-right: 8px;
`;
const SHeader = styled.div`
  display: flex;
  align-items: center;
`;
const SHeaderContainer = styled(SHeader)`
  justify-content: space-between;
`;
const SHeaderH5 = styled.h5`
  margin: 0;
  font-size: 16px;
  line-height: 1.8;
`;
const SMessage = styled.p`
  margin: 0;
  font-size: 14px;
`;
const SMdClose = styled(MdClose)`
  cursor: pointer;
  :hover {
    opacity: 0.6;
  }
`;

type AnimateStyleType = 'enter' | 'exit';

interface AnimateStyle {
  type: AnimateStyleType;
}

interface ToastProps {
  toastId: string;
  toast: ToastWithId;
  toastPosition: number;
}

const getToastIcon = (type: TToastStatus) =>
  ({
    [ToastStatus.SUCCESS]: MdOutlineCheck,
    [ToastStatus.ERROR]: MdErrorOutline,
  }[type]);

export const Toast: FC<ToastProps> = ({ toast, toastId, toastPosition }) => {
  const toastRef = useRef<HTMLDivElement>(null);
  const { removeToast, hideToast } = useToast();

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const toastRefCurrent = toastRef.current;

    const animationHasEnded = () => {
      if (toast.isHiding) {
        removeToast(toastId);
      }
    };

    if (toast.timeDismissed) {
      timer = setTimeout(() => {
        hideToast(toastId);
      }, HIDE_TOAST_TIMER);
    }

    toastRefCurrent?.addEventListener('animationend', () =>
      animationHasEnded(),
    );

    return () => {
      clearTimeout(timer);
      toastRefCurrent?.addEventListener('animationend', animationHasEnded);
    };
  }, [hideToast, removeToast, toast.isHiding, toast.timeDismissed, toastId]);

  const animateStyle: AnimateStyle = toast.isHiding
    ? { type: 'exit' }
    : { type: 'enter' };

  const ToastIcon = getToastIcon(toast.status);
  const classColour = getClassNames({
    success: toast.status === 'success',
    error: toast.status === 'error',
  });

  return (
    <SToastContainer
      ref={toastRef}
      animateStyle={animateStyle}
      toastPosition={toastPosition}
      id={`toast-${toastId}`}
      data-testid={`toast-${toastId}`}
    >
      <SInnerContainer className={classColour}>
        <ToastIcon size={28} color={APP_THEME_DEFAULT.textLight} />
        <SContentWrapper>
          <SHeaderContainer>
            <SHeader>
              <SHeaderH5>{toast.title}</SHeaderH5>
            </SHeader>
          </SHeaderContainer>
          <SMessage>{toast.message}</SMessage>
        </SContentWrapper>
        <SMdClose
          size={28}
          color={APP_THEME_DEFAULT.textLight}
          onClick={() => hideToast(toast.id)}
          data-testid="toast-dismiss"
        />
      </SInnerContainer>
    </SToastContainer>
  );
};
