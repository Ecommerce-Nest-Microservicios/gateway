import { Controller, Get, Post, Body, Inject, UseGuards } from "@nestjs/common";
import { catchError, Observable, of } from "rxjs";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { NATS_SERVICE } from "src/config/microservices";
import { IAuth, IAuthClientResponse, IAuthData } from "./interface/auth.interface";
import { LoginAuthDto } from "./dto/login-auth.dto";
import { RegisterAuthDto } from "./dto/register-auth.dto";
import { AuthGuard } from "./guard/auth.guard";
import { User } from "./decorators/user.decorator";
import { Token } from "./decorators/token.decorator";
import { ok } from "assert";

@Controller("auth")
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post("register")
  reister(@Body() registerAuthDto: RegisterAuthDto): Observable<IAuthClientResponse> {
    return this.client.send("registerUserAuth", { ...registerAuthDto }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Post("login")
  login(@Body() loginAuthDto: LoginAuthDto): Observable<IAuthClientResponse> {
    return this.client.send("loginUserAuth", { ...loginAuthDto }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Get("verify")
  verify(@User() user: IAuth, @Token() token: string): Observable<IAuthClientResponse> {
    const authData: IAuthData = {
      user,
      token,
    };

    return of({
      ok: true,
      message: "Verify success",
      data: authData,
    });
  }
}
