import type {
  StrapiEntity,
  StrapiEntityDefaultAttributes,
  StrapiImageData,
  StrapiPopulatedProp,
} from "./strapi.types";

export type ProductEntity = StrapiEntity<ProductAttributes>;

export interface ProductAttributes {
  title: string;
  price: number;
  image?: StrapiPopulatedProp<StrapiImageData>;
}

export interface ProductType
  extends ProductAttributes,
    StrapiEntityDefaultAttributes {
  id: number;
}
