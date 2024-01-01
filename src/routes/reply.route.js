import { Router } from "express";
import { doReply } from "../controller/reply.controller.js";
const router = Router();

router.route("/add-reply/:id").post(doReply)

export default router;
