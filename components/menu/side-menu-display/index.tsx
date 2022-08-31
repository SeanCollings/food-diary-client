import { useMenuContext } from '@store/menu-context';
import {
  APP_THEME_DEFAULT,
  COLOURS,
  MEDIA_MAX_DESKTOP,
  MEDIA_MOBILE,
  OPACITY_70,
} from '@utils/constants';
import { FC } from 'react';
import styled from 'styled-components';
import { MENU_ITEMS } from '@components/menu/menu.constants';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface ISContainer {
  menuWidth: number;
}
interface ISContent {
  isCurrentPath: boolean;
}

const SContainer = styled.div<ISContainer>`
  transition: 0.2s;
  position: fixed;
  right: 0;
  background: ${APP_THEME_DEFAULT.backgroundPrimary};
  height: 100%;
  width: ${({ menuWidth }) => menuWidth}px;
  z-index: 2;

  box-shadow: ${({ menuWidth }) =>
    menuWidth > 0 ? `0px 0px 20px 1px ${COLOURS.black}${OPACITY_70}` : `0`};

  ${MEDIA_MOBILE} {
    width: ${({ menuWidth }) => (menuWidth > 0 ? '100%' : 0)};
  }
  ${MEDIA_MAX_DESKTOP} {
    display: none;
  }
`;
const SContents = styled.div`
  position: relative;
  top: 110px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const SLink = styled.a<ISContent>`
  cursor: pointer;
  font-size: 24px;
  padding-bottom: 4px;
  border-bottom: 3px solid transparent;
  width: 100%;

  ${({ isCurrentPath }) =>
    isCurrentPath && `border-bottom: 3px solid ${APP_THEME_DEFAULT.primary}`}
`;

const SideMenuDisplay: FC = () => {
  const { isOpen, toggleMenu } = useMenuContext();
  const router = useRouter();

  const { pathname } = router;

  const handleMenuClick = () => {
    toggleMenu();
  };

  return (
    <SContainer menuWidth={isOpen ? 350 : 0}>
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
