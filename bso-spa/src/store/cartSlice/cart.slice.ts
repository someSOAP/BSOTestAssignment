import { createSlice } from "@reduxjs/toolkit";

import { usersApiService, productsApiService } from "@/services";
import type { ProductType } from "@/types";

const getCartSliceInitialState = (): ProductType[] => {
  return [];
};

const cartSlice = createSlice({
  name: "cart-slice",
  initialState: getCartSliceInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      usersApiService.endpoints.myCart.matchFulfilled,
      (_, { payload }) => {
        return payload.cart;
      }
    );
    builder.addMatcher(
      usersApiService.endpoints.addToCart.matchFulfilled,
      (_, { payload }) => {
        return payload.cart;
      }
    );
    builder.addMatcher(
      usersApiService.endpoints.removeFromCart.matchFulfilled,
      (_, { payload }) => {
        return payload.cart;
      }
    );
    builder.addMatcher(
      usersApiService.endpoints.emptyCart.matchFulfilled,
      (_, { payload }) => {
        return payload.cart;
      }
    );
    builder.addMatcher(
      productsApiService.endpoints.product.matchFulfilled,
      (state, { payload }) => {
        const updatedProduct = payload.data;
        return state.map((it) => {
          if (it.id === updatedProduct.id) {
            return updatedProduct;
          }
          return it;
        });
      }
    );
  },
});

export const {} = cartSlice.actions;

export const cartSliceReducer = cartSlice.reducer;
