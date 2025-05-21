import "./SingleProductPage.css";
import PageWrapper from "../../components/PageWrapper/PageWrapper.tsx";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../redux/hooks.ts";
import {
  fetchProductByIdAsync,
  selectProducts,
} from "../../redux/features/productsSlice/productsSlice.ts";
import { isParamValidId } from "../../util/util.ts";
import useMount from "../../hooks/hooks.ts";
import { addProductToCart } from "../../redux/features/cartSlice/cartSlice.ts";
import { useContext } from "react";
import { ThemeContext } from "../../AppWrap.tsx";
import Button from "../../components/Button/Button.tsx";
import PageNotFound from "../PageNotFound/PageNotFound.tsx";

export default function SingleProductPage() {
  const dispatch = useAppDispatch();
  const theme = useContext(ThemeContext);
  const { productById, errorFetchingProduct } = useAppSelector(selectProducts);
  const { id } = useParams();

  useMount(() => {
    if (id && isParamValidId(id)) {
      const idParsed = parseFloat(id);
      dispatch(fetchProductByIdAsync(idParsed));
    }
  });

  const onAddToCartClick = () => {
    if (productById) dispatch(addProductToCart(productById.id));
  };

  if (errorFetchingProduct) return <PageNotFound />;

  return (
    <PageWrapper>
      <div
        className={"single-product-page-wrapper"}
        style={{
          color: theme.foreground,
          backgroundColor: theme.backgroundTwo,
        }}
      >
        <div>
          <h3 className={"single-product-page-title"}>{productById?.title}</h3>
          <div className={"single-product-page-ratings"}>
            <h5>{`Average rating: ${productById?.rating?.rate ?? ""}`}</h5>
            <h5>{`Reviews: ${productById?.rating.count ?? ""}`}</h5>
          </div>
          <div className={"single-product-page-body"}>
            <div
              className={"single-product-page-image-wrapper"}
              style={{ backgroundColor: theme.background }}
            >
              <img
                className={"single-product-page-image"}
                alt={productById?.title}
                src={productById?.image}
              />
            </div>
            <div className={"single-product-page-details"}>
              <p>{productById?.description}</p>
            </div>
          </div>
        </div>

        <div className={"single-product-page-footer"}>
          <h4 style={{ width: "100%" }}>{`$${productById?.price ?? ""}`}</h4>
          <Button
            className={"single-product-page-footer-add-to-cart-button"}
            label={"Add to cart"}
            onClick={onAddToCartClick}
          />
        </div>
      </div>
    </PageWrapper>
  );
}
