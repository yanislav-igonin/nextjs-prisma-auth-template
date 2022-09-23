import '../styles/globals.css';
import type { AppType } from 'next/dist/shared/lib/utils';
import { trpc } from '@lib/trpc';

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default trpc.withTRPC(MyApp);
