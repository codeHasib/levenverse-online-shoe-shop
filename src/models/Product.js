// models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String },
    price: { type: Number, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    images: { type: [String], default: [] },
    video: { type: String },
    sizes: { type: [String], default: [] },

    // 🔥 ADDED THIS FIELD
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
