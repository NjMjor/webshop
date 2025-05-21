import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddedProduct, AddedProductCount, CartState } from "./types.ts";
import { RootState } from "../../types.ts";
import { selectProducts } from "../productsSlice/productsSlice.ts";

const ADDED_PRODUCTS_LOCAL_STORAGE_KEY = "addedProducts";

function saveToLocalStorage(addedProducts: AddedProductCount[]) {
  localStorage.setItem(
    ADDED_PRODUCTS_LOCAL_STORAGE_KEY,
    JSON.stringify(addedProducts),
  );
}

function loadFromLocalStorage(): AddedProductCount[] {
  const addedProducts = localStorage.getItem(ADDED_PRODUCTS_LOCAL_STORAGE_KEY);
  if (addedProducts) {
    try {
      return JSON.parse(addedProducts);
    } catch (e) {
      console.error("Invalid JSON:", e);
      return [];
    }
  }
  return [];
}

const initialState: CartState = {
  addedProductsIdsAndCount: loadFromLocalStorage(),
  addedProducts: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const addedProduct = state.addedProductsIdsAndCount.find(
        (addedProduct) => addedProduct.id === productId,
      );

      if (addedProduct) addedProduct.count++;
      else {
        state.addedProductsIdsAndCount.push({
          id: productId,
          count: 1,
        });
      }

      saveToLocalStorage(state.addedProductsIdsAndCount);
    },
    removeProductFromCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const productToBeRemoved = state.addedProductsIdsAndCount.find(
        (addedProduct) => addedProduct.id === productId,
      );

      if (productToBeRemoved) {
        if (productToBeRemoved.count > 1) productToBeRemoved.count--;
        else {
          state.addedProductsIdsAndCount =
            state.addedProductsIdsAndCount.filter((p) => p.id !== productId);
        }
      }

      saveToLocalStorage(state.addedProductsIdsAndCount);
    },
  },
});

export const { addProductToCart, removeProductFromCart } = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;

export const selectAddedProducts = createSelector(
  [selectProducts, selectCart],
  (productState, cartState) => {
    const addedProducts: AddedProduct[] = [];

    cartState.addedProductsIdsAndCount.forEach((addedProductCount) => {
      const product = productState.products.find(
        (p) => p.id === addedProductCount.id,
      );

      if (product) {
        addedProducts.push({
          ...addedProductCount,
          product: product,
        });
      }
    });

    return addedProducts;
  },
);

export const selectCartCount = createSelector(
  [selectAddedProducts],
  (addedProducts) => {
    return addedProducts.map((p) => p.count).reduce((a, b) => a + b, 0);
  },
);

export const selectCartTotal = createSelector(
  [selectAddedProducts],
  (addedProducts) => {
    return (
      addedProducts
        .map((p) => p.product.priceConverted * p.count)
        .reduce((a, b) => a + b, 0) / 100
    );
  },
);

export default cartSlice.reducer;
