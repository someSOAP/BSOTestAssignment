import { FC } from "react";
import { Outlet } from "react-router-dom";

import { AuthRootWrapper } from "@/components";

export const AuthenticatedRoot: FC = () => {
  return (
    <AuthRootWrapper>
      <Outlet />
    </AuthRootWrapper>
  );
};

export default AuthenticatedRoot;
