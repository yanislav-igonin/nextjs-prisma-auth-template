import { GithubIcon } from '@components';

const techs = ['next js', 'typescript', 'tailwind css', 'trpc'];

const renderTechs = () => techs
  .map((t) => <li className="underline underline-offset-2 dark:text-white" key={t}>{t}</li>);

export const MainCard = () => <div className="bg-white p-20 shadow-md dark:bg-slate-600">
  <h1 className="m-4 text-center text-4xl dark:text-white">nextjs template</h1>
  <h2 className="m-2 text-center text-2xl dark:text-white">techstack</h2>
  <ul className="flex flex-col items-center justify-center">
    {renderTechs()}
  </ul>

  <div className='mt-10 flex items-center justify-center'>
    <a href="https://github.com/yanislav-igonin/nextjs-template" target="_blank" rel="noreferrer">
      <GithubIcon />
    </a>
  </div>
</div>;
