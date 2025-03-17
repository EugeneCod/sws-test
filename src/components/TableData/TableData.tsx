import { useState } from 'react';
import clsx from 'clsx';

import s from './TableData.module.scss';

import { Input } from '@/ui';

interface TableDataProps extends PropsWithClassName {
  isEditing: boolean;
  initialValue: string | number;
  valueType: 'string' | 'number';
}

export const TableData = (props: TableDataProps) => {
  const { isEditing, initialValue, className } = props;

  const [updatedValue, setUpdatedValue] = useState(initialValue);
  return (
    <td className={clsx(s.root, className)}>
      {isEditing ? (
        <Input
          value={updatedValue}
          onChange={(evt) => {
            setUpdatedValue(evt.target.value);
          }}
        />
      ) : (
        <span className={s['data-value']}>{initialValue}</span>
      )}
    </td>
  );
};
