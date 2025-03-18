import { useEffect } from 'react';
import { clsx } from 'clsx';

import s from './Table.module.scss';

import { TableRow } from '@/ui';
import { useGetTableDataQuery } from '@/app/store/api/outlayRowApi';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { setTableData } from '@/app/store/tableData/slice';
import { selectRows } from '@/app/store/tableData/selectors';
import { emptyRowData } from '@/ui/TableRow';

const tableHeaders = [
  'Уровень',
  'Наименование работ',
  'Основная з/п',
  'Оборудование',
  'Накладные расходы',
  'Сметная прибыль',
];

export const Table = (props: PropsWithClassName) => {
  const { className } = props;
  const dispatch = useAppDispatch();

  const { data: tableData } = useGetTableDataQuery();
  
  useEffect(() => {
    if (tableData) {
      dispatch(setTableData(tableData));
    }
  }, [dispatch, tableData]);

  const rowsData = useAppSelector(selectRows);
  
  return (
    <div className={clsx(s.root, className)}>
      <div className={s['title-block']}>
        <h1 className={s.title}>Строительно-монтажные работы</h1>
      </div>
      <table className={s['table']}>
        <thead>
          <tr className={s['table-headers']}>
            {tableHeaders.map((th, idx) => (
              <th key={idx} className={s['table-header']}>
                {th}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rowsData.length ? (
            rowsData.map((rowData) => (
              <TableRow
                key={rowData.id}
                level={0}
                rowData={rowData}
                parentId={null}
              />
            ))
          ) : (
            <TableRow level={0} rowData={emptyRowData} parentId={null} />
          )}
        </tbody>
      </table>
    </div>
  );
};
