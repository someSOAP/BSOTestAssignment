import { FC } from "react";

import { Heading, Button } from "rsuite";

import { ProductType } from "@/types";
import { formatPrice, getImageUrl } from "@/utils";

export interface ProductInfoProps {
  product: ProductType;
}

export const ProductInfo: FC<ProductInfoProps> = ({ product }) => {
  const imageData = product.attributes.image?.data;

  return (
    <div className="max-w-screen-lg px-6 py-3 h-full overflow-scroll mx-auto flex flex-col justify-center">
      <Heading className="text-3xl" level={2}>
        {product.attributes.title}
      </Heading>

      <div className="flex flex-col sm:flex-row">
        {imageData && (
          <div className="basis-full max-h-[50vh] overflow-hidden my-4">
            <img
              className="h-full rounded-md shadow-2xl mx-auto sm:mx-0"
              src={getImageUrl(imageData)}
              alt={
                imageData.attributes.alternativeText ??
                imageData.attributes.name
              }
            />
          </div>
        )}
        <div className="flex flex-col flex-1 justify-center items-end gap-10">
          <div>
            <span className="text-xl font-medium">
              {formatPrice(product.attributes.price)}
            </span>
          </div>
          <Button className="min-w-[150px]" appearance="primary" block>
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;