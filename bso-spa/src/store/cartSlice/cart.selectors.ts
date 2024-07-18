import { createSelector } from "@reduxjs/toolkit";
import { RootAppState } from "@/types/store.types";

import { disabledProductsIdSetSelector } from "@/store/disabledProductsSlice";

export const cartSelector = (state: RootAppState) => {
  return state.cartSliceReducer;
};

export const cartTotalPriceSelector = createSelector(
  cartSelector,
  disabledProductsIdSetSelector,
  (cart, disabledProductsSet) => {
    return cart.reduce((sum, item) => {
      if (disabledProductsSet.has(item.id)) {
        return sum;
      }
      return sum + item.price;
    }, 0);
  }
);
