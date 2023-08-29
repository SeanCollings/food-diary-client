import FlatMenu from '@components/menu/flat-menu';
import MenuIcon from '@components/menu/menu-icon';
import { pathnameMapper } from '@utils/constants/menu.constants';
import { useMenuContext } from '@store/menu-context';
import {
  HEADER_PROPS,
  MAX_PAGE_WIDTH,
  MEDIA_DESKTOP,
  MEDIA_MAX_DESKTOP,
  MEDIA_MOBILE,
  MEDIA_TABLET,
} from '@utils/app.constants';
import { useRouter } from 'next/router';
import { FC } from 'react';
import styled from 'styled-components';

const SContainer = styled.header`
  position: relative;
  width: 100%;
  margin: 0 auto;
  z-index: 100;

  ${MEDIA_MOBILE} {
    padding-top: 1rem;
    position: fixed;
    height: ${HEADER_PROPS.mobile.height}px;
    background: var(--bg-primary);
  }
  ${MEDIA_TABLET} {
    height: ${HEADER_PROPS.tablet.height}px;
  }
  ${MEDIA_DESKTOP} {
    height: ${HEADER_PROPS.desktopMedium.height}px;
  }
  ${MEDIA_MAX_DESKTOP} {
    height: ${HEADER_PROPS.desktopLarge.height}px;
  }
`;
const SHeaderBanner = styled.div`
  position: absolute;
  width: 100vw;
  background: var(--bg-secondary__60);
  left: -2rem;

  ${MEDIA_MOBILE} {
    top: ${HEADER_PROPS.tablet.padding}px;
    height: calc(100% - ${HEADER_PROPS.tablet.padding * 2}px);
  }
  ${MEDIA_TABLET} {
    top: ${HEADER_PROPS.tablet.padding}px;
    height: calc(100% - ${HEADER_PROPS.tablet.padding * 2}px);
  }
  ${MEDIA_DESKTOP} {
    top: ${HEADER_PROPS.desktopMedium.padding}px;
    height: calc(100% - ${HEADER_PROPS.desktopMedium.padding * 2}px);
  }
  ${MEDIA_MAX_DESKTOP} {
    top: ${HEADER_PROPS.desktopLarge.padding}px;
    height: calc(100% - ${HEADER_PROPS.desktopLarge.padding * 2}px);
  }
`;
const SHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  max-width: ${MAX_PAGE_WIDTH}px;
  line-height: 1;
  width: 100%;
  margin: auto;
  gap: 10px;

  ${MEDIA_MOBILE} {
    padding: 0 1rem;
    top: ${HEADER_PROPS.mobile.padding}px;
    height: 50px;
  }
  ${MEDIA_TABLET} {
    top: ${HEADER_PROPS.tablet.padding}px;
    height: calc(100% - ${HEADER_PROPS.tablet.padding * 2}px);
  }
  ${MEDIA_DESKTOP} {
    top: ${HEADER_PROPS.desktopMedium.padding}px;
    height: calc(100% - ${HEADER_PROPS.desktopMedium.padding * 2}px);
  }
  ${MEDIA_MAX_DESKTOP} {
    top: ${HEADER_PROPS.desktopLarge.padding}px;
    height: calc(100% - ${HEADER_PROPS.desktopLarge.padding * 2}px);
  }
`;
const SHeader = styled.div`
  flex: auto;
  font-weight: 200;

  ${MEDIA_MOBILE} {
    font-size: ${HEADER_PROPS.mobile.fontSize}px;
  }
  ${MEDIA_TABLET} {
    font-size: ${HEADER_PROPS.tablet.fontSize}px;
  }
  ${MEDIA_DESKTOP} {
    font-size: ${HEADER_PROPS.desktopMedium.fontSize}px;
  }
  ${MEDIA_MAX_DESKTOP} {
    font-size: ${HEADER_PROPS.desktopLarge.fontSize}px;
  }
`;
const SHeaderSpan = styled.span`
  user-select: none;
  cursor: default;
`;

const Header: FC = () => {
  const { isOpen } = useMenuContext();
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
          {!isOpen && <MenuIcon />}
          <FlatMenu />
        </SHeaderWrapper>
      </SContainer>
    </>
  );
};

export default Header;
