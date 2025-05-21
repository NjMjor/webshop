import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ProductsState } from "./types.ts";
import { fetchProductById, fetchProducts } from "./productsApi.ts";
import type { RootState } from "../../types.ts";

const initialState: ProductsState = {
  products: [],
  isLoading: false,
  productById: undefined,
  errorFetchingProduct: "",
};

export const fetchProductsAsync = createAsyncThunk(
  "products/fetchProductsAsync",
  async (_, { rejectWithValue }) => {
    const { data, error } = await fetchProducts();

    if (error || !data) return rejectWithValue(error);

    return data;
  },
);

export const fetchProductByIdAsync = createAsyncThunk(
  "products/fetchProductByIdAsync",
  async (id: number, { rejectWithValue }) => {
    const { data, error } = await fetchProductById(id);

    if (error || !data) return rejectWithValue(error ?? "Error");

    return data;
  },
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsAsync.rejected, (state) => {
        state.isLoading = false;
        state.products = [];
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.isLoading = true;
        state.productById = undefined;
        state.errorFetchingProduct = "";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productById = action.payload;
        state.errorFetchingProduct = "";
      })
      .addCase(fetchProductByIdAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.productById = undefined;
        state.errorFetchingProduct = action.payload as string;
      });
  },
});

export const selectProducts = (state: RootState) => state.products;

export default productsSlice.reducer;
