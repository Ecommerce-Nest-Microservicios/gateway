import { Catch, ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const rpcError = exception.getError();

    if (rpcError.toString().includes("Empty response")) {
      const rpcMessage = rpcError.toString().split("(")[0];
      return response.status(500).json({
        status: 500,
        message: rpcMessage,
      });
    }

    if (typeof rpcError === "object" && "status" in rpcError && "message" in rpcError) {
      const status = isNaN(+rpcError.status) ? 400 : rpcError.status;
      return response.status(status).json(rpcError);
    } else {
      return response.status(500).json(rpcError);
    }
  }
}
