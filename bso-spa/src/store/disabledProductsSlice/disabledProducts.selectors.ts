import { createSelector } from "@reduxjs/toolkit";
import { RootAppState } from "@/types/store.types";

export const disabledProductsSelector = (state: RootAppState) => {
  return state.disabledProductsSliceReducer;
};

export const disabledProductsIdSetSelector = createSelector(
  disabledProductsSelector,
  (state) => {
    return new Set(state.map((it) => it.id));
  }
);
