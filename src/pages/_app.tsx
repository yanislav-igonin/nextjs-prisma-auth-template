import '../styles/globals.css';
import type { AppType } from 'next/dist/shared/lib/utils';
import Head from 'next/head';
import { trpc } from '@lib/trpc';
import { ErrorBoundary } from '@components';

const MyApp: AppType = ({ Component, pageProps }) => <ErrorBoundary>
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </Head>
  <Component {...pageProps} />;
</ErrorBoundary>;

export default trpc.withTRPC(MyApp);
