import styled, { ThemeProvider, DefaultTheme } from 'styled-components';
import GlobalStyle from '../components/global-styles';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Footer from '@components/footer';
import {
  COLOURS,
  MAX_PAGE_WIDTH,
  MEDIA_DESKTOP,
  MEDIA_MOBILE,
} from '@utils/constants';

import '../styles/globals.css';
import MenuDisplay from '@components/menu/menu-display';

const theme: DefaultTheme = {
  colors: {
    primary: COLOURS.black,
    secondary: COLOURS.turquoise,
    background: COLOURS.gray_light,
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
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Head>
          <title>{'Food & Wellness Diary'}</title>
          <meta name="description" content={'Food & Wellness Diary'} />
          <link rel="icon" href="/diary.ico" />
        </Head>

        <MenuDisplay />
        <SAppContainer>
          <SMain>
            <Component {...pageProps} />
          </SMain>
          <Footer />
        </SAppContainer>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
