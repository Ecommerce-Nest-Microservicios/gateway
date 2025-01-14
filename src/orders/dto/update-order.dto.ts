import { IsEnum, IsNotEmpty } from "class-validator";
import { OrderStatus } from "../interfaces/order.interface";

export class UpdateOrderDto {
  @IsEnum(OrderStatus)
  @IsNotEmpty()
  status: OrderStatus;
}
