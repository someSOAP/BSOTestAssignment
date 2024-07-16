import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { STRAPI_API } from "@/constants";
import type { RootAppState } from "@/types";

export const productsApiService = createApi({
  reducerPath: "productsApiService",
  baseQuery: fetchBaseQuery({
    baseUrl: `${STRAPI_API}/products/`,
    prepareHeaders: (headers, api) => {
      const state = <RootAppState>api.getState();
      headers.set("Authorization", `Bearer  ${state.authSliceReducer.token}`);
    },
  }),
  endpoints: (build) => ({
    productsPage: build.query<any, number>({
      query: (page: number) =>
        `?pagination[page]=${page}&sort[0]=publishedAt:desc`,
    }),
  }),
});
