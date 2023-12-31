import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "email is required"],
    },
    avatar: {
      type: String,
      required: [true, "avatar is required"],
    },
    name: {
      type: String,
      required: [true, "name is required"],
    },
    blog: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
    },
  },
  {
    timestamps: true,
  }
);

export const LIKE = mongoose.model("Like", likeSchema);
