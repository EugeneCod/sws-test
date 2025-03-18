import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../store';

const selectTableState = (state: RootState) => state.tableData;

export const selectIsEditing = createSelector(
  [selectTableState],
  (tableDataState) => tableDataState.isEditing,
);

export const selectRows = createSelector(
  [selectTableState],
  (tableDataState) => tableDataState.rows,
);
