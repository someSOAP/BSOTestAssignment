import { FC } from "react";
import { Outlet, Link } from "react-router-dom";

import { Container, Header, Content, Navbar, Nav } from "rsuite";
import { Exit } from "@rsuite/icons";
import { useAppDispatch } from "@/hooks";
import { resetAuthStateAction } from "@/store/authSlice";
import { CART_ROUTE, PRODUCTS_ROUTE } from "@/constants";

export const AuthenticatedRoot: FC = () => {
  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    dispatch(resetAuthStateAction());
  };

  return (
    <Container className="h-full overflow-hidden flex flex-col">
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
      <Content className="flex 1 overflow-hidden">
        <Outlet />
      </Content>
    </Container>
  );
};

export default AuthenticatedRoot;
