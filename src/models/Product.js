import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
    },

    price: {
      type: Number,
      required: true,
    },

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },

    images: {
      type: [String], // Cloudinary URLs
      default: [],
    },

    video: {
      type: String, // Cloudinary or external link
    },

    sizes: {
      type: [String], // ["40", "41", "42"]
      default: [],
    },
  },
  { timestamps: true },
);

export const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
