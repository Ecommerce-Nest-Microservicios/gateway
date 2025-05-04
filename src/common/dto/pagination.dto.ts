import { IsEnum, IsNotEmpty, IsOptional, IsPositive, Min } from "class-validator";
import { Type } from "class-transformer";
import { OrderStatus } from "src/orders/interfaces/order.interface";

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  @Min(1)
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @IsPositive()
  @Min(0)
  @Type(() => Number)
  limit?: number;
}
export class StatusDto {
  @IsNotEmpty()
  @IsEnum(OrderStatus, {
    message: `Possible satus values are ${[OrderStatus.CANCELLED, OrderStatus.DELIVERED, OrderStatus.PENDING, OrderStatus.PAID]}`,
  })
  status?: OrderStatus;
}
