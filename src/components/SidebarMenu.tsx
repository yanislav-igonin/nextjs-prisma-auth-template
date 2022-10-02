import Link from 'next/link';
import { HomeIcon, UsersIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
import React from 'react';

type Link = {
  href: string;
  label: string;
  icon: JSX.Element;
}

export const SidebarMenu = () => {
  const links: Link[] = [
    { href: '/', label: 'Home', icon: <HomeIcon fill='white' /> },
    { href: '/users', label: 'Users', icon: <UsersIcon fill='white' /> },
    { href: '/users-ssr', label: 'Users SSR', icon: <UsersIcon fill='white' /> },
  ];
  const router = useRouter();
  const currentPath = router.pathname;

  return <nav className='flex flex-col h-screen bg-slate-800'>
    {links.map((link) =>
      <MenuLink key={link.href} {...link}
        isActive={link.href === currentPath} />
    )}
    <div className='absolute bottom-0'>
      <LogoutMenuLink />
    </div>
  </nav>;
};

type MenuLinkProps = Link & { isActive: boolean };

const MenuLinkButton = (
  { icon, isActive }: Pick<MenuLinkProps, 'icon' | 'isActive'>
) => <button className={`
  text-lg
  p-2
  cursor-pointer
  w-12
  hover:bg-red-500
  ${isActive ? 'bg-rose-500' : ''}`}>
    {icon}
  </button>;

const MenuLink = ({ href, icon, isActive }: MenuLinkProps) => <Link href={href}>
  <a>
    <MenuLinkButton icon={icon} isActive={isActive} />
  </a>
</Link>;

const LogoutMenuLink = () => <MenuLinkButton isActive={false}
  icon={<ArrowRightOnRectangleIcon fill='white' />} />;
