import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: "process.env.CLOUDINARY_CLOUD_NAME",
  api_key: "process.env.CLODINARY_API_KEY",
  api_secret: "process.env.CLODINARY_API_SECRET",
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // uploading file on cloud
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    //file has been upload succes
    // console.log("file is upload on cloud",response.url);
    fs.unlickSync(localFilePath)
     return response;
  } catch (error) {
    fs.unlinkSync(localFilePath)//remove local tamp file as the upload op fails
    return null;
  }
};
export {uploadOnCloudinary}


