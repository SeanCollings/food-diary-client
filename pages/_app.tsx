import '../styles/globals.css';
import GlobalStyle from '../components/global-styles';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import SideMenuDisplay from '@components/menu/side-menu-display';
import { DateSelectedContextProvider } from '@store/date-selected-context';
import { MenuContextProvider } from '@store/menu-context';
import { WellnessEntriesContextProvider } from '@store/wellness-entries-context';
import { MealEntriesContextProvider } from '@store/meal-entries-context';
import { UserContextProvider } from '@store/user-context';
import AppMain from '@components/app-main';
import { SessionProvider } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import { ALL_THEME_NAMES } from '@utils/constants/theme.constants';
import { TThemeIds } from '@utils/constants/theme.interfaces';

function MyApp(props: AppProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [mounted]);

  return (
    <SessionProvider session={props.pageProps.session}>
      <DateSelectedContextProvider>
        <MealEntriesContextProvider>
          <WellnessEntriesContextProvider>
            <MenuContextProvider>
              <UserContextProvider>
                <ThemeProvider
                  enableSystem={false}
                  themes={ALL_THEME_NAMES}
                  defaultTheme={'light_1' as TThemeIds}
                >
                  <GlobalStyle />
                  {mounted && (
                    <>
                      <Head>
                        <title>{'Food & Wellness Diary'}</title>
                        <meta
                          name="description"
                          content={'Food & Wellness Diary'}
                        />
                        <link rel="icon" href="/diary.ico" />
                      </Head>

                      <SideMenuDisplay />
                      <AppMain {...props} />
                    </>
                  )}
                </ThemeProvider>
              </UserContextProvider>
            </MenuContextProvider>
          </WellnessEntriesContextProvider>
        </MealEntriesContextProvider>
      </DateSelectedContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
