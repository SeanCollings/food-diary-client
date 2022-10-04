import '../styles/globals.css';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import GlobalStyle from '../components/global-styles';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { COLOURS } from '@utils/constants';
import SideMenuDisplay from '@components/menu/side-menu-display';
import { DateSelectedContextProvider } from '@store/date-selected-context';
import { MenuContextProvider } from '@store/menu-context';
import { WellnessEntriesContextProvider } from '@store/wellness-entries-context';
import { MealEntriesContextProvider } from '@store/meal-entries-context';
import { UserContextProvider } from '@store/user-context';
import { STATIC_THEME } from '@utils/constants/theme.constants';
import AppMain from '@components/app-main';

const theme: DefaultTheme = {
  colors: {
    primary: STATIC_THEME.light.text,
    secondary: COLOURS.turquoise,
    background: STATIC_THEME.light.backgroundPrimary,
  },
};

function MyApp(props: AppProps) {
  return (
    <DateSelectedContextProvider>
      <MealEntriesContextProvider>
        <WellnessEntriesContextProvider>
          <MenuContextProvider>
            <UserContextProvider>
              <ThemeProvider theme={theme}>
                <GlobalStyle />
                <Head>
                  <title>{'Food & Wellness Diary'}</title>
                  <meta name="description" content={'Food & Wellness Diary'} />
                  <link rel="icon" href="/diary.ico" />
                </Head>

                <SideMenuDisplay />
                <AppMain {...props} />
              </ThemeProvider>
            </UserContextProvider>
          </MenuContextProvider>
        </WellnessEntriesContextProvider>
      </MealEntriesContextProvider>
    </DateSelectedContextProvider>
  );
}

export default MyApp;
