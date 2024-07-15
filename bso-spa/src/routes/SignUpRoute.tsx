import { FC } from "react";

import { Form, FormProps, ButtonToolbar, Button, Text } from "rsuite";

import { FormPanel } from "@/components";
import { authApiService } from "@/services";
import { StrapiResponseError } from "@/types/strapi.types.ts";

export const SignUpRoute: FC = () => {
  const { useRegisterMutation } = authApiService;
  const [register, { isLoading, error }] = useRegisterMutation();

  const errorTyped = error as StrapiResponseError | undefined;

  const handleAuth: FormProps["onSubmit"] = (formValue) => {
    if (!formValue) {
      return;
    }
    const { password, email, username } = formValue;

    if (!password || !email || !username) {
      return;
    }

    register({ password, email, username });
  };

  return (
    <FormPanel isDisabled={isLoading} onSubmit={handleAuth}>
      <Form.Group>
        <Form.ControlLabel>Username</Form.ControlLabel>
        <Form.Control name="username" />
      </Form.Group>
      <Form.Group>
        <Form.ControlLabel>Email</Form.ControlLabel>
        <Form.Control name="email" type="email" inputMode="email" />
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
          <Button loading={isLoading} type="submit" appearance="primary">
            Sign Up
          </Button>
        </ButtonToolbar>
      </Form.Group>
    </FormPanel>
  );
};

export default SignUpRoute;
