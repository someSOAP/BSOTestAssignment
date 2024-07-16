import { ProductType } from "@/types/product.types.ts";

export interface User {
  blocked: boolean;
  confirmed: boolean;
  createdAt: string;
  email: string;
  id: never;
  provider: "local";
  updatedAt: string;
  username: string;
  cart?: ProductType[];
}

export type UserCart = Required<Pick<User, "cart" | "id">>;
