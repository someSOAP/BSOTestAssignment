import { createSlice } from "@reduxjs/toolkit";

import { authApiService, usersApiService } from "@/services";
import { User } from "@/types";

import { TOKEN_KEY } from "./auth.constants";

export interface AuthSlice {
  isAuthenticated: boolean;
  token: string | undefined;
  user: User | null;
}

const getUtilSliceInitialState = (clearToken?: boolean) => {
  if (clearToken) {
    localStorage.removeItem(TOKEN_KEY);
  }
  const initialState: AuthSlice = {
    isAuthenticated: false,
    token: localStorage.getItem(TOKEN_KEY) ?? undefined,
    user: null,
  };
  return initialState;
};

const authSlice = createSlice({
  name: "auth-slice",
  initialState: getUtilSliceInitialState(),
  reducers: {
    resetAuthStateAction() {
      return getUtilSliceInitialState(true);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      usersApiService.endpoints.me.matchFulfilled,
      (state, { payload }) => {
        console.log("ME");
        console.log("ME");
        console.log({ payload });
        console.log("ME");
        console.log("ME");
        state.isAuthenticated = true;
        state.user = payload;
      }
    );
    builder.addMatcher(authApiService.endpoints.logIn.matchRejected, () =>
      getUtilSliceInitialState(true)
    );
    builder.addMatcher(
      authApiService.endpoints.logIn.matchFulfilled,
      (state, { payload }) => {
        state.isAuthenticated = true;
        state.token = payload.jwt;
        state.user = payload.user;
      }
    );
    builder.addMatcher(authApiService.endpoints.register.matchRejected, () =>
      getUtilSliceInitialState(true)
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
