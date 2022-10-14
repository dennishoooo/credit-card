import dotenv from "dotenv";

dotenv.config();

export const env = {
  DOMAIN: process.env.DOMAIN,
  PORT: process.env.PORT,
};
