import type { NextPage } from 'next';
import { Layout } from '@components';
import { trpc } from '@lib/trpc';

const Dashboard: NextPage = () => {
  const meQuery = trpc.users.me.useQuery();

  return <Layout>
    <main className="flex h-screen w-screen flex-col items-center justify-center">
      {meQuery.data 
        ? <h1 className="mb-2 text-center text-2xl">{meQuery.data.email}</h1>
        : <h1 className="mb-2 text-center text-2xl">loading...</h1>}
    </main>
  </Layout>;
};

export default Dashboard;
