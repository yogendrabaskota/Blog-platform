import express from "express";

import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "I am here",
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server has started at PORT ${PORT}`);
});
