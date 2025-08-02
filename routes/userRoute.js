import express from "express";
import userControllers from "../controllers/userControllers.js";
import catchAsync from "../middleware/catchAsync.js";

const router = express.Router();

router.route("/register").post(catchAsync(userControllers.registerUser));
router.route("/login").post(catchAsync(userControllers.loginUser));
router.route("/").get(catchAsync(userControllers.getAllUser));

export default router;
