import { db } from '@db';
import { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next';
import Link from 'next/link';

const loginRedirect = {
  redirect: {
    destination: '/auth/login',
    permanent: false,
  },
};

export const getServerSideProps = async (
  { req, query }: GetServerSidePropsContext
) => {
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
  const usersCount = await db.user.count();
  return {
    props: { users, usersCount },
  };
};

const Users: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ users, usersCount }) => {
  const pagesCount = Math.ceil(usersCount / 20);
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
  return <div>
    <h1>Users</h1>
    <ul>
      {users.map((user) => <li key={user.id}>{user.email}</li>)}
    </ul>
    <ul className='flex justify-center items-center gap-2'>
      {pages.map((page) => <li key={page}>
        <Link href={`/users?page=${page}`}>
          <a className='text-lg'>{page}</a>
        </Link>  
      </li>)}
    </ul>
  </div>;
};

export default Users;
