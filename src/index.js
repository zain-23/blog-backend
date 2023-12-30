import { app } from "./app.js";
import { connectDB } from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.listen(
      process.env.PORT || 8000,
      console.log(
        `server running at port http://localhost:${process.env.PORT || 8000}`
      )
    );
  })
  .catch((err) => {
    console.log(`ERROR while connecting mongo db ${err}`);
  });
