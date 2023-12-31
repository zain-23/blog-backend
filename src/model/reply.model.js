import mongoose, { Schema } from "mongoose";

const replySchema = new Schema(
  {
    content: {
      type: String,
      required: [true, "content is required"],
    },
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
    comment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  },
  {
    timestamps: true,
  }
);

export const REPLY = mongoose.model("Reply", replySchema);
