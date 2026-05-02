import { connectDB } from "@/lib/db";
import { Review } from "@/models/Review";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const reviews = await Review.find().sort({ createdAt: -1 });

  return NextResponse.json({
    success: true,
    reviews,
  });
}