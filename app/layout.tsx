import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function RootLayout({ children }: AppProps) {
  return (
    <html lang="en">
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body>
        <div id="app">{children}</div>
      </body>
    </html>
  );
}
