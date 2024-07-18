import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { productsApiService } from "@/services";

import type { ProductType } from "@/types";

const getProductsSliceInitialState = (): ProductType[] => {
  return [];
};

const separateNewAndUpdatedProducts = (
  state: ProductType[],
  payload: ProductType[]
) => {
  const currentProductsMap = new Map<ProductType["id"], ProductType>();
  state.forEach((it) => {
    currentProductsMap.set(it.id, it);
  });

  const newProducts: ProductType[] = [];

  payload.forEach((it) => {
    if (currentProductsMap.has(it.id)) {
      currentProductsMap.set(it.id, it);
      return;
    }
    newProducts.push(it);
  });

  return { newProducts, currentProducts: currentProductsMap.values() };
};

const appendNewProducts = (
  state: ProductType[],
  payload: ProductType[]
): ProductType[] => {
  const { newProducts, currentProducts } = separateNewAndUpdatedProducts(
    state,
    payload
  );

  return [...currentProducts, ...newProducts];
};

const prependNewProducts = (
  state: ProductType[],
  payload: ProductType[]
): ProductType[] => {
  const { newProducts, currentProducts } = separateNewAndUpdatedProducts(
    state,
    payload
  );

  return [...newProducts, ...currentProducts];
};

const productsSlice = createSlice({
  name: "products-slice",
  initialState: getProductsSliceInitialState(),
  reducers: {
    appendProducts: (state, { payload }: PayloadAction<ProductType[]>) => {
      return appendNewProducts(state, payload);
    },
    prependProducts: (state, { payload }: PayloadAction<ProductType[]>) => {
      return prependNewProducts(state, payload);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      productsApiService.endpoints.productsPage.matchFulfilled,
      (state, { payload }) => {
        return appendNewProducts(state, payload.data);
      }
    );

    builder.addMatcher(
      productsApiService.endpoints.product.matchFulfilled,
      (state, { payload }) => {
        return prependNewProducts(state, [payload.data]);
      }
    );
  },
});

export const { appendProducts, prependProducts } = productsSlice.actions;

export const productsSliceReducer = productsSlice.reducer;
