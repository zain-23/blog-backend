import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  api_key: process.env.CLOUDINARY_API_KEY,
});

export const uploadCloudinary = async (LocalFilePath) => {
  try {
    if (!LocalFilePath) return null;

    const response = await cloudinary.uploader.upload(LocalFilePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(LocalFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(LocalFilePath); //remove the file which are stored in temp in server
    return null;
  }
};
