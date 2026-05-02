import { connectDB } from "@/lib/db";
// import { Order } from "@/models/Order";
import { Order } from "@/models/Order";
import { NextResponse } from "next/server";
import { sendOrderEmail } from "@/lib/sendEmail";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const { customerName, phone, email, location, items, totalPrice } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Cart is empty" },
        { status: 400 },
      );
    }

    const order = await Order.create({
      customerName,
      phone,
      email,
      location,
      items,
      totalPrice,
    });

    await sendOrderEmail(order);

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Order failed" },
      { status: 500 },
    );
  }
}

// GET ALL ORDERS (ADMIN)
export async function GET() {
  try {
    await connectDB();

    const orders = await Order.find()
      .populate("items.productId")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch orders" },
      { status: 500 },
    );
  }
}
