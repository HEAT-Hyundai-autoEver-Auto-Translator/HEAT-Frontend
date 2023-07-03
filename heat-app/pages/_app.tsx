import { Global, ThemeProvider } from '@emotion/react';
import { Toast } from 'components/common/Toast';
import type { AppProps } from 'next/app';
import { defaultTheme } from 'styles/defaultTheme';
import { global } from 'styles/global';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
        <Global styles={[global]} />
        <Toast />
        <Component {...pageProps} />
      </ThemeProvider>
    </div>
  );
}

export default MyApp;
