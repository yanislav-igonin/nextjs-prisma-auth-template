import '../styles/globals.css';
import type { AppType } from 'next/dist/shared/lib/utils';
import Head from 'next/head';
import { trpc } from '@lib/trpc';

const MyApp: AppType = ({ Component, pageProps }) => <>
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </Head>
  <Component {...pageProps} />;
</>;

export default trpc.withTRPC(MyApp);
