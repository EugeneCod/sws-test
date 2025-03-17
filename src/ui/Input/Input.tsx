import s from './Input.module.scss';

interface InputProps {
  value: string | number;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = (props: InputProps) => {
  const { value, onChange } = props;
  return <input className={s.root} value={value} onChange={onChange} />;
};
