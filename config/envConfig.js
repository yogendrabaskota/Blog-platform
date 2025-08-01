import dotenv from "dotenv";
dotenv.config();
export const envConfig = {
  mongoURI: process.env.MONGO_URI,
  port: process.env.PORT,
  secretKey: process.env.SECRET_KEY,
};
