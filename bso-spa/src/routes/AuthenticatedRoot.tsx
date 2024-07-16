import { FC } from "react";
import { Outlet } from "react-router-dom";

import { Container, Content } from "rsuite";

import { usersApiService } from "@/services";

import { HomeHeader } from "@/components";

const { useMyCartQuery } = usersApiService;

export const AuthenticatedRoot: FC = () => {
  useMyCartQuery();

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
