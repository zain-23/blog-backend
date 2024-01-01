import { Router } from "express";
import { doComment } from "../controller/comment.controller.js";

const router = Router();

router.route("/add-comment/:id").post(doComment);

export default router;
