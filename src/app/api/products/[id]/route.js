import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";
import { NextResponse } from "next/server";


export const dynamic = "force-dynamic";

export async function DELETE(req, context) {
  try {
    await connectDB();

    const { params } = context;
    const { id } = await params; // 🔥 IMPORTANT FIX

    await Product.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Product deleted",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

export async function PUT(req, context) {
  try {
    await connectDB();

    const { params } = context;
    const { id } = await params; // 🔥 FIX

    const body = await req.json();

    const updated = await Product.findByIdAndUpdate(id, body, { new: true });

    return NextResponse.json({
      success: true,
      product: updated,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
