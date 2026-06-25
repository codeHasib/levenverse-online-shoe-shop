import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";
import { uploadToCloudinary } from "@/lib/uploadToCloudinary";
import "@/models/Category";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// CREATE PRODUCT (WITH CLOUDINARY)
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      title,
      description,
      price,
      categoryId,
      images = [],
      video,
      sizes = [],
    } = body;

    // 3. Create product
    const product = await Product.create({
      title,
      description,
      price,
      categoryId,
      images,
      video,
      sizes,
    });

    if (!title || !price) {
      return NextResponse.json(
        { success: false, error: "Missing fields" },
        { status: 400 },
      );
    }

    return NextResponse.json({
      success: true,
      product,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Product creation failed" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find()
      .populate({
        path: "categoryId",
        select: "name slug", // ✅ only needed fields
      })
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("🔥 PRODUCT POPULATE ERROR:", error);

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
