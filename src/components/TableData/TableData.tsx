import clsx from 'clsx';

import s from './TableData.module.scss';

import { Input } from '@/ui';

interface TableDataProps extends PropsWithClassName {
  isEditing: boolean;
  value: string | number;
  onChange: (
    evt: React.ChangeEvent<HTMLInputElement>,
    type: 'string' | 'number',
  ) => void;

  valueType: 'string' | 'number';
  inputName: string;
}

export const TableData = (props: TableDataProps) => {
  const { isEditing, value, onChange, className, valueType, inputName } = props;

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    onChange(evt, valueType);
  };

  return (
    <td className={clsx(s.root, className)}>
      {isEditing ? (
        <Input value={value} onChange={handleChange} name={inputName} />
      ) : (
        <span className={s['data-value']}>
          {valueType === 'number' ? value.toLocaleString() : value}
        </span>
      )}
    </td>
  );
};
