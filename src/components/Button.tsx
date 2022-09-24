import { FC } from 'react';

type Props = {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}
export const Button: FC<Props> = ({
  text, onClick, disabled = false, loading = false,
}) => <button
  onClick={onClick}
  disabled={disabled || loading}
  className="bg-emerald-300 rounded-sm">
  {text}
</button>;
