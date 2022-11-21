import type { NextPage } from 'next';
import { Layout } from '@components';
import { trpc } from '@lib/trpc';

const Home: NextPage = () => {
  const meQuery = trpc.users.me.useQuery();

  return <Layout>
    <main className="flex flex-col w-screen h-screen justify-center items-center">
      {meQuery.data 
        ? <h1 className="text-2xl mb-2 text-center">{meQuery.data.email}</h1>
        : <h1 className="text-2xl mb-2 text-center">loading...</h1>}
    </main>
  </Layout>;
};

export default Home;
