import { RootAppState } from "@/types/store.types";

export const cartSelector = (state: RootAppState) => {
  return state.cartSliceReducer;
};

export const cartTotalPriceSelector = (state: RootAppState) => {
  return cartSelector(state).reduce((sum, item) => sum + item.price, 0);
};
