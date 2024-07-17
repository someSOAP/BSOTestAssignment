import { StrapiEntityDefaultAttributes, StrapiImage } from "./strapi.types";

export interface ProductType extends StrapiEntityDefaultAttributes {
  title: string;
  price: number;
  image?: StrapiImage;
}
