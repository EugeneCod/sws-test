import { combineReducers, configureStore } from '@reduxjs/toolkit';
import type { Action, ThunkAction } from '@reduxjs/toolkit';

import tableDataReducer from './tableData/slice';

import { outlayRowApi } from '@/app/store/api/outlayRowApi';

const rootReducer = combineReducers({
  tableData: tableDataReducer,
  [outlayRowApi.reducerPath]: outlayRowApi.reducer,
});

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(outlayRowApi.middleware),
  });
  return store;
};

export const store = makeStore();

export type AppStore = typeof store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
