import { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';

import s from './TableRow.module.scss';
import { TableData } from '@/components/TableData';
import { useAppDispatch } from '@/app/store/hooks';
import {
  useAddRowMutation,
  useDeleteRowMutation,
  useUpdateRowMutation,
} from '@/app/store/api/outlayRowApi';
import {
  addEmptyChildRow,
  addRow,
  deleteRow,
  updateRow,
} from '@/app/store/tableData/slice';
import { emptyRowData, getChildLength } from './TableRow.service';

import type { BaseRowData } from '@/types/api';
import type { TableRowProps } from './TableRow.types';

const HORISONTAL_LINE_HEIGHT_PX = 51;
const ADDITIONAL_LINE_HEIGHT_MULTIPLIER_PX = 9;
const INITIAL_LEVEL_DATA_WIDTH_PX = 70;
const LEVEL_DATA_PADDING_PX = 20;

export const TableRow = (props: TableRowProps) => {
  const { rowData, level, parentId } = props;

  const [isEditing, setIsEditing] = useState(!rowData.id);
  const [rowNameValue, setRowNameValue] = useState(rowData.rowName);
  const [salaryValue, setSalaryValue] = useState(rowData.salary);
  const [equipmentCostsValue, setEquipmentCostsValue] = useState(
    rowData.equipmentCosts,
  );
  const [overheadsValue, setOverheadsValue] = useState(rowData.overheads);
  const [estimatedProfitValue, setEstimatedProfitValue] = useState(
    rowData.estimatedProfit,
  );

  const dispatch = useAppDispatch();
  const childLength = getChildLength(rowData.child);

  const [updateRowMutation] = useUpdateRowMutation();
  const [addRowMutation] = useAddRowMutation();
  const [deleteRowMutation] = useDeleteRowMutation();

  const resetValues = useCallback(() => {
    setRowNameValue(rowData.rowName);
    setSalaryValue(rowData.salary);
    setEquipmentCostsValue(rowData.equipmentCosts);
    setOverheadsValue(rowData.overheads);
    setEstimatedProfitValue(rowData.estimatedProfit);
  }, [
    rowData.equipmentCosts,
    rowData.estimatedProfit,
    rowData.overheads,
    rowData.rowName,
    rowData.salary,
  ]);

  useEffect(() => {
    resetValues();
  }, [resetValues, rowData]);

  const getCurrentValues = useCallback((): BaseRowData => {
    return {
      rowName: rowNameValue,
      salary: salaryValue,
      equipmentCosts: equipmentCostsValue,
      overheads: overheadsValue,
      estimatedProfit: estimatedProfitValue,
      total: 0,
      mimExploitation: 0,
      machineOperatorSalary: 0,
      materials: 0,
      mainCosts: 0,
      supportCosts: 0,
    };
  }, [
    equipmentCostsValue,
    estimatedProfitValue,
    overheadsValue,
    rowNameValue,
    salaryValue,
  ]);

  const handleUpdateRow = useCallback(
    async (rowId: number) => {
      const currentValues = getCurrentValues();
      try {
        const changeRowResponse = (
          await updateRowMutation({ id: rowId, row: currentValues })
        ).data;

        if (changeRowResponse) dispatch(updateRow(changeRowResponse));
        setIsEditing(false);
      } catch (error) {
        console.error(error);
      }
    },
    [dispatch, getCurrentValues, updateRowMutation],
  );

  const handleAddRow = useCallback(async () => {
    const currentValues = getCurrentValues();
    try {
      const updatedRowsData = (
        await addRowMutation({ ...currentValues, parentId })
      ).data;
      if (updatedRowsData) dispatch(addRow({ parentId, updatedRowsData }));
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  }, [addRowMutation, dispatch, getCurrentValues, parentId]);

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
          handleAddRow();
        } else {
          handleUpdateRow(rowData.id);
        }
      }
    }

    if (isEditing) document.addEventListener('keyup', handleKeyup);

    return () => document.removeEventListener('keyup', handleKeyup);
  }, [
    dispatch,
    handleAddRow,
    handleUpdateRow,
    isEditing,
    resetValues,
    rowData.id,
  ]);

  const hadleCreateEmptyRow = () => {
    dispatch(addEmptyChildRow({ parentId: rowData.id, newRow: emptyRowData }));
  };

  const handleDelete = async (id: number | null) => {
    if (!id) {
      dispatch(deleteRow({ id }));
      return;
    }
    try {
      const updatedRowsData = (await deleteRowMutation(id)).data;
      if (updatedRowsData)
        dispatch(deleteRow({ id, changed: updatedRowsData.changed }));
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTrashBtnClick = () => {
    handleDelete(rowData.id);
  };

  const handleCreateBtnClick = () => {
    if (isEditing) return;
    hadleCreateEmptyRow();
  };

  const handleDoubleClick = () => {
    if (isEditing) return;
    setIsEditing(true);
  };

  const handleRowNameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setRowNameValue(evt.target.value);
  };

  const handlSalaryChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = evt.target.value === '' ? 0 : parseFloat(evt.target.value);
    setSalaryValue(newValue);
  };

  const handleEquipmentCostsChange = (
    evt: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = evt.target.value === '' ? 0 : parseFloat(evt.target.value);
    setEquipmentCostsValue(newValue);
  };

  const handlOverheadsChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = evt.target.value === '' ? 0 : parseFloat(evt.target.value);
    setOverheadsValue(newValue);
  };

  const handleEstimatedProfitChange = (
    evt: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = evt.target.value === '' ? 0 : parseFloat(evt.target.value);
    setEstimatedProfitValue(newValue);
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
          value={rowNameValue}
          onChange={handleRowNameChange}
          inputName={'rowName'}
          valueType="string"
        />
        <TableData
          className={s['numeric-data']}
          isEditing={isEditing}
          value={salaryValue}
          onChange={handlSalaryChange}
          inputName={'salary'}
          valueType="number"
        />
        <TableData
          className={s['numeric-data']}
          isEditing={isEditing}
          value={equipmentCostsValue}
          onChange={handleEquipmentCostsChange}
          inputName={'equipmentCosts'}
          valueType="number"
        />
        <TableData
          className={s['numeric-data']}
          isEditing={isEditing}
          value={overheadsValue}
          onChange={handlOverheadsChange}
          inputName={'overheads'}
          valueType="number"
        />
        <TableData
          className={s['numeric-data']}
          isEditing={isEditing}
          value={estimatedProfitValue}
          onChange={handleEstimatedProfitChange}
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
