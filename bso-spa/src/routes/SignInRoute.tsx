import { FC } from "react";

import { Link } from "react-router-dom";
import { Button, ButtonToolbar, Form, FormProps, Text } from "rsuite";

import { FormPanel } from "@/components";
import { SIGN_UP_ROUTE } from "@/constants";
import { authApiService } from "@/services";
import { StrapiResponseError } from "@/types/strapi.types.ts";

export const SignInRoute: FC = () => {
  const { useLogInMutation } = authApiService;

  const [logIn, { isLoading, error }] = useLogInMutation();

  const errorTyped = error as StrapiResponseError | undefined;

  const handleLogIn: FormProps["onSubmit"] = (formValue) => {
    logIn(formValue as any);
  };

  return (
    <FormPanel onSubmit={handleLogIn} isDisabled={isLoading}>
      <Form.Group>
        <Form.ControlLabel>Username</Form.ControlLabel>
        <Form.Control name="identifier" />
      </Form.Group>
      <Form.Group>
        <Form.ControlLabel>Password</Form.ControlLabel>
        <Form.Control name="password" type="password" autoComplete="off" />
      </Form.Group>
      <Form.Group>
        {errorTyped && <Text color="red">{errorTyped.message}</Text>}
      </Form.Group>

      <Form.Group>
        <ButtonToolbar>
          <Button type="submit" appearance="primary">
            Sign In
          </Button>
          <Link to={SIGN_UP_ROUTE}>
            <Button loading={isLoading} appearance="link">
              Create New Account
            </Button>
          </Link>
        </ButtonToolbar>
      </Form.Group>
    </FormPanel>
  );
};

export default SignInRoute;
