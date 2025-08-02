import express from "express";
import { multer, storage } from "../middleware/multerMiddleware.js";
import blogController from "../controllers/blogController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const upload = multer({ storage: storage });

const router = express.Router();

router
  .route("/")
  .post(
    authMiddleware.isAuthenticated,
    upload.single("imageUrl"),
    blogController.createBlog
  )

  .get(blogController.getAllBlog);
router
  .route("/:id")
  .get(blogController.getSingleBlog)
  .delete(authMiddleware.isAuthenticated, blogController.deleteBlog)
  .patch(
    authMiddleware.isAuthenticated,
    upload.single("imageUrl"),
    blogController.updateBlog
  );
export default router;
