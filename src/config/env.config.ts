import "dotenv/config";
import { get } from "env-var";

export const envs = {
  // DB Config
  DB_HOST: get("DB_HOST").required().asString(),
  DB_PORT: get("DB_PORT").default("1433").asPortNumber(),
  DB_USERNAME: get("DB_USERNAME").required().asString(),
  DB_PASSWORD: get("DB_PASSWORD").required().asString(),
  DB_DATABASE: get("DB_DATABASE").required().asString(),
  // APP Config
  JWT_SECRET: get("JWT_SECRET").default("mysecret").asString(),
  APP_PORT: get("APP_PORT").default(3000).asPortNumber(),
};
