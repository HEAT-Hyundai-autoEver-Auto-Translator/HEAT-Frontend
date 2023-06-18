import { Global, ThemeProvider } from "@emotion/react";
import Sidebar from "components/layout/Sidebar";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { defaultTheme } from "styles/defaultTheme";
import { global } from "styles/global";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isMainPage = router.pathname.startsWith("/main");

  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
        <Global styles={[global]} />
        {isMainPage && <Sidebar />}
        <Component {...pageProps} />
      </ThemeProvider>
    </div>
  );
}

export default MyApp;
