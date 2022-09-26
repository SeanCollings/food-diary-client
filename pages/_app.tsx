import '../styles/globals.css';
import styled, { ThemeProvider, DefaultTheme } from 'styled-components';
import GlobalStyle from '../components/global-styles';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Footer from '@components/footer';
import {
  APP_THEME_DEFAULT,
  COLOURS,
  HEADER_PROPS,
  MAX_PAGE_WIDTH,
  MEDIA_DESKTOP,
  MEDIA_MAX_DESKTOP,
  MEDIA_MOBILE,
  MEDIA_TABLET,
} from '@utils/constants';
import SideMenuDisplay from '@components/menu/side-menu-display';
import { DateSelectedContextProvider } from '@store/date-selected-context';
import { MenuContextProvider } from '@store/menu-context';
import { WellnessEntriesContextProvider } from '@store/wellness-entries-context';
import { MealEntriesContextProvider } from '@store/meal-entries-context';
import { useRouter } from 'next/router';
import { pathnameMapper } from '@components/menu/menu.constants';
import Header from '@components/header';

const theme: DefaultTheme = {
  colors: {
    primary: APP_THEME_DEFAULT.textDark,
    secondary: COLOURS.turquoise,
    background: APP_THEME_DEFAULT.backgroundPrimary,
  },
};

interface ISAppContainer {
  showBackgroundImage: boolean;
  fullOpacity: boolean;
}

const SAppContainer = styled.div<ISAppContainer>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  outline-style: none;
  min-height: calc(100vh + 5rem);

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
  max-width: ${MAX_PAGE_WIDTH}px;
  width: 100%;
  margin: 0 auto;
`;

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  const showBackgroundImage =
    pathname === pathnameMapper.login || pathname === pathnameMapper.home;
  const fullOpacity = pathname !== pathnameMapper.login;

  return (
    <DateSelectedContextProvider>
      <MealEntriesContextProvider>
        <WellnessEntriesContextProvider>
          <MenuContextProvider>
            <ThemeProvider theme={theme}>
              <GlobalStyle />
              <Head>
                <title>{'Food & Wellness Diary'}</title>
                <meta name="description" content={'Food & Wellness Diary'} />
                <link rel="icon" href="/diary.ico" />
              </Head>

              <SideMenuDisplay />
              <SAppContainer
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
            </ThemeProvider>
          </MenuContextProvider>
        </WellnessEntriesContextProvider>
      </MealEntriesContextProvider>
    </DateSelectedContextProvider>
  );
}

export default MyApp;
