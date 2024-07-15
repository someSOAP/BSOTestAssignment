import { useDispatch } from "react-redux";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";

import type { RootAppState } from "@/types";

export const useAppDispatch = () => {
  return useDispatch<ThunkDispatch<RootAppState, void, Action>>();
};
