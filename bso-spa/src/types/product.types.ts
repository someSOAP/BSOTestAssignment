import type {
  StrapiEntity,
  StrapiImageData,
  StrapiPopulatedProp,
} from "./strapi.types";

export type ProductType = StrapiEntity<{
  title: string;
  price: number;
  image?: StrapiPopulatedProp<StrapiImageData>;
}>;
