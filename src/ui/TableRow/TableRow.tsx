import { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';

import s from './TableRow.module.scss';
import { TableData } from '@/components/TableData';
import { deleteRow } from '@/app/store/tableData/slice';
import { emptyRowData, getChildLength } from './TableRow.service';

import type { TableRowProps } from './TableRow.types';
import { useRowData, useRowStore } from '@/hooks';

const HORISONTAL_LINE_HEIGHT_PX = 51;
const ADDITIONAL_LINE_HEIGHT_MULTIPLIER_PX = 9;
const INITIAL_LEVEL_DATA_WIDTH_PX = 70;
const LEVEL_DATA_PADDING_PX = 20;

export const TableRow = (props: TableRowProps) => {
  const { rowData, level, parentId } = props;

  const [isEditing, setIsEditing] = useState(!rowData.id);

  const { values, handleChange, resetValues, getCurrentValues } =
    useRowData(rowData);

  const finishEditing = useCallback(() => {
    setIsEditing(false);
  }, []);

  const {
    dispatch,
    hadleCreateEmptyRow,
    handleUpdateRow,
    handleAddRow,
    handleDeleteRow,
  } = useRowStore(finishEditing);

  const childLength = getChildLength(rowData.child);

  useEffect(() => {
    resetValues();
  }, [resetValues, rowData]);

  useEffect(() => {
    function handleKeyup(evt: KeyboardEvent) {
      if (evt.key === 'Escape') {
        setIsEditing(false);
        if (rowData.id === null) {
          dispatch(deleteRow({ id: null }));
        } else {
          resetValues();
        }
      }
      if (evt.key === 'Enter') {
        if (rowData.id === null) {
          handleAddRow(parentId, getCurrentValues());
        } else {
          handleUpdateRow(rowData.id, getCurrentValues());
        }
      }
    }

    if (isEditing) document.addEventListener('keyup', handleKeyup);

    return () => document.removeEventListener('keyup', handleKeyup);
  }, [
    dispatch,
    getCurrentValues,
    handleAddRow,
    handleUpdateRow,
    isEditing,
    parentId,
    resetValues,
    rowData.id,
  ]);

  const handleTrashBtnClick = () => {
    handleDeleteRow(rowData.id);
  };

  const handleCreateBtnClick = () => {
    if (isEditing) return;
    hadleCreateEmptyRow(rowData.id, emptyRowData);
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
                    handleCreateBtnClick();
                  }}
                />
                <button
                  className={clsx(s['panel-btn'], s['trash-btn'])}
                  onClick={() => {
                    handleTrashBtnClick();
                  }}
                />
              </div>
            </div>
          </div>
        </td>
        <TableData
          className={s['row-name-data']}
          isEditing={isEditing}
          value={values.rowName}
          onChange={handleChange}
          inputName={'rowName'}
          valueType="string"
        />
        <TableData
          className={s['numeric-data']}
          isEditing={isEditing}
          value={values.salary}
          onChange={handleChange}
          inputName={'salary'}
          valueType="number"
        />
        <TableData
          className={s['numeric-data']}
          isEditing={isEditing}
          value={values.equipmentCosts}
          onChange={handleChange}
          inputName={'equipmentCosts'}
          valueType="number"
        />
        <TableData
          className={s['numeric-data']}
          isEditing={isEditing}
          value={values.overheads}
          onChange={handleChange}
          inputName={'overheads'}
          valueType="number"
        />
        <TableData
          className={s['numeric-data']}
          isEditing={isEditing}
          value={values.estimatedProfit}
          onChange={handleChange}
          inputName={'estimatedProfit'}
          valueType="number"
        />
      </tr>
      {rowData.child.map((childRowData) => (
        <TableRow
          key={childRowData.id}
          level={level + 1}
          rowData={childRowData}
          parentId={rowData.id}
        />
      ))}
    </>
  );
};
