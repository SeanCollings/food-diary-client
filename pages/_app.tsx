import '../styles/globals.css';
import GlobalStyle from '../components/global-styles';
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
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
import { ALL_THEME_NAMES } from '@utils/constants/theme.constant';
import { AllEntriesPerMonthContextProvider } from '@store/all-entries-per-month-context';

function MyApp(props: AppProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }
  }, [mounted]);

  return (
    <>
      <Head>
        <title>{'Food & Wellness Diary'}</title>
        <link rel="icon" href="/diary.ico" />

        <meta property="og:title" content={'Food and Wellness Diary'} />
        <meta
          name="description"
          property="og:description"
          content={`One step at a time. Towards wellness.
          Designed to help you track your daily food intake without the pressure of calorie counting.
          Log meals, snacks, beverages and exercise routine to gain insights into your nutritional habits.`}
        />
        <meta
          name="image"
          property="og:image"
          content={`${process.env.VERCEL_DOMAIN || ''}/api/og`}
        />
        <meta
          property="og:site_name"
          content={'Food and Wellness Diary'}
        ></meta>
        <meta
          property="og:url"
          content={`${process.env.VERCEL_DOMAIN || ''}/`}
        />

        <meta property="og:type" content="website" />
        <meta content="summary" name="twitter:card" />
        <meta
          content={`${process.env.VERCEL_DOMAIN || ''}/api/og`}
          name="twitter:image"
        />
        <meta property="twitter:title" content="Food and Wellness Diary"></meta>
      </Head>
      <SessionProvider session={props.pageProps.session}>
        <UserContextProvider>
          <DateSelectedContextProvider>
            <MealEntriesContextProvider>
              <WellnessEntriesContextProvider>
                <AllEntriesPerMonthContextProvider>
                  <MenuContextProvider>
                    <ThemeProvider
                      enableSystem
                      themes={ALL_THEME_NAMES}
                      defaultTheme={'system'}
                    >
                      <GlobalStyle />
                      {mounted && (
                        <>
                          <SideMenuDisplay />
                          <AppMain {...props} />
                        </>
                      )}
                    </ThemeProvider>
                  </MenuContextProvider>
                </AllEntriesPerMonthContextProvider>
              </WellnessEntriesContextProvider>
            </MealEntriesContextProvider>
          </DateSelectedContextProvider>
        </UserContextProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
