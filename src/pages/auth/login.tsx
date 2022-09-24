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

  return <div>
    <form onSubmit={onSubmit}>
      <Input disabled={login.isLoading} type="email" value={email} onChange={e => setEmail(e.target.value)} />
      <Input disabled={login.isLoading} type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <Button disabled={login.isLoading} type="submit">Login</Button>
    </form>
  </div>;
};

export default Login;
