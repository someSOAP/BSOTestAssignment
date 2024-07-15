import { FC, PropsWithChildren } from "react";
import {
  Container,
  Content,
  FlexboxGrid,
  Form,
  FormProps,
  Panel,
} from "rsuite";

export interface FormPanelProps {
  isDisabled: boolean;
  onSubmit: FormProps["onSubmit"];
}

export const FormPanel: FC<PropsWithChildren<FormPanelProps>> = ({
  isDisabled,
  onSubmit,
  children,
}) => {
  return (
    <Container className="flex flex-col justify-center items-center">
      <Content className="flex flex-col justify-center w-full  max-w-screen-md">
        <FlexboxGrid justify="center">
          <FlexboxGrid.Item colspan={12}>
            <Panel header="Login" bordered>
              <Form fluid disabled={isDisabled} onSubmit={onSubmit}>
                {children}
              </Form>
            </Panel>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Content>
    </Container>
  );
};

export default FormPanel;
