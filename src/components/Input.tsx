import { HTMLInputTypeAttribute, FC } from 'react';

type Props = {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  type: HTMLInputTypeAttribute;
}
export const Input: FC<Props> = ({ placeholder, type, value, onChange }) => <input
  type={type}
  value={value}
  onChange={onChange}
  className="bg-slate-200 rounded-sm"
  placeholder={placeholder}
/>;
