import { FC } from "react";
import { Link } from "react-router-dom";

import { List, IconButton, Heading } from "rsuite";
import CloseOutlineIcon from "@rsuite/icons/CloseOutline";

import type { ProductType } from "@/types";
import { usersApiService } from "@/services";
import { formatPrice, getImageAlt, getImageUrl } from "@/utils";
import { PRODUCTS_ROUTE } from "@/constants";

import { Unavailable } from "./Unavailable";

export interface CartItemProps {
  product: ProductType;
}

const { useRemoveFromCartMutation } = usersApiService;

export const CartItem: FC<CartItemProps> = ({ product }) => {
  const [removeFromCart, { isLoading: isRemoving }] =
    useRemoveFromCartMutation();

  const handleRemove = () => {
    removeFromCart(product.id);
  };

  return (
    <List.Item className="max-w-screen-md m-auto">
      <Unavailable productId={product.id} />
      <div className="flex items-center px-6">
        {product.image && (
          <div className="max-w-[80px] mr-5 rounded-md overflow-hidden">
            <img
              className="w-full object-contain"
              src={getImageUrl(product.image, "thumbnail")}
              alt={getImageAlt(product.image)}
            />
          </div>
        )}
        <div className="flex flex-1 justify-between flex-row items-center pr-5">
          <Heading
            as={Link}
            to={PRODUCTS_ROUTE + "/" + product.id}
            className="text-xl"
          >
            {product.title}
          </Heading>
          <span className="text-gray-500 text-xl">
            {formatPrice(product.price)}
          </span>
        </div>
        <IconButton
          onClick={handleRemove}
          loading={isRemoving}
          color="orange"
          appearance="primary"
          icon={<CloseOutlineIcon />}
        />
      </div>
    </List.Item>
  );
};

export default CartItem;
