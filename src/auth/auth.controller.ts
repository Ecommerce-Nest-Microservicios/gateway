import { Controller, Get, Post, Body, Inject } from "@nestjs/common";
import { catchError, Observable } from "rxjs";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { NATS_SERVICE } from "src/config/microservices";
import { IAuthClientResponse, IAuthData } from "./interface/auth.interface";
import { LoginAuthDto } from "./dto/login-auth.dto";
import { RegisterAuthDto } from "./dto/register-auth.dto";

@Controller("auth")
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  reister(@Body() registerAuthDto: RegisterAuthDto): Observable<IAuthClientResponse> {
    return this.client.send("registerUserAuth", { ...registerAuthDto }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Post()
  login(@Body() loginAuthDto: LoginAuthDto): Observable<IAuthClientResponse> {
    return this.client.send("loginUserAuth", { ...loginAuthDto }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get()
  verify(@Body() authData: IAuthData): Observable<IAuthClientResponse> {
    return this.client.send("verifyUserAuth", { ...authData }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}
