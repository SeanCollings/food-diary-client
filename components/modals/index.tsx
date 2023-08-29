import {
  COLOURS,
  MEDIA_MOBILE,
  MEDIA_TABLET,
  OPACITY_40,
} from '@utils/app.constants';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

interface ISBackgroundContainer {
  blurBackground: boolean;
}
interface ISModalContainer {
  modalWidth: number;
}

const SBackgroundContainer = styled.div<ISBackgroundContainer>`
  z-index: 100;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;

  ${({ blurBackground }) =>
    blurBackground && `background: ${COLOURS.black}${OPACITY_40}`};

  ${MEDIA_TABLET} {
    padding: 2rem;
  }
  ${MEDIA_MOBILE} {
    padding: 0rem;
    max-height: 100vh;
  }
`;
const SModalContainer = styled.div<ISModalContainer>`
  box-shadow: 0px 4px 8px ${COLOURS.black}${OPACITY_40};
  border-radius: 12px;
  overflow-x: hidden;
  align-items: center;
  display: flex;
  margin: auto;

  max-width: ${({ modalWidth }) => modalWidth}px;

  ${MEDIA_MOBILE} {
    border-radius: 0px;
  }
`;

interface IModalCommonProps {
  children: ReactNode;
  modalWidth: number;
}

interface IModalProps extends IModalCommonProps {
  blurBackground?: boolean;
  show: boolean;
}

const ModalContent: React.FC<IModalCommonProps> = ({
  children,
  modalWidth,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  return (
    <SModalContainer ref={modalRef} modalWidth={modalWidth}>
      {children}
    </SModalContainer>
  );
};

const Modal: FC<IModalProps> = ({ show, ...rest }) => {
  const [domReady, setDomReady] = useState(false);

  useEffect(() => {
    setDomReady(true);
  }, []);

  if (!domReady) {
    return null;
  }

  if (show) {
    const scrollbarWidth = window.innerWidth - document.body.clientWidth;
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.paddingRight = `${scrollbarWidth}px`;
    document.documentElement.style.backgroundColor = 'var(--bg-primary)';
  } else {
    document.documentElement.style.overflow = 'auto';
    document.documentElement.style.paddingRight = '0px';
    document.documentElement.style.backgroundColor = 'unset';
  }

  return ReactDOM.createPortal(
    show ? (
      <SBackgroundContainer blurBackground>
        <ModalContent {...rest} />
      </SBackgroundContainer>
    ) : null,
    document.getElementById('modal-root')!,
  );
};

export default Modal;
