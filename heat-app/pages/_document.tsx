import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
      </Head>
      <body>
        <Main />
        <div id="modal"></div>
        <div id="toast"></div>
        <NextScript />
      </body>
    </Html>
  );
}
