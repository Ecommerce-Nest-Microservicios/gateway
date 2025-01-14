import { registerAs } from "@nestjs/config";

export default registerAs("config", () => ({
  PORT: process.env.PORT,
  NATS_SERVERS: process.env.NATS_SERVERS?.split(","),
}));
