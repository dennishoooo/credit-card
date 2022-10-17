import dotenv from "dotenv";

dotenv.config();

export const env = {
  domain: process.env.DOMAIN,
  PORT: process.env.PORT,
  APP_NAME: process.env.APP_NAME,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
};
