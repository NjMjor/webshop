import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./features/authSlice/authSlice.ts";
import productsReducer from "./features/productsSlice/productsSlice.ts";
import cartReducer from "./features/cartSlice/cartSlice.ts";
import themeReducer from "./features/themeSlice/themeSlice.ts";

export const store = configureStore({
  reducer: {
    auth: authenticationReducer,
    products: productsReducer,
    cart: cartReducer,
    theme: themeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
