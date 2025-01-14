export interface IProduct {
  id: number;
  name: string;
  price: number;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProductClientResponse {
  ok: boolean;
  message: string;
  data: IProduct;
}
export interface IProductsClientResponse {
  ok: boolean;
  message: string;
  data: IProduct[];
  count?: number;
  totalCount?: number;
  nextPage?: number | null;
  prevPage?: number | null;
  totalPages?: number | null;
}

export interface IProductClientError {
  ok: boolean;
  message: string;
  error?: string;
  statusCode?: number;
}
