import s from './Input.module.scss';

interface InputProps {
  value: string | number;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

export const Input = (props: InputProps) => {
  const { value, onChange, name } = props;
  return (
    <input
      className={s.root}
      value={value}
      onChange={onChange}
      id={name}
      name={name}
    />
  );
};
