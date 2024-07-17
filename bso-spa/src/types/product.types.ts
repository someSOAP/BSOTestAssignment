import {
  StrapiEntity,
  StrapiEntityDefaultAttributes,
  StrapiImageAttributes,
  StrapiImageData,
  StrapiPopulatedProp,
} from "./strapi.types";

export type ProductEntity = StrapiEntity<
  ProductAttributes & {
    image?: StrapiPopulatedProp<StrapiImageData>;
  }
>;

export interface ProductAttributes {
  title: string;
  price: number;
}

export interface ProductType
  extends ProductAttributes,
    StrapiEntityDefaultAttributes {
  id: number;
  image?: StrapiImageAttributes;
}
