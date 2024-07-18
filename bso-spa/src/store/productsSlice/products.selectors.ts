import { RootAppState } from "@/types/store.types";

export const productsSelector = (state: RootAppState) => {
  return state.productsSliceReducer;
};
