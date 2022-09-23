import { trpc } from '@lib/trpc';
import { GithubIcon } from 'src/components';

const techs = ['next js', 'typescript', 'tailwind css', 'trpc'];

const renderTechs = () => techs
  .map((t) => <li className="underline-offset-2 underline dark:text-white" key={t}>{t}</li>);

export const MainCard = () => {
  const hello = trpc.hello.useQuery({ text: 'trpc' });

  return <div className="p-20 shadow-md bg-white dark:bg-slate-600">
    <h1 className="text-4xl m-4 dark:text-white">nextjs template</h1>
    <h2 className="text-2xl m-2 text-center dark:text-white">techstack</h2>
    <ul className="flex justify-center items-center flex-col">
      {renderTechs()}
    </ul>

    {hello.data
      ? <h2 className="text-2xl m-2 text-center dark:text-white">{hello.data.greeting}</h2>
      : <h2 className="text-2xl m-2 text-center dark:text-white">loading...</h2>}

    <div className='flex justify-center items-center mt-10'>
      <a href="https://github.com/yanislav-igonin/nextjs-template" target="_blank" rel="noreferrer">
        <GithubIcon />
      </a>
    </div>
  </div>;
};
