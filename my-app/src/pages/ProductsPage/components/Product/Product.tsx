import "./Product.css";
import type { Product } from "../../../../redux/features/productsSlice/types.ts";
import Button from "../../../../components/Button/Button.tsx";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../../../redux/hooks.ts";
import { addProductToCart } from "../../../../redux/features/cartSlice/cartSlice.ts";
import { useContext } from "react";
import { ThemeContext } from "../../../../AppWrap.tsx";

interface ProductProps {
  product: Product;
}

export default function Product({ product }: ProductProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);
  const { image, title, description, price, id } = product;

  const onDetailsClick = () => {
    navigate(`/products/${id}`);
  };

  const onAddToCartClick = () => {
    dispatch(addProductToCart(id));
  };

  return (
    <div
      className={"product-card"}
      style={{
        color: theme.foreground,
        borderColor: theme.background,
        backgroundColor: theme.backgroundTwo,
      }}
    >
      <div
        className={"product-image-wrapper"}
        style={{ backgroundColor: theme.background }}
      >
        <img
          className={"product-image"}
          src={image}
          alt={title}
          loading={"lazy"}
        />
      </div>
      <div className="product-details">
        <h4 className="product-title">{title}</h4>
        <p className="product-description">{description}</p>
        <h4 className="product-price">{`$${price}`}</h4>
      </div>
      <div className={"product-actions"}>
        <Button label={"Details"} onClick={onDetailsClick} />
        <Button label={"Add to cart"} onClick={onAddToCartClick} />
      </div>
    </div>
  );
}
