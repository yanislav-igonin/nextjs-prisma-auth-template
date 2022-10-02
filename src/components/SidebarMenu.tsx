import Link from 'next/link';
import { HomeIcon, UsersIcon } from '@heroicons/react/20/solid';

type Link = {
  href: string;
  label: string;
  icon: JSX.Element;
}

export const SidebarMenu = () => {
  const links: Link[] = [
    { href: '/', label: 'Home', icon: <HomeIcon /> },
    { href: '/users', label: 'Users', icon: <UsersIcon /> },
    { href: '/users-ssr', label: 'Users SSR', icon: <UsersIcon /> },
  ];

  return <nav className='flex flex-col gap-2 h-screen'>
    {links.map((link) => <MenuLink key={link.href} {...link} />)}
  </nav>;
};

const MenuLink = ({ href, label, icon }: Link) =>
  <Link href={href} key={href}>
    <a className='text-lg cursor-pointer h-8 w-8'>
      {icon}
    </a>
  </Link>;
