import { useEffect, useState } from 'react';
import {
  HEADER_PROPS,
  MAX_PAGE_WIDTH,
  MEDIA_DESKTOP,
  MEDIA_MAX_DESKTOP,
  MEDIA_MOBILE,
  MEDIA_TABLET,
} from '@utils/app.constants';
import styled from 'styled-components';
import Header from '@components/header';
import Footer from '@components/footer';
import { useRouter } from 'next/router';
import { pathnameMapper } from '@utils/constants/menu.constants';
import { AppProps } from 'next/app';
import { getClassNames } from '@utils/string-utils';
import { useTheme } from '@hooks/use-theme';
import { useRequestUser } from '@hooks/request/user/use-request-user';

const SAppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  outline-style: none;
  min-height: calc(100vh + 5rem);

  &.bg-image-light-full {
    background-image: url('/static/images/background.webp');
  }
  &.bg-image-light {
    background-image: linear-gradient(
        rgba(255, 255, 255, 0.5),
        rgba(255, 255, 255, 0.5)
      ),
      url('/static/images/background.webp');
  }

  &.bg-image-dark {
    background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
      url('/static/images/background.webp');
  }

  &.bg-image {
    background-size: cover;
    background-repeat: no-repeat;
  }
`;
const SMain = styled.main`
  position: relative;
  display: flex;
  padding: 0 2rem;

  ${MEDIA_MOBILE} {
    padding: 0 1rem;
    margin-top: ${HEADER_PROPS.mobile.height}px;
    min-height: calc(100vh - ${HEADER_PROPS.mobile.height}px);
  }
  ${MEDIA_TABLET} {
    min-height: calc(100vh - ${HEADER_PROPS.tablet.height}px);
  }
  ${MEDIA_DESKTOP} {
    min-height: calc(100vh - ${HEADER_PROPS.desktopMedium.height}px);
  }
  ${MEDIA_MAX_DESKTOP} {
    min-height: calc(100vh - ${HEADER_PROPS.desktopLarge.height}px);
  }
`;
const SInnerMain = styled.div`
  position: relative;
  max-width: ${MAX_PAGE_WIDTH}px;
  width: 100%;
  margin: 0 auto;
`;

const AppMain: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [fetchUser, setFetchUser] = useState(false);
  const { darkMode } = useTheme();
  const { pathname } = useRouter();
  useRequestUser(fetchUser);

  useEffect(() => {
    if (!!pageProps.session && !fetchUser) {
      setFetchUser(true);
    }
  }, [fetchUser, pageProps]);

  const showBackgroundImage =
    pathname === pathnameMapper.login || pathname === pathnameMapper.home;
  const fullOpacity = pathname !== pathnameMapper.login;
  const bgShowLight = showBackgroundImage && !darkMode;
  const bgShowDark = showBackgroundImage && darkMode;

  const classNames = getClassNames({
    'bg-image': showBackgroundImage,
    'bg-image-light-full': bgShowLight && fullOpacity,
    'bg-image-light': bgShowLight && !fullOpacity,
    'bg-image-dark': bgShowDark,
  });

  return (
    <SAppContainer className={classNames}>
      <Header />
      <SMain>
        <SInnerMain>
          <Component {...pageProps} />
        </SInnerMain>
      </SMain>
      <Footer />
    </SAppContainer>
  );
};

export default AppMain;
