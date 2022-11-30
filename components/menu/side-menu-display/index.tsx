import { useMenuContext } from '@store/menu-context';
import {
  COLOURS,
  MEDIA_MAX_DESKTOP,
  MEDIA_MOBILE,
  OPACITY_30,
  OPACITY_70,
} from '@utils/constants';
import { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { MENU_ITEMS } from '@utils/constants/menu.constants';
import { useRouter } from 'next/router';
import Link from 'next/link';
import MenuIcon from '@components/menu/menu-icon/index';
import { useOnClickOutsideElementsArray } from '@hooks/use-onclick-outside-element';
import { signOut, useSession } from 'next-auth/react';
import { useTheme } from '@hooks/use-theme';

const MENU_WIDTH = 350;

type TAnimateStyle = 'open' | 'close' | 'idle';

interface ISContainer {
  animateStyle: TAnimateStyle;
  darkMode?: boolean;
}
interface ISMenuIconContainer {
  isOpen: boolean;
}

const SContainer = styled.div<ISContainer>`
  position: fixed;
  right: 0;
  height: 100%;
  z-index: 101;
  width: 0;
  background-color: var(--bg-secondary);

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
      ${({ darkMode }) =>
        `box-shadow: 0px 0px 20px 1px ${COLOURS.black}${
          darkMode ? '' : OPACITY_30
        }`};
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

  margin-right: ${({ isOpen }) => (isOpen ? `2rem` : `-1000rem`)};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};

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
const SLink = styled.a`
  white-space: nowrap;
  cursor: pointer;
  font-size: 24px;
  padding-bottom: 4px;
  border-bottom: 3px solid transparent;
  width: fit-content;

  &.current-path {
    border-bottom: 3px solid var(--th-primary);
  }
`;

const SideMenuDisplay: FC = () => {
  const { darkMode } = useTheme();
  const { data: session } = useSession();
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
  const onLogoutClick = async () => {
    await signOut({ redirect: true, callbackUrl: '/login' });
  };

  return (
    <SContainer
      ref={sideMenuRef}
      animateStyle={animateStyle}
      darkMode={darkMode}
    >
      <SMenuIconContainer isOpen={isOpen}>
        <MenuIcon transparentBG />
      </SMenuIconContainer>

      <SContents>
        {MENU_ITEMS.map(({ id, title, href }) => {
          if (session && id === 'login') {
            return null;
          } else if (!session && (id === 'my_profile' || id === 'summary')) {
            return null;
          }

          return (
            <Link key={id} href={href} passHref>
              <SLink
                className={pathname === href ? 'current-path' : ''}
                onClick={handleMenuClick}
              >
                {title}
              </SLink>
            </Link>
          );
        })}
        {session && <SLink onClick={onLogoutClick}>{'Logout'}</SLink>}
      </SContents>
    </SContainer>
  );
};

export default SideMenuDisplay;
