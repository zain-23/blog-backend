import mongoose from "mongoose";
import { COMMENT } from "../model/comment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const doComment = asyncHandler(async (req, res) => {
  const { content, email, avatar, name } = req.body;
  const { id } = req.params;

  if (
    [content, email, avatar, name].some((field) => field === "" || undefined)
  ) {
    throw new ApiError(401, "invalid fields");
  }

  const comment = await COMMENT.create({
    content,
    email,
    avatar,
    name,
    blog: id,
  });

  if (!comment) {
    throw new ApiError(500, "something went wrong while add comment");
  }

  return res.status(200).json(new ApiResponse(201, "Add comment successfully"));
});

const getComments = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const comment = await COMMENT.aggregate([
    {
      $match: {
        blog: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $lookup: {
        from: "replies",
        localField: "_id",
        foreignField: "comment",
        as: "reply",
      },
    },
  ]);

  if (!comment) {
    throw new ApiError(401, "something went wrong");
  }

  return res.status(200).json(new ApiResponse(201, comment, "get comments successfully"));
});
export { doComment, getComments };
