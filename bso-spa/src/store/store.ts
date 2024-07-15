import {
  combineReducers,
  configureStore,
  EnhancedStore,
} from "@reduxjs/toolkit";

import { authApiService } from "@/services";
import { authSliceReducer } from "@/store/authSlice";

const reducer = combineReducers({
  authSliceReducer,
  [authApiService.reducerPath]: authApiService.reducer,
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
      return getDefaultMiddleware().concat(authApiService.middleware);
    },
  });
};
