import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { STRAPI_API } from "@/constants";
import { RootAppState, User, UserCart } from "@/types";

const CART_API_URL = "me/?populate[cart][populate][0]=image&fields[0]=id";

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
    myCart: build.query<UserCart, void>({
      query: () => CART_API_URL,
    }),
    emptyCart: build.mutation<UserCart, void>({
      query: () => ({
        url: CART_API_URL,
        method: "PUT",
        body: {
          cart: [],
        },
      }),
    }),
    addToCart: build.mutation<UserCart, number>({
      queryFn: async (newItemId, api, _, fetchWithBQ) => {
        const cart = (api.getState() as RootAppState).cartSliceReducer;

        const cartItemIdSet = new Set(cart.map((it) => it.id));
        cartItemIdSet.add(newItemId);

        try {
          const res = await fetchWithBQ({
            url: CART_API_URL,
            method: "PUT",
            body: {
              cart: Array.from(cartItemIdSet),
            },
          });
          return { data: res.data as UserCart };
        } catch (err) {
          return { error: err as FetchBaseQueryError };
        }
      },
    }),
    removeFromCart: build.mutation<UserCart, number>({
      queryFn: async (itemIdToRemove, api, _, fetchWithBQ) => {
        const cart = (api.getState() as RootAppState).cartSliceReducer;

        const cartItemIdSet = new Set(cart.map((it) => it.id));
        cartItemIdSet.delete(itemIdToRemove);

        try {
          const res = await fetchWithBQ({
            url: CART_API_URL,
            method: "PUT",
            body: {
              cart: Array.from(cartItemIdSet),
            },
          });
          return { data: res.data as UserCart };
        } catch (err) {
          return { error: err as FetchBaseQueryError };
        }
      },
    }),
  }),
});
