import { createSlice } from "@reduxjs/toolkit";

import { authApiService } from "@/services";
import { User } from "@/types";

export interface AuthSlice {
  isAuthenticated: boolean;
  token: string | undefined;
  user: User | null;
}

const getUtilSliceInitialState = () => {
  const initialState: AuthSlice = {
    isAuthenticated: false,
    token: undefined,
    user: null,
  };
  return initialState;
};

const authSlice = createSlice({
  name: "auth-slice",
  initialState: getUtilSliceInitialState(),
  reducers: {
    resetAuthStateAction() {
      return getUtilSliceInitialState();
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApiService.endpoints.logIn.matchRejected,
      getUtilSliceInitialState
    );
    builder.addMatcher(
      authApiService.endpoints.logIn.matchFulfilled,
      (state, { payload }) => {
        state.isAuthenticated = true;
        state.token = payload.jwt;
        state.user = payload.user;
      }
    );
    builder.addMatcher(
      authApiService.endpoints.register.matchRejected,
      getUtilSliceInitialState
    );
    builder.addMatcher(
      authApiService.endpoints.register.matchFulfilled,
      (state, { payload }) => {
        state.isAuthenticated = true;
        state.token = payload.jwt;
        state.user = payload.user;
      }
    );
  },
});

export const { resetAuthStateAction } = authSlice.actions;

export const authSliceReducer = authSlice.reducer;
