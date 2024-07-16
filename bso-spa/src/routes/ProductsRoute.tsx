import { FC, UIEvent, useState } from "react";

import { List, Loader } from "rsuite";

import { ProductItem } from "@/components";
import { productsApiService } from "@/services";

const { useProductsPageQuery } = productsApiService;

export const ProductsRoute: FC = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching } = useProductsPageQuery(page);

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    if (isFetching) {
      return;
    }

    let isEndReached = false;

    if (data?.meta.pagination && data?.data) {
      isEndReached = data.meta.pagination.total <= data.data.length;
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
        {data?.data.map((item) => {
          return <ProductItem key={item.id} product={item} />;
        })}
      </List>
      {isLoading && <Loader backdrop vertical size="lg" content="Loading..." />}
    </div>
  );
};

export default ProductsRoute;
