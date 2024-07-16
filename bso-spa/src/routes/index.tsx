import { FC } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { RootRoute } from "./RootRoute";
import { AuthenticatedRoot } from "./AuthenticatedRoot";
import { ProductsRoute } from "./ProductsRoute";
import { SignInRoute } from "./SignInRoute";
import { SignUpRoute } from "./SignUpRoute";
import { CartRoute } from "./CartRoute.tsx";

import {
  SIGN_UP_ROUTE,
  SIGN_IN_ROUTE,
  ROOT_ROUTE,
  PRODUCTS_ROUTE,
  CART_ROUTE,
} from "@/constants/route.constants";

const browserRouter = createBrowserRouter([
  {
    path: ROOT_ROUTE,
    element: <RootRoute />,
    children: [
      {
        path: SIGN_UP_ROUTE,
        element: <SignUpRoute />,
      },
      {
        path: SIGN_IN_ROUTE,
        element: <SignInRoute />,
      },
      {
        element: <AuthenticatedRoot />,
        children: [
          {
            path: PRODUCTS_ROUTE,
            element: <ProductsRoute />,
          },
          {
            path: CART_ROUTE,
            element: <CartRoute />,
          },
        ],
      },
    ],
  },
]);

export const Router: FC = () => {
  return <RouterProvider router={browserRouter} />;
};

export default Router;
