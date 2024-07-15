import { FC } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { RootRoute } from "./RootRoute";
import { HomeRoute } from "./HomeRoute";
import { SignInRoute } from "./SignInRoute";
import { SignUpRoute } from "./SignUpRoute";

import {
  SIGN_UP_ROUTE,
  SIGN_IN_ROUTE,
  ROOT_ROUTE,
  HOME_ROUTE,
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
        path: HOME_ROUTE,
        element: <HomeRoute />,
      },
    ],
  },
]);

export const Router: FC = () => {
  return <RouterProvider router={browserRouter} />;
};

export default Router;
