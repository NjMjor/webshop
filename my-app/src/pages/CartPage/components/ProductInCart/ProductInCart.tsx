import "./ProductInCart.css";
import Button from "../../../../components/Button/Button.tsx";
import { useAppDispatch } from "../../../../redux/hooks.ts";
import { removeProductFromCart } from "../../../../redux/features/cartSlice/cartSlice.ts";
import { AddedProduct } from "../../../../redux/features/cartSlice/types.ts";
import { useContext } from "react";
import { ThemeContext } from "../../../../AppWrap.tsx";

interface ProductInCartProps {
  addedProduct: AddedProduct;
}

const getProductInCartDisplayPrice = (addedProduct: AddedProduct) => {
  const { price, priceConverted } = addedProduct.product;
  const count = addedProduct.count;

  if (count === 1) return `$${price}`;

  return `${count} x $${price} = $${(priceConverted * count) / 100}`;
};

export default function ProductInCart({ addedProduct }: ProductInCartProps) {
  const dispatch = useAppDispatch();
  const theme = useContext(ThemeContext);

  const { product, count } = addedProduct;

  const title = count > 1 ? `${count} x ${product.title}` : product.title;

  const onRemoveProductFromCartClick = () => {
    dispatch(removeProductFromCart(product.id));
  };

  return (
    <div
      className={"product-in-cart-wrapper"}
      style={{ backgroundColor: theme.backgroundTwo }}
    >
      <h4>{title}</h4>
      <div className={"product-in-cart-content"}>
        <div
          className={"product-in-cart-image-wrapper"}
          style={{ backgroundColor: theme.background }}
        >
          <img
            alt={product.title}
            src={product.image}
            className={"product-in-cart-image"}
          />
        </div>
        <div className={"product-in-cart-other-content"}>
          <span className={"product-in-cart-description"}>
            {product.description}
          </span>
          <div className={"product-in-cart-actions"}>
            <h4>{getProductInCartDisplayPrice(addedProduct)}</h4>
            <Button label={"Remove"} onClick={onRemoveProductFromCartClick} />
          </div>
        </div>
      </div>
    </div>
  );
}
