import { FC } from "react";
import { Outlet } from "react-router-dom";

import { Container, Content } from "rsuite";

import { HomeHeader } from "@/components";

export const AuthenticatedRoot: FC = () => {
  return (
    <Container className="h-full overflow-hidden flex flex-col">
      <HomeHeader />
      <Content className="flex 1 overflow-hidden">
        <Outlet />
      </Content>
    </Container>
  );
};

export default AuthenticatedRoot;
