import { FC, useEffect, useRef } from "react";

import { List } from "rsuite";

import { ProductItem } from "@/components";
import { productsApiService } from "@/services";

export const ProductsRoute: FC = () => {
  const { useLazyProductsPageQuery } = productsApiService;
  const pageRef = useRef(1);
  const [fetch, { data }] = useLazyProductsPageQuery();

  useEffect(() => {
    fetch(pageRef.current);
  }, []);

  return (
    <div className="w-full h-full overflow-hidden flex flex-col">
      <List>
        {data?.data.map((item) => {
          return <ProductItem key={item.id} product={item} />;
        })}
      </List>
    </div>
  );
};

export default ProductsRoute;
