import express from "express";

import cors from "cors";
import dotenv from "dotenv";
import { envConfig } from "./config/envConfig.js";
import connectDatabase from "./config/databaseConfig.js";
import userRoute from "./routes/userRoute.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDatabase();

app.get("/", (req, res) => {
  res.status(200).json({
    message: "I am here",
  });
});

app.use("/api/user", userRoute);

const port = envConfig.port || 5000;
app.listen(port, () => {
  console.log(`server has started at PORT ${port}`);
});
