import type { AppProps } from 'next/app';
import { ReactElement, useEffect } from 'react';
import { AuthProvider } from '../state/auth/AuthContext';
import '../styles/globals.css';
import { NextPageWithLayout } from './page';

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout | any;
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw_cashed_site.js')
        .then((registration) => {
          console.log('registration success:', registration);
        })
        .catch((error) => {
          console.warn('registration error:', error);
        });
    }
  }, []);
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page: ReactElement) => page);
  return <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>;
}

export default MyApp;
