import { connectDB } from "@/lib/db";
import { Order } from "@/models/Order";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  try {
    await connectDB();

    const { id } = params;
    const { status } = await req.json();

    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update status" },
      { status: 500 },
    );
  }
}
