import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, ENTITY_ID } from '@/app/constants/outlayRowApi';

export const outlayRowApi = createApi({
  reducerPath: 'outlayRowApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL + `/v1/outlay-rows/entity/${ENTITY_ID}`,
  }),
  endpoints: (builder) => ({
    getAll: builder.query({
      query: () => {
        return {
          url: '/row/list',
        };
      },
    }),
  }),
});

export const { useGetAllQuery } = outlayRowApi;
