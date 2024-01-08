import express from "express";
import blogRoutes from "./routes/blog.route.js";
import commentRoutes from "./routes/comment.route.js";
import replyRoutes from "./routes/reply.route.js";

import cors from "cors";
const app = express();

app.use(
  // cors({
  //   credentials: true,
  //   origin: process.env.CORS_ORIGIN,
  // })
  cors()
);
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.send("server is running");
});

app.use("/api/v1/blog", blogRoutes);
app.use("/api/v2/comment", commentRoutes);
app.use("/api/v2/reply", replyRoutes);

export { app };
