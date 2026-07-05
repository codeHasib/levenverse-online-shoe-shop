import mongoose from "mongoose";

// Sub-schema for individual colors/variants
const colorVariantSchema = new mongoose.Schema({
  colorName: { type: String, required: true, trim: true },
  sizes: { type: [String], default: [] },
  inStock: { type: Boolean, default: true },
});

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String },
    price: { type: Number, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    images: { type: [String], default: [] },
    video: { type: String },

    // 🔥 NEW: Array of color variants replacing global sizes/inStock
    colors: { type: [colorVariantSchema], default: [] },
  },
  { timestamps: true },
);

export const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
