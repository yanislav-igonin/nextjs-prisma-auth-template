import { db } from '@db';
import { User } from '@prisma/client';
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';

const loginRedirect = {
  redirect: {
    destination: '/auth/login',
    permanent: false,
  },
};

type ServerSideProps = {
  users: Pick<User, 'id' | 'email'>[];
};

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async ({ req, query }) => {
  const sessionId = req.cookies.sid || '';
  if (!sessionId) {
    return loginRedirect;
  }
  const session = await db.session.findFirst({ where: { id: sessionId } });
  if (!session || session.expires < new Date()) {
    return loginRedirect;
  }
  const page = query.page ? Number(query.page) : 1;
  const users = await db.user.findMany({
    select: { email: true, id: true },
    skip: (page - 1) * 20, take: 20,
  });
  return {
    props: { users },
  };
};

const Users: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ users }) => {
  return <div>
    <h1>Users</h1>
    <ul>
      {users.map((user) => <li key={user.id}>{user.email}</li>)}
    </ul>
  </div>;
};

export default Users;
