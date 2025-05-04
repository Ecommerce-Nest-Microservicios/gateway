import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { environments } from "./config/environments";
import { ProductsModule } from "./products/products.module";
import { NatsModule } from "./transports/nats.module";
import { OrdersModule } from "./orders/orders.module";
import { AuthModule } from './auth/auth.module';
import * as Joi from "joi";
import config from "./config/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV],
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        NATS_SERVERS: Joi.string()
          .custom((value, helpers) => {
            const servers = value.split(",");
            if (servers.every((server: any) => typeof server === "string")) {
              return servers;
            } else {
              return helpers.message({
                "any.invalid": "NATS_SERVERS must be a valid list of strings",
              });
            }
          })
          .required(),
      }),
    }),
    ProductsModule,
    NatsModule,
    OrdersModule,
    AuthModule,
  ],
})
export class AppModule {}
