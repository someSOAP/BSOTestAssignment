import { StrapiImageAttributes, StrapiImageSize } from "@/types";
import { STRAPI_URL } from "@/constants";

export const getImageUrl = (
  image: StrapiImageAttributes,
  size?: StrapiImageSize
) => {
  const imgUrl = size ? image.formats[size].url : image.url;
  return `${STRAPI_URL}${imgUrl}`;
};

export const getImageAlt = (image: StrapiImageAttributes) => {
  return image.alternativeText ?? image.name;
};
