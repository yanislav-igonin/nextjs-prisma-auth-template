import { Button, Input } from '@components';
import { trpc } from '@lib/trpc';
import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = trpc.auth.login.useMutation();
  
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await login.mutateAsync({ email, password });
  };

  return <div className='flex items-center justify-center h-screen'>
    <form onSubmit={onSubmit} className='flex flex-col'>
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
