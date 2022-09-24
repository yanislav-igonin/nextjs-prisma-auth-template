import { HTMLInputTypeAttribute, FC } from 'react';

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  disabled?: boolean;
}
export const Input: FC<Props> = ({
  placeholder = '', type = 'text', value, onChange, disabled = false,
}) => <input
    value={value}
    onChange={onChange}
    type={type}
    className="bg-slate-200 rounded-sm"
    placeholder={placeholder}
    disabled={disabled}
  />;
