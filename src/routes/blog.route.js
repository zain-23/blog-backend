import { Router } from "express";
import { addBlog } from "../controller/blog.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route("/add-blog").post(upload.single("thumbnail"), addBlog);

export default router;
