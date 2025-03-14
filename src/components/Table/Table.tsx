import { clsx } from 'clsx';
import s from './Table.module.scss';

export const Table = (props: PropsWithClassName) => {
  const { className } = props;
  return <div className={clsx(s.root, className)}>Table</div>;
};
