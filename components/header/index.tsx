import FlatMenu from '@components/menu/flat-menu';
import MenuIcon from '@components/menu/menu-icon';
import { pathnameMapper } from '@components/menu/menu.constants';
import {
  COLOURS,
  MAX_PAGE_WIDTH,
  MEDIA_MOBILE,
  OPACITY_50,
} from '@utils/constants';
import { useRouter } from 'next/router';
import { FC } from 'react';
import styled from 'styled-components';

const TOP_PADDING = 3;

const SContainer = styled.header`
  padding: ${TOP_PADDING}rem 0rem;
  position: relative;
  width: 100%;
  margin: 0 auto;

  ${MEDIA_MOBILE} {
    padding: ${TOP_PADDING - 2}rem 0rem 1rem;
  }
`;
const SHeaderWrapper = styled.div`
  position: relative;
  padding: 0 2rem;
  max-width: ${MAX_PAGE_WIDTH}px;
  width: 100%;
  display: flex;
  margin: auto;
`;
const SHeader = styled.div`
  flex: auto;
  font-size: 64px;
  font-weight: 200;

  ${MEDIA_MOBILE} {
    font-size: 40px;
  }
`;
const SHeaderSpan = styled.span`
  cursor: pointer;
`;
const SHeaderBanner = styled.div`
  position: absolute;
  width: 100%;
  height: calc(100% - ${TOP_PADDING + 1}rem);
  top: ${TOP_PADDING - 1}rem;
  background: ${COLOURS.white}${OPACITY_50};

  ${MEDIA_MOBILE} {
    top: 0;
    height: 100%;
  }
`;

const Header: FC = () => {
  const { pathname, push } = useRouter();

  const showBanner =
    pathname === pathnameMapper.login || pathname === pathnameMapper.home;

  const handleHeaderClick = () => {
    push(pathnameMapper.my_diary);
  };

  return (
    <>
      <SContainer>
        {showBanner && <SHeaderBanner />}
        <SHeaderWrapper>
          <SHeader>
            <SHeaderSpan onClick={handleHeaderClick}>
              {'Food & Wellness Diary'}
            </SHeaderSpan>
          </SHeader>
          <MenuIcon />
          <FlatMenu />
        </SHeaderWrapper>
      </SContainer>
    </>
  );
};

export default Header;
