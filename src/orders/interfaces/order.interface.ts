export interface IOrder {
  id: string;
  totalAmount: number;
  totalItems: number;
  paid?: boolean;
  paidAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderClientResponse {
  ok: boolean;
  message: string;
  data: IOrder;
}
export interface IOrdersClientResponse {
  ok: boolean;
  message: string;
  data: IOrder[];
  count?: number;
  totalCount?: number;
  nextPage?: number | null;
  prevPage?: number | null;
  totalPages?: number | null;
}

export enum OrderStatus {
  PENDING = "PENDING",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}
