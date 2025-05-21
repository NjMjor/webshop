export interface HasId {
  id: number;
}

export interface Product extends HasId {
  title: string;
  description: string;
  price: number;
  priceConverted: number;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface ProductsState {
  products: Product[];
  productById: Product | undefined;
  isLoading: boolean;
  errorFetchingProduct: string;
}
