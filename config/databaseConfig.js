import mongoose from "mongoose";
import { envConfig } from "./envConfig.js";

const mongoURL = envConfig.mongoURI;

if (!mongoURL) {
  throw new Error("MONGO_URI is not defined in environment variables");
}

mongoose.connection.on("connected", () => {
  console.log("Database connected successfully");
});

mongoose.connection.on("error", (err) => {
  console.error("Database connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.warn("Database disconnected");
});

const connectDatabase = async () => {
  try {
    console.log("Attempting to connect with database");
    await mongoose.connect(mongoURL, {
      serverSelectionTimeoutMS: 5000,
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDatabase;
