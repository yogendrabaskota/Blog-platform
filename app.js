import express from "express";

import cors from "cors";
import dotenv from "dotenv";
import { envConfig } from "./config/envConfig.js";
import connectDatabase from "./config/databaseConfig.js";
import userRoute from "./routes/userRoute.js";
import blogRoute from "./routes/blogRoute.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(express.static("./uploads"));
connectDatabase();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests from this IP, please try again later",
});
app.use(limiter);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "I am here",
  });
});

app.use("/api/user", userRoute);
app.use("/api/blog", blogRoute);

const port = envConfig.port || 5000;
app.listen(port, () => {
  console.log(`server has started at PORT ${port}`);
});
