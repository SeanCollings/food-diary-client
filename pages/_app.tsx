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
import { AllEntriesPerMonthContextProvider } from '@store/all-entries-per-month-context';

function MyApp(props: AppProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }
  }, [mounted]);

  return (
    <SessionProvider session={props.pageProps.session}>
      <DateSelectedContextProvider>
        <MealEntriesContextProvider>
          <WellnessEntriesContextProvider>
            <AllEntriesPerMonthContextProvider>
              <MenuContextProvider>
                <UserContextProvider>
                  <ThemeProvider
                    enableSystem
                    themes={ALL_THEME_NAMES}
                    defaultTheme={'system'}
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
            </AllEntriesPerMonthContextProvider>
          </WellnessEntriesContextProvider>
        </MealEntriesContextProvider>
      </DateSelectedContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
