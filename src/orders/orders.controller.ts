import { Controller, Get, Post, Body, Patch, Param, Inject, Query, ParseUUIDPipe, Delete } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { catchError, Observable } from "rxjs";
import { IOrderClientResponse, IOrdersClientResponse } from "./interfaces/order.interface";
import { PaginationDto, StatusDto } from "src/common/dto/pagination.dto";
import { NATS_SERVICE } from "src/config/microservices";

@Controller("orders")
export class OrdersController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto): Observable<IOrderClientResponse> {
    return this.client.send("createOrder", { ...createOrderDto }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get()
  findAll(@Query() paginaTioDto: PaginationDto): Observable<IOrdersClientResponse> {
    return this.client.send("findAllOrders", { ...paginaTioDto }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get("status/:status")
  findAllByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginationDto,
  ): Observable<IOrdersClientResponse> {
    return this.client.send("findAllOrdersByStatus", { ...statusDto, ...paginationDto }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get(":id")
  findOne(@Param("id", ParseUUIDPipe) id: string): Observable<IOrderClientResponse> {
    return this.client.send("findOneOrder", { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Patch(":id/status")
  changeStatus(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Observable<IOrderClientResponse> {
    return this.client.send("changeStatus", { id, ...updateOrderDto }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Delete(":id")
  remove(@Param("id", ParseUUIDPipe) id: string): Observable<IOrderClientResponse> {
    return this.client.send("removeOrder", { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}
