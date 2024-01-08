import { Router } from "express";
import {
  addBlog,
  deleteBlog,
  getAllBlog,
  getBlogByCotegory,
  getDraftBlog,
  getSingleBlog,
  getTrendingBlogs,
  updateBlog,
} from "../controller/blog.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route("/add-blog").post(upload.single("thumbnail"), addBlog);
router.route("/delete-blog/:id").delete(deleteBlog);
router.route("/update-blog/:id").patch(updateBlog);
router.route("/get-blogs").get(getAllBlog);
router.route("/get-draftblogs").get(getDraftBlog);
router.route("/get-blogs/:category").get(getBlogByCotegory);
router.route("/get-trending-blogs").get(getTrendingBlogs);
router.route("/get-single-blog/:id").get(getSingleBlog);

export default router;
