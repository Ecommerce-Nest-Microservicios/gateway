import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query, ParseIntPipe } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { catchError, Observable } from "rxjs";
import { IProductClientResponse, IProductsClientResponse } from "./interfaces/product.interface";
import { NATS_SERVICE } from "src/config/microservices";

@Controller("products")
export class ProductsController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto): Observable<IProductClientResponse> {
    return this.client.send("createProduct", { ...createProductDto }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto): Observable<IProductsClientResponse> {
    return this.client.send("findAllProducts", { ...paginationDto }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number): Observable<IProductClientResponse> {
    return this.client.send("findOneProduct", { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Observable<IProductClientResponse> {
    return this.client.send("updateProduct", { id, ...updateProductDto }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number): Observable<IProductClientResponse> {
    return this.client.send("removeProduct", { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Patch(":id/disable")
  disable(@Param("id", ParseIntPipe) id: number): Observable<IProductClientResponse> {
    return this.client.send("disableProduct", { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}
