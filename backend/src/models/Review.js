import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },

    foodName: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Published", "Hidden"],
      default: "Published",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);