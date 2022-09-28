import type { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next';
import Head from 'next/head';
import { DarkModeButton, MainCard } from '@components';
import { db } from '@db';
import { trpc } from '@lib/trpc';

const loginRedirect = {
  redirect: {
    destination: '/auth/login',
    permanent: false,
  },
};

export const getServerSideProps: GetServerSideProps<{}> = async (ctx) => {
  const sessionId = ctx.req.cookies.sid;
  if (!sessionId) {
    return loginRedirect;
  }
  const session = await db.session.findFirst({
    where: { id: sessionId },
    // include: { user: true },
  });
  if (!session) {
    return loginRedirect;
  }
  return { props: {} };
};

const Home: NextPage = ({}) => {
  const helloQuery = trpc.example.hello.useQuery({ text: 'trpc' });
  const meQuery = trpc.auth.me.useQuery();
  const me = meQuery.isLoading ? 'loading...' : meQuery.data?.email;

  return <div>
    <Head>
      <title>NextJS Template</title>
    </Head>

    <div className="absolute top-0 right-0 p-2">
      <DarkModeButton />
    </div>

    <main className="flex flex-col h-screen justify-center items-center bg-gradient-to-tr from-emerald-400 to-fuchsia-400 dark:from-emerald-600 dark:to-fuchsia-600">
      {helloQuery.data
        ? <h1 className="text-2xl mb-2 text-center dark:text-white">
            <>{helloQuery.data.message}</> at <>{helloQuery.data.time.toLocaleString()}</>
          </h1>
        : <h1 className="text-2xl mb-2 text-center dark:text-white">loading...</h1>}

      <h1 className='dark:text-white text-2xl mb-2'>email: {me}</h1>

      <MainCard />
    </main>
  </div>;
};

export default Home;
