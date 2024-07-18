import { FC } from "react";
import { Header, Nav, Navbar } from "rsuite";
import { Link } from "react-router-dom";

import { Exit } from "@rsuite/icons";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { CART_ROUTE, PRODUCTS_ROUTE } from "@/constants";
import { resetAuthStateAction, cartSelector } from "@/store";

import { usersApiService, authApiService } from "@/services";
export const HomeHeader: FC = () => {
  const dispatch = useAppDispatch();

  const cart = useAppSelector(cartSelector);

  const handleLogOut = () => {
    dispatch(usersApiService.util.resetApiState());
    dispatch(authApiService.util.resetApiState());
    dispatch(resetAuthStateAction());
  };

  return (
    <Header>
      <Navbar appearance="inverse">
        <Navbar.Brand>
          <span className="text-2xl">🤗</span>
        </Navbar.Brand>
        <Nav>
          <Nav.Item as={Link} to={PRODUCTS_ROUTE}>
            Products
          </Nav.Item>
          <Nav.Item as={Link} to={CART_ROUTE}>
            Cart {cart.length ? `(${cart.length})` : ""}
          </Nav.Item>
        </Nav>
        <Nav pullRight>
          <Nav.Item onClick={handleLogOut} icon={<Exit />} />
        </Nav>
      </Navbar>
    </Header>
  );
};

export default HomeHeader;
