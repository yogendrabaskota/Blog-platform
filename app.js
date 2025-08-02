import express from "express";

import cors from "cors";
import dotenv from "dotenv";
import { envConfig } from "./config/envConfig.js";
import connectDatabase from "./config/databaseConfig.js";
import userRoute from "./routes/userRoute.js";
import blogRoute from "./routes/blogRoute.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./uploads"));
connectDatabase();

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
