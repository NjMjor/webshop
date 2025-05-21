import PageWrapper from "../../components/PageWrapper/PageWrapper.tsx";
import { useAppDispatch, useAppSelector } from "../../redux/hooks.ts";
import {
  fetchProductsAsync,
  selectProducts,
} from "../../redux/features/productsSlice/productsSlice.ts";
import useMount from "../../hooks/hooks.ts";
import Product from "./components/Product/Product.tsx";
import "./ProductsPage.css";

export default function ProductsPage() {
  const { products } = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();

  useMount(() => {
    dispatch(fetchProductsAsync());
  });

  return (
    <PageWrapper>
      <div className={"products-page-main-wrapper"}>
        {products?.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </PageWrapper>
  );
}
