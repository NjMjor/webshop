import type { ApiResponse } from "../../types.ts";
import type { Product } from "./types.ts";

export async function fetchProducts(): Promise<ApiResponse<Product[]>> {
  let products: Product[] = [];
  let error = "";

  try {
    const r = await fetch("https://fakestoreapi.com/products");
    products = await r.json();
    products = products.map((p) => {
      p.priceConverted = Math.round(p.price * 100);
      return p;
    });
  } catch (e) {
    error = "Error fetching data";
  }

  return {
    data: products,
    error: error ?? undefined,
  };
}

export async function fetchProductById(
  id: number,
): Promise<ApiResponse<Product>> {
  let product: Product | undefined = undefined;
  let error = "";

  try {
    const r = await fetch(`https://fakestoreapi.com/products/${id}`);
    product = await r.json();
  } catch (e) {
    error = "Error fetching data";
  }

  return {
    data: product,
    error: error ?? undefined,
  };
}
