import "./CartTotal.css";
import { useAppSelector } from "../../../../redux/hooks.ts";
import { selectCartTotal } from "../../../../redux/features/cartSlice/cartSlice.ts";
import Button from "../../../../components/Button/Button.tsx";
import { useContext } from "react";
import { ThemeContext } from "../../../../AppWrap.tsx";

export default function CartTotal() {
  const theme = useContext(ThemeContext);
  const total = useAppSelector(selectCartTotal);

  const onCheckoutClick = () => {};

  return (
    <div
      className={"cart-total"}
      style={{ backgroundColor: theme.backgroundTwo }}
    >
      <h3>{`Total: $${total}`}</h3>
      <Button
        style={{ width: "100%" }}
        label={"Checkout"}
        onClick={onCheckoutClick}
      ></Button>
    </div>
  );
}
