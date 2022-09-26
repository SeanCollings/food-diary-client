import { useMenuContext } from '@store/menu-context';
import {
  APP_THEME_DEFAULT,
  COLOURS,
  MEDIA_MAX_DESKTOP,
  MEDIA_MOBILE,
  OPACITY_70,
} from '@utils/constants';
import { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { MENU_ITEMS } from '@components/menu/menu.constants';
import { useRouter } from 'next/router';
import Link from 'next/link';
import MenuIcon from '@components/menu/menu-icon/index';
import { useOnClickOutsideElementsArray } from '@hooks/use-onclick-outside-element';

const MENU_WIDTH = 350;

type TAnimateStyle = 'open' | 'close' | 'idle';

interface ISContainer {
  animateStyle: TAnimateStyle;
}
interface ISContent {
  isCurrentPath: boolean;
}
interface ISMenuIconContainer {
  isOpen: boolean;
}

const SContainer = styled.div<ISContainer>`
  position: fixed;
  right: 0;
  background: ${APP_THEME_DEFAULT.backgroundPrimary};
  height: 100%;
  z-index: 101;
  width: 0;

  animation-name: ${({ animateStyle }) => animateStyle};
  animation-duration: 0.2s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;

  @keyframes open {
    from {
      box-shadow: none;
      width: 0;
    }
    to {
      box-shadow: 0px 0px 20px 1px ${COLOURS.black}${OPACITY_70};
      width: ${MENU_WIDTH}px;

      ${MEDIA_MOBILE} {
        width: 100%;
      }
    }
  }

  @keyframes close {
    from {
      box-shadow: 0px 0px 20px 1px ${COLOURS.black}${OPACITY_70};
      width: ${MENU_WIDTH}px;

      ${MEDIA_MOBILE} {
        width: 100%;
      }
    }
    to {
      box-shadow: none;
      width: 0px;
    }
  }

  ${MEDIA_MAX_DESKTOP} {
    display: none;
  }
`;
const SMenuIconContainer = styled.div<ISMenuIconContainer>`
  position: relative;
  top: 60px;
  height: 55px;
  display: flex;
  justify-content: end;
  transition: 0.05s;

  margin-right: ${({ isOpen }) => (isOpen ? `2rem` : `-1000rem`)};

  ${MEDIA_MOBILE} {
    top: 15px;
    margin-right: ${({ isOpen }) => (isOpen ? `15px` : `-1000rem`)};
  }
`;
const SContents = styled.div`
  position: relative;
  top: 50px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: ${MENU_WIDTH}px;
  ${MEDIA_MOBILE} {
    top: 0px;
  }
`;
const SLink = styled.a<ISContent>`
  white-space: nowrap;
  cursor: pointer;
  font-size: 24px;
  padding-bottom: 4px;
  border-bottom: 3px solid transparent;
  width: 100%;

  ${({ isCurrentPath }) =>
    isCurrentPath && `border-bottom: 3px solid ${APP_THEME_DEFAULT.primary}`}
`;

const SideMenuDisplay: FC = () => {
  const sideMenuRef = useRef<HTMLDivElement>(null);
  const { isOpen, toggleMenu } = useMenuContext();
  const { pathname } = useRouter();
  const [animateStyle, setAnimateStyle] = useState<TAnimateStyle>('idle');

  useOnClickOutsideElementsArray(
    [sideMenuRef],
    animateStyle === 'open' ? toggleMenu : () => null
  );

  useEffect(() => {
    if (animateStyle !== 'open' && isOpen) {
      setAnimateStyle('open');
    } else if (animateStyle === 'open' && !isOpen) {
      setAnimateStyle('close');
    }
  }, [animateStyle, isOpen]);

  useEffect(() => {
    const sideMenuCurrent = sideMenuRef.current;

    if (!sideMenuCurrent) {
      return;
    }

    const animationHasEnded = () => {
      if (animateStyle === 'close' && !isOpen) {
        setAnimateStyle('idle');
      }
    };

    sideMenuCurrent.addEventListener('animationend', animationHasEnded);

    return () =>
      sideMenuCurrent.removeEventListener('animationend', animationHasEnded);
  }, [animateStyle, isOpen]);

  const handleMenuClick = () => {
    toggleMenu();
  };

  return (
    <SContainer ref={sideMenuRef} animateStyle={animateStyle}>
      <SMenuIconContainer isOpen={isOpen}>
        <MenuIcon transparentBG />
      </SMenuIconContainer>

      <SContents>
        {MENU_ITEMS.map(({ id, title, href }) => (
          <Link key={id} href={href} passHref>
            <SLink isCurrentPath={pathname === href} onClick={handleMenuClick}>
              {title}
            </SLink>
          </Link>
        ))}
      </SContents>
    </SContainer>
  );
};

export default SideMenuDisplay;
