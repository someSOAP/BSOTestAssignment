import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";

import { Loader } from "rsuite";

import { isAuthenticatedSelector } from "@/store/authSlice";
import { useAppSelector, useAppStore } from "@/hooks";

import {
  SIGN_UP_ROUTE,
  SIGN_IN_ROUTE,
  HOME_ROUTE,
  ROOT_ROUTE,
} from "@/constants/route.constants";

const useAccessPolicy = () => {
  const [isChecking, setIsChecking] = useState(true);
  const store = useAppStore();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isAuthenticated = useAppSelector(isAuthenticatedSelector);

  useEffect(() => {
    const isAuthenticated = isAuthenticatedSelector(store.getState());
    const isAuthPath = [SIGN_IN_ROUTE, SIGN_UP_ROUTE].includes(pathname);

    if (!isAuthenticated && !isAuthPath) {
      navigate(SIGN_IN_ROUTE, { replace: true });
      return;
    }

    if (isAuthenticated && (isAuthPath || pathname === ROOT_ROUTE)) {
      navigate(HOME_ROUTE, { replace: true });
    }
    setIsChecking(false);
  }, [pathname, isAuthenticated]);

  return { isChecking };
};

export const RootRoute: FC = () => {
  const { isChecking } = useAccessPolicy();

  return (
    <div className="flex flex-1">
      {isChecking && <Loader center size="lg" content="Loading..." />}
      {!isChecking && <Outlet />}
    </div>
  );
};

export default RootRoute;
