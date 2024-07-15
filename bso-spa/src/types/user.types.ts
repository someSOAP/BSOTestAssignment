export interface User {
  blocked: boolean;
  confirmed: boolean;
  createdAt: string;
  email: string;
  id: never;
  provider: "local";
  updatedAt: string;
  username: string;
}
