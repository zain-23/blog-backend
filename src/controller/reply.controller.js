import { REPLY } from "../model/reply.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const doReply = asyncHandler(async (req, res) => {
  const { content, email, avatar, name } = req.body;
  const { id } = req.params;

  if (
    [content, email, avatar, name].some((field) => field === "" || undefined)
  ) {
    throw new ApiError(401, "invalid fields");
  }

  const reply = await REPLY.create({
    content,
    email,
    avatar,
    name,
    comment: id,
  });

  if (!reply) {
    throw new ApiError(500, "something went wrong while add reply");
  }

  return res.status(200).json(new ApiResponse(201, "Add reply successfully"));
});


export { doReply };
