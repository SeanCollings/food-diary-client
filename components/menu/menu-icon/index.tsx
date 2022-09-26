import { useMenuContext } from '@store/menu-context';
import {
  APP_THEME_DEFAULT,
  MEDIA_MAX_DESKTOP,
  MEDIA_MOBILE,
} from '@utils/constants';
import { FC } from 'react';
import styled from 'styled-components';

// https://codepen.io/alvarotrigo/pen/XWejzjR

interface ISContainer {
  isOpen: boolean;
  transparentBG: boolean;
}

interface ISLine {
  isOpen: boolean;
}

const SContainer = styled.div<ISContainer>`
  position: relative;
  transition: 0.2s;
  cursor: pointer;
  background: ${({ isOpen, transparentBG }) =>
    !transparentBG &&
    (isOpen ? APP_THEME_DEFAULT.backgroundPrimary : APP_THEME_DEFAULT.primary)};
  border-radius: 50%;
  width: 55px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
  z-index: 2;

  .line1 {
    ${({ isOpen }) =>
      isOpen &&
      'transform: rotate(44deg); transform-origin: 7% 0%; width: 33px; border-radius: 2px;'};
  }

  .line2 {
    ${({ isOpen }) => isOpen && 'transform: scaleY(0);'};
  }
  .line3 {
    ${({ isOpen }) =>
      isOpen &&
      'transform-origin: 9% 110%; transform: rotate(-44deg); width: 33px; border-radius: 2px;'};
  }

  :hover {
    opacity: 0.7;
  }

  ${MEDIA_MAX_DESKTOP} {
    display: none;
  }
  ${MEDIA_MOBILE} {
    margin-top: 0;
  }
`;
const SHamburgerLines = styled.div`
  height: 22px;
  width: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const SLine = styled.span<ISLine>`
  transition: transform 0.2s ease-in-out;

  display: block;
  height: 4px;
  width: ${({ isOpen }) => (isOpen ? '110%' : '100%')};
  background: ${({ isOpen }) =>
    isOpen ? APP_THEME_DEFAULT.textDark : APP_THEME_DEFAULT.textLight};
`;

interface IMenuIconProps {
  transparentBG?: boolean;
}

const MenuIcon: FC<IMenuIconProps> = ({ transparentBG = false }) => {
  const { isOpen, toggleMenu } = useMenuContext();

  const onClickHandler = () => {
    toggleMenu();
  };

  return (
    <SContainer
      onClick={onClickHandler}
      isOpen={isOpen}
      transparentBG={transparentBG}
    >
      <SHamburgerLines>
        <SLine isOpen={isOpen} className="line1" />
        <SLine isOpen={isOpen} className="line2" />
        <SLine isOpen={isOpen} className="line3" />
      </SHamburgerLines>
    </SContainer>
  );
};

export default MenuIcon;
