import FlatMenu from '@components/menu/flat-menu';
import MenuIcon from '@components/menu/menu-icon';
import { MEDIA_MOBILE } from '@utils/constants';
import { FC } from 'react';
import styled from 'styled-components';

const SContainer = styled.header`
  padding: 3rem 0rem;
  justify-content: space-between;
  position: relative;
  display: flex;

  ${MEDIA_MOBILE} {
    padding: 2rem 0 1rem;
  }
`;
const SHeader = styled.div`
  flex: auto;
  font-size: 64px;
  font-weight: 200;

  ${MEDIA_MOBILE} {
    font-size: 40px;
  }
`;

const Header: FC = () => {
  return (
    <SContainer>
      <SHeader>{'Food & Wellness Diary (beta)'}</SHeader>
      <MenuIcon />
      <FlatMenu />
    </SContainer>
  );
};

export default Header;
