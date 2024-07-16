import { FC } from "react";
import type { ProductType } from "@/types";

import { List, IconButton } from "rsuite";
import AddOutlineIcon from "@rsuite/icons/AddOutline";

import { getImageUrl, formatPrice } from "@/utils";

export interface ProductItemProps {
  product: ProductType;
}

export const ProductItem: FC<ProductItemProps> = ({ product }) => {
  const imgData = product.attributes.image?.data;

  return (
    <List.Item className="max-w-screen-md m-auto">
      <div className="max-h-[40vh] relative overflow-hidden">
        {imgData && (
          <div className="w-full overflow-hidden shrink-0">
            <img
              className="object-contain w-full h-full"
              src={getImageUrl(imgData, "medium")}
              alt={
                imgData.attributes.alternativeText ?? imgData.attributes.name
              }
            />
          </div>
        )}
        <div className="flex flex-col justify-between absolute top-0 w-full h-full">
          <div className="bg-gray-100 bg-opacity-60 py-3 px-5 ">
            <h3 className="text-3xl font-bold">{product.attributes.title}</h3>
          </div>
          <div className="flex justify-between items-center bg-gray-100 bg-opacity-60 py-3 px-5">
            <div className="text-2xl font-bold">
              {formatPrice(product.attributes.price)}
            </div>
            <IconButton
              appearance="primary"
              color="green"
              icon={<AddOutlineIcon />}
            >
              Add to cart
            </IconButton>
          </div>
        </div>
      </div>
    </List.Item>
  );
};

export default ProductItem;
