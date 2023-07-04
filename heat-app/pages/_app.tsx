import { Global, ThemeProvider } from '@emotion/react';
import { Toast } from 'components/common/Toast';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { defaultTheme } from 'styles/defaultTheme';
import { global } from 'styles/global';

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
        <QueryClientProvider client={queryClient}>
          <Global styles={[global]} />
          <Toast />
          <Component {...pageProps} />
        </QueryClientProvider>
      </ThemeProvider>
    </div>
  );
}

export default MyApp;
