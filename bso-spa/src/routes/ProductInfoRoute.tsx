import { FC } from "react";

import { useParams } from "react-router-dom";

import { Loader } from "rsuite";

import { ProductInfo } from "@/components";

import { productsApiService } from "@/services";

const { useProductQuery } = productsApiService;

export const ProductInfoRoute: FC = () => {
  const params = useParams();

  const { data, isLoading } = useProductQuery(Number(params.itemId));

  return (
    <div className="w-full h-full overflow-hidden flex flex-col relative">
      {data && <ProductInfo product={data.data} />}
      {isLoading && <Loader backdrop vertical size="lg" content="Loading..." />}
    </div>
  );
};

export default ProductInfoRoute;
