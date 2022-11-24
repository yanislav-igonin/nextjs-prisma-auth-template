import { useState } from 'react';
import { useRouter } from 'next/router';
import { TRPCClientError } from '@trpc/client';
import type { NextPage } from 'next';
import { trpc } from '@lib/trpc';
import { Button, Input } from '@components';

const Login: NextPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = trpc.auth.login.useMutation();
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login.mutateAsync({ email, password });
      router.push('/dashboard');
    } catch (err) {
      if (err instanceof TRPCClientError) {
        console.log(err.message);
      }
    }
  };

  return <div className='flex h-screen items-center justify-center'>
    <form onSubmit={onSubmit} className='flex w-full flex-col px-4 md:w-1/4'>
      <h1 className='mb-0 text-center text-2xl font-bold'>login</h1>
      <h1 className='mb-0 text-center text-2xl text-red-500'>admin@admin.com</h1>
      <h1 className='mb-0 text-center text-2xl font-bold'>password</h1>
      <h1 className='mb-2 text-center text-2xl text-red-500'>1234qwerA_</h1>
      <div className='m-1'>
        <Input placeholder='Email' disabled={login.isLoading} type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div className='m-1'>
        <Input placeholder='Password' disabled={login.isLoading} type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <div className='m-1'>
        <Button disabled={login.isLoading} loading={login.isLoading} type="submit">Login</Button>
      </div>
    </form>
  </div>;
};

export default Login;
