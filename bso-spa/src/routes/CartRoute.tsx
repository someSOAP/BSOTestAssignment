import { FC } from "react";

import { List } from "rsuite";
import { useAppSelector } from "@/hooks";
import { cartSelector } from "@/store";

export const CartRoute: FC = () => {
  const cart = useAppSelector(cartSelector);
  // const [removeFromCart, { isLoading: isRemoving }] =
  //   useRemoveFromCartMutation();
  // const [emptyCart, { isLoading: isEmptying }] = useEmptyCartMutation();

  return (
    <div className="w-full h-full overflow-hidden flex flex-col">
      <List>
        {cart.map((item) => {
          return <List.Item key={item.id}>{JSON.stringify(item)}</List.Item>;
        })}
      </List>
    </div>
  );
};

export default CartRoute;
