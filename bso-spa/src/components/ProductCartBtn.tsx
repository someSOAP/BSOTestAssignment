import { FC } from "react";

import { IconButton } from "rsuite";

import CloseOutlineIcon from "@rsuite/icons/CloseOutline";
import AddOutlineIcon from "@rsuite/icons/AddOutline";

import { cartSelector } from "@/store";
import { useAppSelector } from "@/hooks";
import { usersApiService } from "@/services";

export interface ProductCartBtnProps {
  productId: number;
}

const { useAddToCartMutation, useRemoveFromCartMutation } = usersApiService;

export const ProductCartBtn: FC<ProductCartBtnProps> = ({ productId }) => {
  const cart = useAppSelector(cartSelector);

  const [addToCart, { isLoading: isAdding }] = useAddToCartMutation();
  const [removeFromCart, { isLoading: isRemoving }] =
    useRemoveFromCartMutation();

  const isInCart = !!cart.find((it) => it.id === productId);

  const handleAddToCart = () => {
    addToCart(productId);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(productId);
  };

  return (
    <IconButton
      loading={isRemoving || isAdding}
      appearance="primary"
      color={isInCart ? "orange" : "green"}
      icon={isInCart ? <CloseOutlineIcon /> : <AddOutlineIcon />}
      onClick={isInCart ? handleRemoveFromCart : handleAddToCart}
    >
      {isInCart ? "Remove from cart" : "Add to cart"}
    </IconButton>
  );
};

export default ProductCartBtn;
