import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
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

type Props = {
  email: string;
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const sessionId = ctx.req.cookies.sid;
  if (!sessionId) {
    return loginRedirect;
  }
  const session = await db.session.findFirst({
    where: { id: sessionId },
    include: { user: true },
  });
  if (!session) {
    return loginRedirect;
  }
  return {
    props: {
      email: session.user.email,
    },
  };
};

const Home: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ email }) => {
  const hello = trpc.example.hello.useQuery({ text: 'trpc' });

  return <div>
    <Head>
      <title>NextJS Template</title>
    </Head>

    <div className="absolute top-0 right-0 p-2">
      <DarkModeButton />
    </div>

    <main className="flex flex-col h-screen justify-center items-center bg-gradient-to-tr from-emerald-400 to-fuchsia-400 dark:from-emerald-600 dark:to-fuchsia-600">
      {hello.data
        ? <h2 className="text-2xl m-2 text-center dark:text-white">
          <>{hello.data.message}</> at <>{hello.data.time.toLocaleString()}</>
        </h2>
        : <h2 className="text-2xl m-2 text-center dark:text-white">loading...</h2>}

      <h2>you: {email}</h2>

      <MainCard />
    </main>
  </div>;
};

export default Home;
