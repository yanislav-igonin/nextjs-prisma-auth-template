import Link from 'next/link';
import { HomeIcon, UsersIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/router';

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
  const router = useRouter();
  const currentPath = router.pathname;

  return <nav className='flex flex-col gap-2 h-screen'>
    {links.map((link) =>
      <MenuLink key={link.href} {...link}
        isActive={link.href === currentPath} />
    )}
  </nav>;
};

type MenuLinkProps = Link & { isActive: boolean };

const MenuLink = ({ href, label, icon, isActive }: MenuLinkProps) =>
  <Link href={href} key={href}>
    <a className={`text-lg cursor-pointer w-10 ${isActive ? 'bg-rose-500' : ''}`}>
      {icon}
    </a>
  </Link>;
