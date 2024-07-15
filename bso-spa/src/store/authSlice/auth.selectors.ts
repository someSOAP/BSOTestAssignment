import { RootAppState } from "@/types/store.types";

const authRootSelector = (state: RootAppState) => {
  return state.authSliceReducer;
};

export const isAuthenticatedSelector = (state: RootAppState) => {
  return authRootSelector(state).isAuthenticated;
};
