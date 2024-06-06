import { v2 as cloudinary } from "cloudinary";
import type { CloudinaryResponseType } from '@/types';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = async (buffer: any): Promise<CloudinaryResponseType> => {
  const data = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          tags: ["ml_default"],
          upload_preset: "ml_default",
        },
        function (error, result) {
          if (error) {
            reject(error);
            return;
          }
          resolve(result);
        },
      )
      .end(buffer);
  });
  return data;
};

export { cloudinary, upload };
