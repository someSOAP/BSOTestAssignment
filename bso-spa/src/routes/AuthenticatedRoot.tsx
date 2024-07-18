import { FC, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { io } from "socket.io-client";

import { Container, Content } from "rsuite";

import { usersApiService, productsApiService } from "@/services";

import { HomeHeader } from "@/components";
import { STRAPI_URL } from "@/constants";
import { useAppDispatch, useAppStore } from "@/hooks";
import {
  appendDisabledProduct,
  appendProducts,
  prependProducts,
} from "@/store";
import type { ProductType, StrapiResponse } from "@/types";

const { useMyCartQuery } = usersApiService;
const { useLazyProductQuery } = productsApiService;

type StrapiIOResponse = StrapiResponse<Omit<ProductType, "image">>;

export const AuthenticatedRoot: FC = () => {
  useMyCartQuery();
  const store = useAppStore();
  const dispatch = useAppDispatch();
  const [fetchProduct] = useLazyProductQuery();

  useEffect(() => {
    const token = store.getState().authSliceReducer.token;

    const socket = io(STRAPI_URL, {
      auth: {
        strategy: "jwt",
        token: token,
      },
    });

    socket.on("connect", () => {
      socket.on("product:create", (data: StrapiIOResponse) => {
        fetchProduct(data.data.id)
          .unwrap()
          .then((res) => {
            dispatch(prependProducts([res.data]));
          });
      });
      socket.on("product:update", (data: StrapiIOResponse) => {
        fetchProduct(data.data.id)
          .unwrap()
          .then((res) => {
            dispatch(appendProducts([res.data]));
          });
      });
      socket.on("product:delete", (data: StrapiIOResponse) => {
        dispatch(appendDisabledProduct(data.data));
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
