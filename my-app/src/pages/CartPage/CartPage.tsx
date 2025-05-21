import "./CartPage.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks.ts";
import {
  selectAddedProducts,
  selectCartCount,
} from "../../redux/features/cartSlice/cartSlice.ts";
import PageWrapper from "../../components/PageWrapper/PageWrapper.tsx";
import useMount from "../../hooks/hooks.ts";
import { fetchProductsAsync } from "../../redux/features/productsSlice/productsSlice.ts";
import CartTotal from "./components/CartTotal/CartTotal.tsx";
import ProductInCart from "./components/ProductInCart/ProductInCart.tsx";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectCartCount);
  const addedProducts = useAppSelector(selectAddedProducts);

  useMount(() => {
    dispatch(fetchProductsAsync());
  });

  return (
    <PageWrapper>
      <div className={"cart-page-wrapper"}>
        <div style={{ flex: 2 }}>
          <div className={"cart-page-products-list-wrapper"}>
            <h3>{`Cart ${count === 0 ? "is empty" : `(${count})`}`}</h3>
            <div className={"cart-page-products-list"}>
              {addedProducts?.map((addedProduct) => (
                <ProductInCart
                  key={addedProduct.id}
                  addedProduct={addedProduct}
                />
              ))}
            </div>
          </div>
        </div>
        <div className={"cart-total-wrapper"}>
          <CartTotal />
        </div>
      </div>
    </PageWrapper>
  );
}
