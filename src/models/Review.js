import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },

    name: String,
    rating: Number,
    comment: String,

    status: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending",
    },
  },
  { timestamps: true },
);

export const Review =
  mongoose.models.Review || mongoose.model("Review", reviewSchema);
