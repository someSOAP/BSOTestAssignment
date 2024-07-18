import {
  combineReducers,
  configureStore,
  EnhancedStore,
} from "@reduxjs/toolkit";

import {
  authApiService,
  usersApiService,
  productsApiService,
} from "@/services";
import { authSliceReducer, listenerMiddleware } from "@/store/authSlice";
import { cartSliceReducer } from "@/store/cartSlice";
import { productsSliceReducer } from "@/store/productsSlice";
import { disabledProductsSliceReducer } from "@/store/disabledProductsSlice";

const reducer = combineReducers({
  authSliceReducer,
  cartSliceReducer,
  productsSliceReducer,
  disabledProductsSliceReducer,
  [authApiService.reducerPath]: authApiService.reducer,
  [usersApiService.reducerPath]: usersApiService.reducer,
  [productsApiService.reducerPath]: productsApiService.reducer,
});

export type AppReducerType = typeof reducer;
export type RootAppState = ReturnType<AppReducerType>;

export const initializeStore = (
  preloadedState?: Partial<RootAppState>
): EnhancedStore => {
  return configureStore({
    reducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware()
        .concat(authApiService.middleware)
        .concat(usersApiService.middleware)
        .concat(productsApiService.middleware)
        .concat(listenerMiddleware.middleware);
    },
  });
};
