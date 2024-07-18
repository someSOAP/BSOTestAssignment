import { FC, UIEvent, useState } from "react";

import { List, Loader } from "rsuite";

import { ProductItem } from "@/components";
import { productsApiService } from "@/services";
import { useAppSelector } from "@/hooks";
import { productsSelector } from "@/store/productsSlice/products.selectors.ts";

const { useProductsPageQuery } = productsApiService;

export const ProductsRoute: FC = () => {
  const [page, setPage] = useState(1);
  const { data: fetchData, isLoading, isFetching } = useProductsPageQuery(page);

  const products = useAppSelector(productsSelector);

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    if (isFetching) {
      return;
    }

    let isEndReached = false;

    if (fetchData?.meta.pagination && fetchData?.data) {
      isEndReached = fetchData.meta.pagination.total <= products.length;
    }

    if (isEndReached) {
      return;
    }

    const scrollElement = event.currentTarget;
    const isBottomReached =
      scrollElement.scrollTop + scrollElement.clientHeight >
      scrollElement.scrollHeight * 0.85;

    if (isBottomReached) {
      setPage((v) => v + 1);
    }
  };

  return (
    <div className="w-full h-full overflow-hidden flex flex-col relative">
      <List onScroll={handleScroll}>
        {products.map((item) => {
          return <ProductItem key={item.id} product={item} />;
        })}
      </List>
      {isLoading && <Loader backdrop vertical size="lg" content="Loading..." />}
    </div>
  );
};

export default ProductsRoute;
