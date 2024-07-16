import { FC, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ROOT_ROUTE, SIGN_UP_ROUTE } from "@/constants";

import { List } from "rsuite";

import { productsApiService } from "@/services";

export const ProductsRoute: FC = () => {
  const { useLazyProductsPageQuery } = productsApiService;
  const pageRef = useRef(1);
  const [fetch, { isLoading, error, data }] = useLazyProductsPageQuery();

  useEffect(() => {
    fetch(pageRef.current);
  }, []);

  return (
    <div className="w-full h-full overflow-hidden flex flex-col">
      <List>
        {data?.data.map((item) => {
          return <List.Item>{JSON.stringify(item)}</List.Item>;
        })}
      </List>
    </div>
  );
};

export default ProductsRoute;
