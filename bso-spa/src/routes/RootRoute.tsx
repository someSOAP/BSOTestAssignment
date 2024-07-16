import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";

import { Loader } from "rsuite";

import { usersApiService } from "@/services";
import { isAuthenticatedSelector } from "@/store/authSlice";
import { useAppSelector } from "@/hooks";

import {
  SIGN_UP_ROUTE,
  SIGN_IN_ROUTE,
  PRODUCTS_ROUTE,
  ROOT_ROUTE,
} from "@/constants/route.constants";

const useAccessPolicy = () => {
  const [isChecking, setIsChecking] = useState(true);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isAuthenticated = useAppSelector(isAuthenticatedSelector);

  const { isLoading } = usersApiService.useMeQuery();

  useEffect(() => {
    if (isLoading) {
      return;
    }
    const isAuthPath = [SIGN_IN_ROUTE, SIGN_UP_ROUTE].includes(pathname);

    if (!isAuthenticated && !isAuthPath) {
      navigate(SIGN_IN_ROUTE, { replace: true });
      return;
    }

    if (isAuthenticated && (isAuthPath || pathname === ROOT_ROUTE)) {
      navigate(PRODUCTS_ROUTE, { replace: true });
    }
    setIsChecking(false);
  }, [pathname, isLoading, isAuthenticated]);

  return { isChecking: isChecking };
};

export const RootRoute: FC = () => {
  const { isChecking } = useAccessPolicy();

  return (
    <div className="flex flex-1 h-full">
      {isChecking && <Loader center size="lg" content="Loading..." />}
      {!isChecking && <Outlet />}
    </div>
  );
};

export default RootRoute;
