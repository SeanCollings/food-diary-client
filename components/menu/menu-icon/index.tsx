import { APP_THEME_DEFAULT, MEDIA_MOBILE, OPACITY_70 } from '@utils/constants';
import { FC } from 'react';
import styled from 'styled-components';

// https://codepen.io/alvarotrigo/pen/XWejzjR

const SContainer = styled.div`
  cursor: pointer;
  background: ${APP_THEME_DEFAULT.primary};
  border-radius: 50%;
  width: 55px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
  margin-top: 16px;

  :hover {
    background: ${APP_THEME_DEFAULT.primary}${OPACITY_70};
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
const SLine = styled.span`
  display: block;
  height: 4px;
  width: 100%;
  background: ${APP_THEME_DEFAULT.textLight};
`;

const MenuIcon: FC = () => {
  const onClickHandler = () => {
    console.log('NMENU CLICKED');
  };

  return (
    <SContainer onClick={onClickHandler}>
      <SHamburgerLines>
        <SLine />
        <SLine />
        <SLine />
      </SHamburgerLines>
    </SContainer>
  );
};

export default MenuIcon;
