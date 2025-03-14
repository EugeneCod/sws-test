import { clsx } from 'clsx';
import s from './Navbar.module.scss';

export const Navbar = (props: PropsWithClassName) => {
  const { className } = props;
  return <div className={clsx(s.root, className)}>Navbar</div>;
};
