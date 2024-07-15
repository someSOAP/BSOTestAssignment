import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { STRAPI_API } from "@/constants";
import type { User } from "@/types";

export interface RegisterApiProps {
  email: string;
  password: string;
  username: string;
}

export interface AuthenticateApiProps {
  identifier: string;
  password: string;
}

export interface StrapiAuthResponse {
  jwt: string;
  user: User;
}

export const authApiService = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${STRAPI_API}/auth/local`,
  }),
  endpoints: (build) => ({
    register: build.mutation<StrapiAuthResponse, RegisterApiProps>({
      query: (body) => ({
        url: "/register",
        method: "POST",
        body,
      }),
      transformErrorResponse: (response) => {
        return (response.data as any).error;
      },
    }),
    logIn: build.mutation<StrapiAuthResponse, AuthenticateApiProps>({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
      transformErrorResponse: (response) => {
        return (response.data as any).error;
      },
    }),
  }),
});
