import { createSlice } from '@reduxjs/toolkit';

import type { TableState } from './types';

const initialState: TableState = {
  isEditing: false,
};

export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    toggleEditing: (state) => {
      state.isEditing = !state.isEditing;
    },
  },
});

export default userSlice.reducer;

export const { toggleEditing } = userSlice.actions;
