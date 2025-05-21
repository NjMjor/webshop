import { Product } from "../productsSlice/types.ts";

export interface AddedProductCount {
  id: number;
  count: number;
}

export interface AddedProduct extends AddedProductCount {
  product: Product;
}

export interface CartState {
  addedProductsIdsAndCount: AddedProductCount[];
  addedProducts: AddedProduct[];
}
