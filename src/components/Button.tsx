import type { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import { Spinner } from './Spinner';

type Props = {
  children: ReactNode;
  onClick?: () => void;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  disabled?: boolean;
  loading?: boolean;
}
export const Button: FC<Props> = ({
  children, onClick, type='button', disabled = false, loading = false,
}) => <button
  onClick={onClick}
  disabled={disabled || loading}
  type={type}
  className="
    min-w-full
    rounded-md
    bg-rose-500
    p-2
    font-medium
    text-white
    hover:bg-rose-700">
  {!loading ? children : <Spinner/>}
</button>;
