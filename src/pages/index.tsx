import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { DarkModeButton, MainCard } from '@components';
import { trpc } from '@lib/trpc';

const LoginLink = () =>
  <div className='flex items-center'>
    <Link className='font-bold hover:text-rose-500 dark:text-slate-50 dark:hover:text-rose-500' href="/auth/login">
      LOGIN
    </Link>
  </div>;

const Home: NextPage = () => {
  const helloQuery = trpc.example.hello.useQuery({ text: 'trpc' });

  return <div className='flex flex-row'>
    <Head>
      <title>NextJS Template</title>
    </Head>

    <div className="absolute top-0 right-0 p-2">
      <div className='flex flex-row gap-4'>
        <LoginLink />
        <DarkModeButton />
      </div>
    </div>

    <main className="flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-tr from-emerald-400 to-fuchsia-400 dark:from-emerald-600 dark:to-fuchsia-600">
      {helloQuery.data
        ? <h1 className="mb-2 text-center text-2xl dark:text-white">
          <>{helloQuery.data.message}</> at <>{helloQuery.data.time.toLocaleString()}</>
        </h1>
        : <h1 className="mb-2 text-center text-2xl dark:text-white">loading...</h1>}

      <MainCard />
    </main>
  </div>;
};

export default Home;
