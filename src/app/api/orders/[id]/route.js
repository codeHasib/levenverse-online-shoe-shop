import { connectDB } from "@/lib/db";
import { Order } from "@/models/Order";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PATCH(req, { params }) {
  try {
    await connectDB();

    const { id } = await params; // ✅ Next.js 15 fix
    const body = await req.json();
    const { status } = body;

    // 🛑 validate status (important)
    if (!status) {
      return NextResponse.json(
        { success: false, error: "Status is required" },
        { status: 400 }
      );
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
        runValidators: true, // ✅ ensures enum validation
      }
    );

    if (!order) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      order,
    });

  } catch (error) {
    console.error("ORDER UPDATE ERROR:", error);

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}