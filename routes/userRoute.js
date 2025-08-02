import express from "express";
import userControllers from "../controllers/userControllers.js";

const router = express.Router();

router.route("/register").post(userControllers.registerUser);
router.route("/login").post(userControllers.loginUser);
router.route("/").get(userControllers.getAllUser);

export default router;
