import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";

export const Token = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  if (!request.token) {
    throw new InternalServerErrorException("Tiken no found in request Auth Guard");
  }

  return request.token;
});
