import {
  HEADER_PROPS,
  MAX_PAGE_WIDTH,
  MEDIA_DESKTOP,
  MEDIA_MAX_DESKTOP,
  MEDIA_MOBILE,
  MEDIA_TABLET,
} from '@utils/constants';
import styled from 'styled-components';
import Header from '@components/header';
import Footer from '@components/footer';
import { useRouter } from 'next/router';
import { pathnameMapper } from '@utils/constants/menu.constants';
import { AppProps } from 'next/app';
import { useTheme } from '@hooks/use-theme';

interface ISAppContainer {
  showBackgroundImage: boolean;
  fullOpacity: boolean;
  background: string;
  colour: string;
}

const SAppContainer = styled.div<ISAppContainer>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  outline-style: none;
  min-height: calc(100vh + 5rem);
  background: ${({ background }) => background};
  color: ${({ colour }) => colour};

  ${({ showBackgroundImage, fullOpacity }) =>
    showBackgroundImage &&
    `background-image:${
      fullOpacity
        ? ''
        : `linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),`
    }
    url('/static/images/background.webp');
  background-size: cover;
  background-repeat: no-repeat;
  `}
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
  const { pathname } = useRouter();
  const theme = useTheme();

  const showBackgroundImage =
    pathname === pathnameMapper.login || pathname === pathnameMapper.home;
  const fullOpacity = pathname !== pathnameMapper.login;

  return (
    <SAppContainer
      background={theme.backgroundPrimary}
      colour={theme.text}
      showBackgroundImage={showBackgroundImage}
      fullOpacity={fullOpacity}
    >
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
