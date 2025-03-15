import { clsx } from 'clsx';
import s from './Header.module.scss';
import SquareIcon from '@/assets/icons/square.svg';
import ArrowLeft from '@/assets/icons/arrow-left.svg';

export const Header = (props: PropsWithClassName) => {
  const { className } = props;
  return (
    <header className={clsx(s.root, className)}>
      <div className={s['icon-buttons']}>
        <button className={s['icon-button']}>
          <img src={SquareIcon} alt={SquareIcon} />
        </button>
        <button className={s['icon-button']}>
          <img src={ArrowLeft} alt={ArrowLeft} />
        </button>
      </div>
      <ul className={s.tabs}>
        <li className={clsx(s.tab, s.active)}>Просмотр</li>
        <li className={clsx(s.tab)}>Управление</li>
      </ul>
    </header>
  );
};
