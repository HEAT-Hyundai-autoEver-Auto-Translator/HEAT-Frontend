import { Global, ThemeProvider } from '@emotion/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toast } from 'components/common/Toast';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { defaultTheme } from 'styles/defaultTheme';
import { global } from 'styles/global';

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
        <QueryClientProvider client={queryClient}>
          <GoogleOAuthProvider clientId={clientId}>
            <Global styles={[global]} />
            <Toast />
            <Component {...pageProps} />
          </GoogleOAuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </div>
  );
}

export default MyApp;
