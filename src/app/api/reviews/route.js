import { connectDB } from "@/lib/db";
import { Review } from "@/models/Review";
import { NextResponse } from "next/server";

// CREATE REVIEW (customer)
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const { productId, name, rating, comment } = body;

    if (!productId || !name || !rating) {
      return NextResponse.json(
        { success: false, error: "Missing fields" },
        { status: 400 }
      );
    }

    const review = await Review.create({
      productId,
      name,
      rating,
      comment,
    });

    return NextResponse.json({
      success: true,
      review,
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// GET APPROVED REVIEWS (public)
export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    const reviews = await Review.find({
      productId,
      status: "approved",
    }).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      reviews,
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}