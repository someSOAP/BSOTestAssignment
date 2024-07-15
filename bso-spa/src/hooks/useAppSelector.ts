import { TypedUseSelectorHook, useSelector } from "react-redux";

import { RootAppState } from "@/types";

export const useAppSelector: TypedUseSelectorHook<RootAppState> = useSelector;
