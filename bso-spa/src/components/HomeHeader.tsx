import { FC } from "react";
import { Header, Nav, Navbar } from "rsuite";
import { Link } from "react-router-dom";

import { Exit } from "@rsuite/icons";

import { useAppDispatch } from "@/hooks";
import { CART_ROUTE, PRODUCTS_ROUTE } from "@/constants";
import { resetAuthStateAction } from "@/store";

export const HomeHeader: FC = () => {
  const dispatch = useAppDispatch();

  const handleLogOut = () => {
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
            Cart
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
