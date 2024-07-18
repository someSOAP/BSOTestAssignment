import { FC } from "react";

import { List, Heading } from "rsuite";

import { getImageUrl, formatPrice, getImageAlt } from "@/utils";
import { Link } from "react-router-dom";

import { PRODUCTS_ROUTE } from "@/constants";

import type { ProductType } from "@/types";

import { ProductCartBtn } from "./ProductCartBtn";
import { Unavailable } from "./Unavailable";

export interface ProductItemProps {
  product: ProductType;
}

export const ProductItem: FC<ProductItemProps> = ({ product }) => {
  const image = product.image;

  return (
    <List.Item className="max-w-screen-md m-auto">
      <div className="max-h-[40vh] relative overflow-hidden">
        {image && (
          <div className="w-full overflow-hidden shrink-0">
            <img
              className="object-contain w-full h-full"
              src={getImageUrl(image, "medium")}
              alt={getImageAlt(image)}
            />
          </div>
        )}
        <Unavailable productId={product.id} />
        <div className="flex flex-col justify-between absolute top-0 w-full h-full">
          <div className="bg-gray-100 bg-opacity-60 py-3 px-5 ">
            <Heading
              as={Link}
              to={PRODUCTS_ROUTE + "/" + product.id}
              className="text-3xl font-bold"
            >
              {product.title}
            </Heading>
          </div>
          <div className="flex justify-between items-center bg-gray-100 bg-opacity-60 py-3 px-5">
            <div className="text-2xl font-bold">
              {formatPrice(product.price)}
            </div>
            <ProductCartBtn productId={product.id} />
          </div>
        </div>
      </div>
    </List.Item>
  );
};

export default ProductItem;
