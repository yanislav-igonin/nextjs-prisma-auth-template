import { ButtonHTMLAttributes, FC, HTMLInputTypeAttribute, ReactNode } from 'react';

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
  className="bg-emerald-300 rounded-sm">
  {children}
</button>;
