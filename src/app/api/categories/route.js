import { connectDB } from "@/lib/db";
import { Category } from "@/models/Category";
import { NextResponse } from "next/server";

// CREATE CATEGORY
export async function POST(req) {
  try {

    await connectDB();

    const body = await req.json();

    const name = body.name;

    if (!name) {
      return NextResponse.json(
        { success: false, error: "Name is required" },
        { status: 400 },
      );
    }

    const slug = name.toLowerCase().replace(/\s+/g, "-");

    const category = await Category.create({
      name,
      slug,
    });

    return NextResponse.json({
      success: true,
      category,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create category" },
      { status: 500 },
    );
  }
}

// GET ALL CATEGORIES
export async function GET() {
  try {
    await connectDB();

    const categories = await Category.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      categories,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch categories" },
      { status: 500 },
    );
  }
}
