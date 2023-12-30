import { BLOG } from "../model/blog.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadCloudinary } from "../utils/cloudinary.js";

const addBlog = async (req, res) => {
  const { author, category, title } = req.body;

  if ([author, category, title].some((fields) => fields === "" || undefined)) {
    throw new ApiError(401, "All fields are required");
  }

  if (author !== "Admin") {
    throw new ApiError(401, "author name must be Admin");
  }

  let thumbnailLocalPath;
  if (req.file) {
    thumbnailLocalPath = req.file?.path;
  }

  if (!thumbnailLocalPath) {
    throw new ApiError(401, "Invalid thumbnail image");
  }

  const thumbnail = await uploadCloudinary(thumbnailLocalPath);

  if (!thumbnail) {
    throw new ApiError(500, "something went wrong while uploading image");
  }

  const savedBlog = await BLOG.create({
    author,
    category,
    title,
    thumbnail: thumbnail?.url,
  });

  if (!savedBlog) {
    throw new ApiError(
      500,
      "something went wrong while creating blog try again later"
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(201, savedBlog, "blog created successfullt"));
};

export { addBlog };
