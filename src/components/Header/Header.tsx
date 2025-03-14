import { clsx } from 'clsx';
import s from './Header.module.scss';

export const Header = (props: PropsWithClassName) => {
  const { className } = props;
  return <div className={clsx(s.root, className)}>Header</div>;
};
