import { FC, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { io } from "socket.io-client";

import { Container, Content } from "rsuite";

import { usersApiService } from "@/services";

import { HomeHeader } from "@/components";
import { STRAPI_URL } from "@/constants";
import { useAppStore } from "@/hooks";

const { useMyCartQuery } = usersApiService;

export const AuthenticatedRoot: FC = () => {
  useMyCartQuery();
  const store = useAppStore();

  useEffect(() => {
    const token = store.getState().authSliceReducer.token;

    const socket = io(STRAPI_URL, {
      auth: {
        strategy: "jwt",
        token: token,
      },
    });

    socket.on("connect", () => {
      socket.on("product:create", (data) => {
        debugger;
        console.log(data);
        console.log("EVENT");
      });
      socket.on("product:update", (data) => {
        debugger;
        console.log(data);
      });
      socket.on("product:delete", (data) => {
        debugger;
        console.log(data);
        console.log("EVENT");
      });
    });

    socket.on("connect_error", (err) => {
      console.error("CONNECT ERROR!", err);
      socket.removeAllListeners().disconnect();
    });

    return () => {
      socket.removeAllListeners().disconnect();
    };
  }, []);

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
