import { RootAppState } from "@/types/store.types";

export const cartSelector = (state: RootAppState) => {
  return state.cartSliceReducer;
};
