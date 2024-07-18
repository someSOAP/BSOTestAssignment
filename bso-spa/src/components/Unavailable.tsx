import { FC } from "react";
import { useAppSelector } from "@/hooks";
import { disabledProductsIdSetSelector } from "@/store";

export interface UnavailableProps {
  productId: number;
}

export const Unavailable: FC<UnavailableProps> = ({ productId }) => {
  const disabledProductsSet = useAppSelector(disabledProductsIdSetSelector);

  const isDisabled = disabledProductsSet.has(productId);

  if (!isDisabled) {
    return null;
  }

  return (
    <div className="absolute top-0 left-0 h-full w-full bg-gray-500 bg-opacity-60 grid place-items-center">
      <div className="text-3xl font-semibold text-gray-200">UNAVAILABLE</div>
    </div>
  );
};

export default Unavailable;
