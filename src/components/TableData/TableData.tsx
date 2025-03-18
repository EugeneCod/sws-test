import clsx from 'clsx';

import s from './TableData.module.scss';

import { Input } from '@/ui';

interface TableDataProps extends PropsWithClassName {
  isEditing: boolean;
  value: string | number;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  valueType: 'string' | 'number';
  inputName: string;
}

export const TableData = (props: TableDataProps) => {
  const { isEditing, value, onChange, className, valueType, inputName } = props;

  return (
    <td className={clsx(s.root, className)}>
      {isEditing ? (
        <Input value={value} onChange={onChange} name={inputName} />
      ) : (
        <span className={s['data-value']}>
          {valueType === 'number' ? value.toLocaleString() : value}
        </span>
      )}
    </td>
  );
};
