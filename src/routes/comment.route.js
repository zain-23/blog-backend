import { Router } from "express";
import { doComment, getComments } from "../controller/comment.controller.js";

const router = Router();

router.route("/add-comment/:id").post(doComment);
router.route("/get-comment/:id").get(getComments);

export default router;
