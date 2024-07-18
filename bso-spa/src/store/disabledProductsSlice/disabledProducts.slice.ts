import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { ProductType } from "@/types";

const getProductsSliceInitialState = (): ProductType[] => {
  return [];
};

const disabledProductsSlice = createSlice({
  name: "products-slice",
  initialState: getProductsSliceInitialState(),
  reducers: {
    appendDisabledProduct: (state, { payload }: PayloadAction<ProductType>) => {
      return [...state, payload];
    },
  },
});

export const { appendDisabledProduct } = disabledProductsSlice.actions;

export const disabledProductsSliceReducer = disabledProductsSlice.reducer;
