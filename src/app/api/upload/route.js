import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
  try {
    const { file, type = "image" } = await req.json();

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    // 🔥 AUTO FOLDER STRUCTURE
    const folder =
      type === "video"
        ? "levenverse/videos"
        : "levenverse/products";

    const result = await cloudinary.uploader.upload(file, {
      folder,
      resource_type: type === "video" ? "video" : "image",
    });

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
    });

  } catch (error) {
    console.error("UPLOAD ERROR:", error);

    return NextResponse.json(
      { success: false, error: "Upload failed" },
      { status: 500 }
    );
  }
}