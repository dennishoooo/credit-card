import dotenv from "dotenv";

dotenv.config();

export const env = {
  DOMAIN: process.env.DOMAIN,
  PORT: process.env.PORT,
  APP_NAME: process.env.APP_NAME,
  USERNAME: process.env.USERNAME,
  PASSWORD: process.env.PASSWORD,
};
