import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { STRAPI_API } from "@/constants";
import type { RootAppState, User } from "@/types";

export const usersApiService = createApi({
  reducerPath: "usersApiService",
  baseQuery: fetchBaseQuery({
    baseUrl: `${STRAPI_API}/users/`,
    prepareHeaders: (headers, api) => {
      const state = <RootAppState>api.getState();
      headers.set("Authorization", `Bearer  ${state.authSliceReducer.token}`);
    },
  }),
  endpoints: (build) => ({
    me: build.query<User, void>({
      query: () => "me",
    }),
  }),
});
