import { FC } from "react";

import { Button, List } from "rsuite";

import { CartItem } from "@/components";
import { useAppSelector } from "@/hooks";
import { cartSelector, cartTotalPriceSelector } from "@/store";
import { formatPrice } from "@/utils";
import { usersApiService } from "@/services";

const { useEmptyCartMutation } = usersApiService;

export const CartRoute: FC = () => {
  const cart = useAppSelector(cartSelector);
  const totalPrice = useAppSelector(cartTotalPriceSelector);

  const [emptyCart] = useEmptyCartMutation();

  const handleEmptyCard = () => {
    emptyCart();
  };

  const isEmpty = !cart.length;

  return (
    <div className="w-full h-full overflow-hidden flex flex-col">
      <List className="flex-1">
        {cart.map((item) => {
          return <CartItem key={item.id} product={item} />;
        })}
      </List>
      {!isEmpty && (
        <div className="flex max-w-screen-md w-full m-auto justify-between items-center py-3 px-5">
          <div className="text-lg">
            Total:{" "}
            <span className="font-semibold ">{formatPrice(totalPrice)}</span>
          </div>
          <Button onClick={handleEmptyCard} appearance="primary" color="green">
            Empty cart
          </Button>
        </div>
      )}
    </div>
  );
};

export default CartRoute;
