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

const reducer = combineReducers({
  authSliceReducer,
  cartSliceReducer,
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
