import { AuthenticationState } from "./features/authSlice/types.ts";
import { ProductsState } from "./features/productsSlice/types.ts";
import { CartState } from "./features/cartSlice/types.ts";
import { ThemeState } from "./features/themeSlice/types.ts";

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export type RootState = {
  auth: AuthenticationState;
  products: ProductsState;
  cart: CartState;
  theme: ThemeState;
};
