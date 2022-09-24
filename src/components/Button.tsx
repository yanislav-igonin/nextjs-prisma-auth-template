import { ButtonHTMLAttributes, FC, HTMLInputTypeAttribute, ReactNode } from 'react';
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
    bg-emerald-500
    hover:bg-emerald-600
    text-white
    font-medium
    rounded-sm
    min-w-full
    p-2
    ">
  {!loading ? children : <Spinner/>}
</button>;
