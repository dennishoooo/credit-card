import dotenv from "dotenv";

dotenv.config();

export const env = {
  domain: process.env.DOMAIN,
  port: process.env.PORT,
  appName: process.env.APP_NAME,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
};
