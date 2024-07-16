import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { STRAPI_API } from "@/constants";
import type { RootAppState, ProductEntity, StrapiResponse } from "@/types";

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
    productsPage: build.query<StrapiResponse<ProductEntity[]>, number>({
      query: (page: number) =>
        `?pagination[page]=${page}&sort[0]=publishedAt:desc&populate[0]=image`,
      merge: (currentData, newData) => {
        currentData.data.push(...newData.data);
        currentData.meta = newData.meta;
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        return currentArg != previousArg;
      },
    }),
    product: build.query<StrapiResponse<ProductEntity>, number>({
      query: (id) => `/${id}?populate[0]=image`,
    }),
  }),
});
