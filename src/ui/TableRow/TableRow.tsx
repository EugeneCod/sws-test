import { useEffect, useState } from 'react';
import clsx from 'clsx';

import s from './TableRow.module.scss';
import { TableData } from '@/components/TableData';
import type { TableRowProps } from './TableRow.types';

const HORISONTAL_LINE_HEIGHT_PX = 51;
const ADDITIONAL_LINE_HEIGHT_MULTIPLIER_PX = 9;
const INITIAL_LEVEL_DATA_WIDTH_PX = 70;
const LEVEL_DATA_PADDING_PX = 20;

export const TableRow = (props: TableRowProps) => {
  const { rowData, level, tableData } = props;
  const [isEditing, setIsEditing] = useState(false);

  const childLength = rowData.child.length;

  useEffect(() => {
    function handleEscKeyup(evt: KeyboardEvent) {
      if (evt.key === 'Escape') {
        setIsEditing(false);
      }
    }

    if (isEditing) document.addEventListener('keyup', handleEscKeyup);

    return () => document.removeEventListener('keyup', handleEscKeyup);
  }, [isEditing]);

  const handleTrashBtnClick = (rowId: number) => {
    console.log('Инициировано удаление строки' + rowId);
  };

  const handleCreateBtnClick = (rowId: number) => {
    console.log('Инициировано добавление дочерней строки у строки' + rowId);
  };

  const handleDoubleClick = () => {
    if (isEditing) return;
    setIsEditing(true);
  };

  return (
    <>
      <tr onDoubleClick={() => handleDoubleClick()} className={s.row}>
        <td
          className={s['level-data']}
          style={{
            width: `${INITIAL_LEVEL_DATA_WIDTH_PX + LEVEL_DATA_PADDING_PX * level}px`,
          }}
        >
          <div style={{ paddingLeft: `${level * LEVEL_DATA_PADDING_PX}px` }}>
            <div className={s['panel-container']}>
              {!!childLength && (
                <span
                  className={s['vertical-line']}
                  style={{
                    height: `${childLength * HORISONTAL_LINE_HEIGHT_PX + ADDITIONAL_LINE_HEIGHT_MULTIPLIER_PX * (childLength - 1)}px`,
                  }}
                />
              )}

              {level > 0 && <span className={s['horizontal-line']} />}
              <div className={s['control-panel']}>
                <button
                  className={clsx(s['panel-btn'], s['create-btn'])}
                  onClick={() => {
                    handleCreateBtnClick(rowData.id);
                  }}
                />
                <button
                  className={clsx(s['panel-btn'], s['trash-btn'])}
                  onClick={() => {
                    handleTrashBtnClick(rowData.id);
                  }}
                />
              </div>
            </div>
          </div>
        </td>
        <TableData
          className={s['row-name-data']}
          isEditing={isEditing}
          initialValue={rowData.rowName}
          valueType="string"
        />
        <TableData
          className={s['numeric-data']}
          isEditing={isEditing}
          initialValue={rowData.salary}
          valueType="number"
        />
        <TableData
          className={s['numeric-data']}
          isEditing={isEditing}
          initialValue={rowData.equipmentCosts}
          valueType="number"
        />
        <TableData
          className={s['numeric-data']}
          isEditing={isEditing}
          initialValue={rowData.overheads}
          valueType="number"
        />
        <TableData
          className={s['numeric-data']}
          isEditing={isEditing}
          initialValue={rowData.estimatedProfit}
          valueType="number"
        />
      </tr>
      {rowData.child.map((childRowData) => (
        <TableRow
          key={childRowData.id}
          level={level + 1}
          rowData={childRowData}
          tableData={tableData}
        />
      ))}
    </>
  );
};
