import type { AppProps } from 'next/app';
import { ReactElement, useEffect, useState } from 'react';
import { AuthProvider } from '../state/auth/AuthContext';
import { GlobalProvider } from '../state/global/GlobalContext';
import '../styles/globals.css';
import { NextPageWithLayout } from './page';

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout | any;
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [subscription, setSubscription] = useState({});
  useEffect(() => {
    const publicVapidKey =
      'BGCn5Wqfxpy-vjuxsZNpTVzYlP6JAumy6555PSckJr4xTQcc5ts_RsZ7DqHcmvZzxAbGMa2qQhJRk0BcQ-7nkJc';

    const getSubscription = async (reg: any) => {
      const subscription = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: publicVapidKey,
      });
      setSubscription(subscription);
    };

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw_cashed_site.js', { scope: '/' })
        .then((registration) => {
          try {
            getSubscription(registration);
          } catch (error) {
            //
          }
        })
        .catch((error) => {
          console.warn('registration error:', error);
        });
    }
  }, []);
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page: ReactElement) => page);
  return (
    <GlobalProvider subscription={subscription}>
      <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
    </GlobalProvider>
  );
}

export default MyApp;
