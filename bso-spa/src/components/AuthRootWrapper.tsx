import { FC, useEffect, PropsWithChildren } from "react";
import { io } from "socket.io-client";

import { Container, Content } from "rsuite";

import { usersApiService, productsApiService } from "@/services";

import { HomeHeader } from "@/components";
import { STRAPI_URL } from "@/constants";
import { useAppDispatch, useAppStore } from "@/hooks";
import { appendDisabledProduct } from "@/store";
import type { ProductType, StrapiResponse } from "@/types";

const { useMyCartQuery } = usersApiService;
const { useLazyProductQuery } = productsApiService;

type StrapiIOResponse = StrapiResponse<Omit<ProductType, "image">>;

export const AuthRootWrapper: FC<PropsWithChildren> = ({ children }) => {
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
        fetchProduct(data.data.id);
      });
      socket.on("product:update", (data: StrapiIOResponse) => {
        fetchProduct(data.data.id);
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
      <Content className="flex 1 overflow-hidden">{children}</Content>
    </Container>
  );
};

export default AuthRootWrapper;
