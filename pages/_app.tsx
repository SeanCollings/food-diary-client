import styled, { ThemeProvider, DefaultTheme } from 'styled-components';
import GlobalStyle from '../components/global-styles';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Footer from '@components/footer';
import {
  APP_THEME_DEFAULT,
  COLOURS,
  MAX_PAGE_WIDTH,
  MEDIA_MOBILE,
} from '@utils/constants';

import '../styles/globals.css';
import SideMenuDisplay from '@components/menu/side-menu-display';
import { DiaryEntriesContextProvider } from 'store/diary-entries-context';
import { DateSelectedContextProvider } from '@store/date-selected-context';
import { MenuContextProvider } from '@store/menu-context';
import { WellnessEntriesContextProvider } from '@store/wellness-entries-context';
import { MealEntriesContextProvider } from '@store/meal-entries-context';

const theme: DefaultTheme = {
  colors: {
    primary: APP_THEME_DEFAULT.textDark,
    secondary: COLOURS.turquoise,
    background: APP_THEME_DEFAULT.backgroundPrimary,
  },
};

const SAppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 2rem;
  outline-style: none;

  ${MEDIA_MOBILE} {
    padding: 0 1rem;
  }
`;
const SMain = styled.main`
  min-height: 100vh;
  max-width: ${MAX_PAGE_WIDTH}px;
  margin: 0 auto;
  width: 100%;
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DateSelectedContextProvider>
        <MealEntriesContextProvider>
          <WellnessEntriesContextProvider>
            <DiaryEntriesContextProvider>
              <MenuContextProvider>
                <ThemeProvider theme={theme}>
                  <GlobalStyle />
                  <Head>
                    <title>{'Food & Wellness Diary'}</title>
                    <meta
                      name="description"
                      content={'Food & Wellness Diary'}
                    />
                    <link rel="icon" href="/diary.ico" />
                  </Head>

                  <SideMenuDisplay />
                  <SAppContainer>
                    <SMain>
                      <Component {...pageProps} />
                    </SMain>
                    <Footer />
                  </SAppContainer>
                </ThemeProvider>
              </MenuContextProvider>
            </DiaryEntriesContextProvider>
          </WellnessEntriesContextProvider>
        </MealEntriesContextProvider>
      </DateSelectedContextProvider>
    </>
  );
}

export default MyApp;
