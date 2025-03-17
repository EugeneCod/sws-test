import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../store';

const selectTableState = (state: RootState) => state.table;

export const selectIsEditing = createSelector(
  [selectTableState],
  (userState) => userState.isEditing,
);
