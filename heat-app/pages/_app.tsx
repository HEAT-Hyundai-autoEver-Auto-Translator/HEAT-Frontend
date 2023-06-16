import "@/../styles/globals.css";
import { AuthGuard } from "components/auth/AuthGuard";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthGuard>
      <Component {...pageProps} />
    </AuthGuard>
  );
}
