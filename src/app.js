import express from "express";
import blogRoutes from "./routes/blog.route.js";
const app = express();

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.send("server is running");
});

app.use("/api/v1/blog", blogRoutes);
export { app };
