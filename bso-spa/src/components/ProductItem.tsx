import { FC } from "react";
import type { ProductType } from "@/types";

import { List, Button } from "rsuite";
import { getImageUrl } from "@/utils";

export interface ProductItemProps {
  product: ProductType;
}

export const ProductItem: FC<ProductItemProps> = ({ product }) => {
  const imgData = product.attributes.image?.data;

  return (
    <List.Item className="max-w-screen-md m-auto">
      <div className="max-h-[40vh]">
        {imgData && (
          <div className="w-full overflow-hidden shrink-0 pr-4">
            <img
              className="object-contain"
              src={getImageUrl(imgData, "medium")}
              alt={
                imgData.attributes.alternativeText ?? imgData.attributes.name
              }
            />
          </div>
        )}
        <div className="flex flex-col absolute top-0 w-full h-full p-6">
          <h3 className="text-2xl font-bold">{product.attributes.title}</h3>
          <Button>Add to cart</Button>
        </div>
      </div>
    </List.Item>
  );
};

export default ProductItem;
