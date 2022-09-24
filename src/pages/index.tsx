import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { DarkModeButton, MainCard } from '@components';
import { db } from '@db';

const loginRedirect = {
  redirect: {
    destination: '/auth/login',
    permanent: false,
  },
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
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

const Home: NextPage = () => {
  // const router = useRouter();

  // useEffect(() => {
  //   const { data, isLoading } = trpc.auth.me.useQuery();
  //   if (!data && !isLoading) {
  //     router.push('/auth/login');
  //   }
  // });

  return <div>
    <Head>
      <title>NextJS Template</title>
    </Head>

    <div className="absolute top-0 right-0 p-2">
      <DarkModeButton />
    </div>

    <main className="flex h-screen justify-center items-center bg-gradient-to-tr from-emerald-400 to-fuchsia-400 dark:from-emerald-600 dark:to-fuchsia-600">
      <MainCard />
    </main>
  </div>;
};
export default Home;
