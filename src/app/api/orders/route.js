import { connectDB } from "@/lib/db";
import { Order } from "@/models/Order";
import { NextResponse } from "next/server";
import { sendOrderEmail } from "@/lib/sendEmail";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const {
      customerName,
      phone,
      email,
      location,
      items,
      totalPrice,
      deliveryCharge,
    } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Cart is empty" },
        { status: 400 },
      );
    }

    if (!customerName || !phone || !location) {
      return NextResponse.json(
        { success: false, error: "Missing delivery details" },
        { status: 400 },
      );
    }

    const order = await Order.create({
      customerName,
      phone,
      email,
      location,
      deliveryCharge,
      items: items.map((item) => ({
        productId: item.productId || item._id || item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        color: item.color, // 🔥 ADDED COLOR HERE
      })),
      totalPrice,
    });

    // Email is a side-effect: never let it fail the order.
    try {
      await sendOrderEmail(order);
    } catch (emailError) {
      console.error("ORDER EMAIL ERROR:", emailError);
    }

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("🔥 ORDER ERROR FULL:", error);
    return NextResponse.json(
      { success: false, error: "Order failed" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const orders = await Order.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("ORDER GET ERROR:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
