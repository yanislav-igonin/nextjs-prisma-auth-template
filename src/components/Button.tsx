import { FC } from 'react';

type Props = {
  text: string;
  onClick: () => void;
}
export const Button: FC<Props> = ({ text, onClick }) => <button
  onClick={onClick}
  className="bg-emerald-300 rounded-sm">
  {text}
</button>;
