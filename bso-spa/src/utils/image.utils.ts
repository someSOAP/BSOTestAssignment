import type { StrapiImageData, StrapiImageSize } from "@/types";
import { STRAPI_URL } from "@/constants";

export const getImageUrl = (image: StrapiImageData, size?: StrapiImageSize) => {
  const imgUrl = size
    ? image.attributes.formats[size].url
    : image.attributes.url;
  return `${STRAPI_URL}${imgUrl}`;
};
