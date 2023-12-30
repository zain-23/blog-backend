import { BLOG } from "../model/blog.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadCloudinary } from "../utils/cloudinary.js";

const addBlog = asyncHandler(async (req, res) => {
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
  console.log(thumbnailLocalPath);
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
});

const updateBlog = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const { id } = req.params;
  console.log(req.body, id);

  if (!content) return null;

  const updatedBlog = await BLOG.findByIdAndUpdate(
    id,
    {
      $set: {
        content,
      },
    },
    {
      new: true,
    }
  );

  if (!updatedBlog) {
    throw new ApiError(500, "Can't updated the blog try again later");
  }

  return res.status(200, updatedBlog, "Blog updated successfully");
});

const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log("id", id);
  if (!id) {
    throw new ApiError(401, "invalid blog id");
  }

  await BLOG.findByIdAndDelete(id);

  return res
    .status(200)
    .json(new ApiResponse(201, "Blog deleted successfully"));
});

const getAllBlog = asyncHandler(async (req, res) => {
  const allBlogs = await BLOG.find();

  if (allBlogs.length === 0) {
    throw new ApiError(401, "no blogs");
  }

  return res
    .status(200)
    .json(new ApiResponse(201, allBlogs, "Get Blogs successfully"));
});

const getBlogByCotegory = asyncHandler(async (req, res) => {
  const { category } = req.params;

  if (!category) {
    throw new ApiError(401, "cannot find blogs");
  }

  const blogs = await BLOG.aggregate([
    {
      $match: {
        category,
      },
    },
  ]);

  console.log("blogs", blogs);
});

const getPublishBlog = asyncHandler(async (req, res) => {
  const publishedBlog = await BLOG.aggregate([
    {
      $match: {
        isPublished: true,
      },
    },
  ]);
  if (publishedBlog.length === 0) {
    throw new ApiError(401, "No publishedBlog data");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(201, publishedBlog, "get publishedBlog data successfully")
    );
});

const getDraftBlog = asyncHandler(async (req, res) => {
  const draftBlog = await BLOG.aggregate([
    {
      $match: {
        isPublished: false,
      },
    },
  ]);
  if (draftBlog.length === 0) {
    throw new ApiError(401, "No draft data");
  }

  return res
    .status(200)
    .json(new ApiResponse(201, draftBlog, "get draft data successfully"));
});

export {
  addBlog,
  updateBlog,
  deleteBlog,
  getAllBlog,
  getBlogByCotegory,
  getPublishBlog,
  getDraftBlog,
};
