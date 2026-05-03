import { connectDB } from "@/lib/db";
import { Review } from "@/models/Review";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

// CREATE REVIEW (customer)
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const { productId, name, rating, comment = "" } = body;

    if (!productId || !name || !rating) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    const review = await Review.create({
      productId,
      name: name.trim(),
      rating: Number(rating), // IMPORTANT FIX
      comment,
    });

    return NextResponse.json({
      success: true,
      review,
    });
  } catch (error) {
    console.error("REVIEW POST ERROR:", error);

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const productId = searchParams.get("productId");
    const all = searchParams.get("all");

    const query = {};

    if (!all) query.status = "approved";
    if (productId) query.productId = productId;

    const reviews = await Review.find(query);

    return NextResponse.json({
      success: true,
      reviews,
    });

  } catch (error) {
    console.error("🔥 REVIEWS ERROR:", error); // 🔥 IMPORTANT

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}