import cloudinary from "./cloudinary";

export const uploadToCloudinary = async (file, folder) => {
  try {
    // Ensure proper format
    if (!file.startsWith("data:")) {
      throw new Error("Invalid file format. Must be base64 data URI.");
    }

    const result = await cloudinary.uploader.upload(file, {
      folder,
      resource_type: "image",
    });

    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error.message);
    throw error;
  }
};