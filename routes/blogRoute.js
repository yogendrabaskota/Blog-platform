import express from "express";
import { multer, storage } from "../middleware/multerMiddleware.js";
import blogController from "../controllers/blogController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import catchAsync from "../middleware/catchAsync.js";
const upload = multer({ storage: storage });

const router = express.Router();

router
  .route("/")
  .post(
    authMiddleware.isAuthenticated,
    upload.single("imageUrl"),
    catchAsync(blogController.createBlog)
  )

  .get(catchAsync(blogController.getAllBlog));
router
  .route("/:id")
  .get(catchAsync(blogController.getSingleBlog))
  .delete(authMiddleware.isAuthenticated, catchAsync(blogController.deleteBlog))
  .patch(
    authMiddleware.isAuthenticated,
    upload.single("imageUrl"),
    catchAsync(blogController.updateBlog)
  );
export default router;
