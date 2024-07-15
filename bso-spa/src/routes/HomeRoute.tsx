import { FC } from "react";
import { Link } from "react-router-dom";
import { ROOT_ROUTE, SIGN_UP_ROUTE } from "@/constants";

export interface HomeRouteProps {
  [key: string]: any;
}
export const HomeRoute: FC<HomeRouteProps> = () => {
  return (
    <div>
      <h2>Home Page</h2>
      <Link to={SIGN_UP_ROUTE}>To SignUp</Link>
      <Link to={ROOT_ROUTE}>To Root</Link>
    </div>
  );
};

export default HomeRoute;
