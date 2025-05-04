import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { Request } from "express";
import { catchError, map, Observable } from "rxjs";
import { NATS_SERVICE } from "src/config/microservices";
import { IAuthData } from "../interface/auth.interface";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  canActivate(context: ExecutionContext): Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException("Token not found");
    }

    return this.client.send<IAuthData>("verifyUserAuth", { token }).pipe(
      map((authData) => {
        request["user"] = authData.user;
        request["token"] = authData.token;

        return true;
      }),
      catchError((error) => {
        throw new UnauthorizedException(error.message || error);
      }),
    );
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
