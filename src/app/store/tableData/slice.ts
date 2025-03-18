import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  addRowAndUpdateRows,
  addRowRecursive,
  deleteRowAndUpdate,
  updateRows,
} from './utils';

import type { TableDataState } from './types';
import type {
  BaseRowDataWithId,
  ChangeRowResponce,
  FullRowData,
} from '@/types/api';

const initialState: TableDataState = {
  rows: [],
  isEditing: false,
};

const tableDataSlice = createSlice({
  name: 'tableDataSlice',
  initialState,
  reducers: {
    setTableData(state, action: PayloadAction<Array<FullRowData>>) {
      state.rows = action.payload;
    },

    toggleEditing: (state) => {
      state.isEditing = !state.isEditing;
    },

    updateRow(state, action: PayloadAction<ChangeRowResponce>) {
      state.rows = updateRows(state.rows, action.payload);
    },

    addRow(
      state,
      action: PayloadAction<{
        parentId: number | null;
        updatedRowsData: ChangeRowResponce;
      }>,
    ) {
      const { parentId, updatedRowsData } = action.payload;

      if (parentId === null) {
        state.rows.push({ ...updatedRowsData.current, child: [] });
      } else {
        state.rows = addRowAndUpdateRows(state.rows, parentId, updatedRowsData);
      }
    },

    // Добавление пустой строки в качестве корневой или дочерней
    addEmptyChildRow(
      state,
      action: PayloadAction<{ parentId: number | null; newRow: FullRowData }>,
    ) {
      const { parentId, newRow } = action.payload;

      if (parentId === null) {
        state.rows.push(newRow);
      } else {
        state.rows = addRowRecursive(state.rows, newRow, parentId);
      }
    },

    deleteRow(
      state,
      action: PayloadAction<{
        id: number | null;
        changed?: BaseRowDataWithId[];
      }>,
    ) {
      const { id, changed = [] } = action.payload;
      state.rows = deleteRowAndUpdate(state.rows, id, changed);
    },
  },
});

export const {
  setTableData,
  toggleEditing,
  updateRow,
  addRow,
  addEmptyChildRow,
  deleteRow,
} = tableDataSlice.actions;
export default tableDataSlice.reducer;
