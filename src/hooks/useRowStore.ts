import { useCallback, useState } from 'react';

import {
  useAddRowMutation,
  useDeleteRowMutation,
  useUpdateRowMutation,
} from '@/app/store/api/outlayRowApi';
import { useAppDispatch } from '@/app/store/hooks';
import {
  addEmptyChildRow,
  addRow,
  deleteRow,
  updateRow,
} from '@/app/store/tableData/slice';

import type { BaseRowData, FullRowData } from '@/types/api';

export function useRowStore(onComplete: VoidFunction) {
  const [loading, setLoading] = useState(false);

  const [updateRowMutation] = useUpdateRowMutation();
  const [addRowMutation] = useAddRowMutation();
  const [deleteRowMutation] = useDeleteRowMutation();
  const dispatch = useAppDispatch();

  const handleUpdateRow = useCallback(
    async (rowId: number, currentValues: BaseRowData) => {
      try {
        setLoading(true);
        const changeRowResponse = (
          await updateRowMutation({ id: rowId, row: currentValues })
        ).data;

        if (changeRowResponse) dispatch(updateRow(changeRowResponse));
        onComplete();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [dispatch, onComplete, updateRowMutation],
  );

  const handleAddRow = useCallback(
    async (parentId: number | null, currentValues: BaseRowData) => {
      try {
        setLoading(true);
        const updatedRowsData = (
          await addRowMutation({ ...currentValues, parentId })
        ).data;
        if (updatedRowsData) dispatch(addRow({ parentId, updatedRowsData }));
        onComplete();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [addRowMutation, dispatch, onComplete],
  );

  const hadleCreateEmptyRow = useCallback(
    (parentId: number | null, newRow: FullRowData) => {
      dispatch(addEmptyChildRow({ parentId, newRow }));
    },
    [dispatch],
  );

  const handleDeleteRow = useCallback(
    async (id: number | null) => {
      if (!id) {
        dispatch(deleteRow({ id }));
        return;
      }
      try {
        setLoading(true);
        const updatedRowsData = (await deleteRowMutation(id)).data;
        if (updatedRowsData)
          dispatch(deleteRow({ id, changed: updatedRowsData.changed }));
        onComplete();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [deleteRowMutation, dispatch, onComplete],
  );

  return {
    handleUpdateRow,
    handleAddRow,
    hadleCreateEmptyRow,
    handleDeleteRow,
    dispatch,
    loading,
  };
}
