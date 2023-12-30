import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema(
  {
    author: {
      type: String,
      required: [true, "author is required"],
    },
    category: {
      type: String,
      required: [true, "category is required"],
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: [true, "title is required"],
    },
    views: {
      type: Number,
      default: 0,
    },
    content: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
  },
  { timestamps: true }
);

export const BLOG = mongoose.model("Blog", blogSchema);
