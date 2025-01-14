import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger, ValidationPipe } from "@nestjs/common";
import { RpcCustomExceptionFilter } from "./common/exceptions/rpc-custom-exception.filter";

async function bootstrap() {
  const logger = new Logger("Main - Gateway");

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api");
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new RpcCustomExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);

  logger.log(`Client Gateway running on port ${process.env.PORT}`);
}
bootstrap();
