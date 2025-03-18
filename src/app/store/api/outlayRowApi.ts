import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, ENTITY_ID } from '@/app/constants/outlayRowApi';
import {
  ChangeRowResponce,
  CreateRowDTO,
  FullRowData,
  UpdateRowDTO,
} from '@/types/api';

export const outlayRowApi = createApi({
  reducerPath: 'outlayRowApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL + `/v1/outlay-rows/entity/${ENTITY_ID}`,
  }),
  endpoints: (builder) => ({
    getTableData: builder.query<FullRowData[], void>({
      query: () => {
        return {
          url: '/row/list',
        };
      },
    }),

    updateRow: builder.mutation<
      ChangeRowResponce,
      { id: number; row: UpdateRowDTO }
    >({
      query: ({ id, row }) => ({
        url: `/row/${id}/update`,
        method: 'POST',
        body: row,
      }),
    }),

    addRow: builder.mutation<ChangeRowResponce, CreateRowDTO>({
      query: (newRow) => ({
        url: `/row/create`,
        method: 'POST',
        body: newRow,
      }),
    }),

    deleteRow: builder.mutation<ChangeRowResponce, number>({
      query: (id) => ({
        url: `/row/${id}/delete`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetTableDataQuery,
  useUpdateRowMutation,
  useAddRowMutation,
  useDeleteRowMutation,
} = outlayRowApi;
