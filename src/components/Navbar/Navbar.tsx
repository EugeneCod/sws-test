import { clsx } from 'clsx';
import s from './Navbar.module.scss';
import { NavTab } from '@/ui';

const mockProjects = [
  { id: 1, name: 'По проекту' },
  { id: 2, name: 'Объекты' },
  { id: 3, name: 'РД' },
  { id: 4, name: 'МТО' },
  { id: 5, name: 'СМР' },
  { id: 6, name: 'График' },
  { id: 7, name: 'МиМ' },
  { id: 8, name: 'Рабочие' },
  { id: 9, name: 'Капвложения' },
  { id: 10, name: 'Бюджет' },
  { id: 11, name: 'Финансирование' },
  { id: 12, name: 'Панорамы' },
  { id: 13, name: 'Камеры' },
  { id: 14, name: 'Поручения' },
  { id: 15, name: 'Контрагенты' },
];

const activeId = 5;

export const Navbar = (props: PropsWithClassName) => {
  const { className } = props;
  return (
    <div className={clsx(s.root, className)}>
      <div className={s.header}>
        <div className={s['txt-block']}>
          <p className={s.title}>Название проекта</p>
          <p className={s.subtitle}>Аббревиатура</p>
        </div>
        <button className={s['unwrap-btn']} type="button" />
      </div>
      <ul className={s.navlist}>
        {mockProjects.map((item, idx) => (
          <NavTab key={idx} text={item.name} isActive={item.id === activeId} />
        ))}
      </ul>
    </div>
  );
};
