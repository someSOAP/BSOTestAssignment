import { useStore } from "react-redux";

import { Store } from "@reduxjs/toolkit";

import type { RootAppState } from "@/types/store.types";

export const useAppStore = (): Store<RootAppState> => useStore<RootAppState>();
