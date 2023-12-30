import mongoose from "mongoose";
import { dbName } from "../constant.js";

export const connectDB = async () => {
  try {
    const connectionRes = await mongoose.connect(
      `${process.env.MONGODB_URI}/${dbName}`
    );
    console.log(
      `mongoDB connected : HOSTED : ${connectionRes.connection.host}`
    );
  } catch (error) {
    console.log(`ERROR FROM MONGODB : ${error}`);
  }
};
