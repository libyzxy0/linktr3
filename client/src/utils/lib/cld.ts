import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from "cloudinary";
import type { CloudinaryResponseType } from '@/types';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const upload = async (buffer: Buffer): Promise<CloudinaryResponseType> => {
  const data = await new Promise<UploadApiResponse>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        tags: ["ml_default"],
        upload_preset: "ml_default",
      },
      (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      }
    );

    uploadStream.end(buffer);
  });

  return data as CloudinaryResponseType;
};

export { cloudinary, upload };
