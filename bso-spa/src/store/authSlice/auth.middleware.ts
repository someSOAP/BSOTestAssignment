import { createListenerMiddleware } from "@reduxjs/toolkit";

import { TOKEN_KEY } from "./auth.constants";
import { RootAppState } from "@/store";

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  predicate: (_, currentState, originalState) => {
    const currState = currentState as RootAppState;
    const origState = originalState as RootAppState;

    return (
      currState.authSliceReducer.token !== origState.authSliceReducer.token
    );
  },
  effect: (_, api) => {
    const state = api.getState() as RootAppState;
    const token = state.authSliceReducer.token;
    if (!token) {
      localStorage.removeItem(TOKEN_KEY);
      return;
    }
    localStorage.setItem(TOKEN_KEY, token);
  },
});
