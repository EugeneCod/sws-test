import { clsx } from 'clsx';
import s from './NavTab.module.scss';
import Tile from '@/assets/icons/tile.svg';

import type { NavTabProps } from './NavTab.types';

export const NavTab = (props: NavTabProps) => {
  const { className, isActive, text } = props;
  
  return (
    <li className={clsx(s.root, { [s.active]: isActive }, className)}>
      <div className={s['icon-container']}>
        <img className={s.icon} src={Tile} alt="" />
      </div>
      <span className={s.text}>{text}</span>
    </li>
  );
};
