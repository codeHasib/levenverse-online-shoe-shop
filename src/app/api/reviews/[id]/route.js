import { connectDB } from "@/lib/db";
import { Review } from "@/models/Review";
import { NextResponse } from "next/server";

// APPROVE REVIEW
export async function PATCH(req, context) {
  try {
    await connectDB();

    const { id } = await context.params;

    const review = await Review.findByIdAndUpdate(
      id,
      { status: "approved" },
      { new: true }
    );

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

// DELETE REVIEW
export async function DELETE(req, context) {
  try {
    await connectDB();

    const { id } = await context.params;

    await Review.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}