import mongoose from "mongoose";

const offerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    name: { type: String, required: true },
    productName: { type: String, required: true },

    price: { type: String, required: true },
    old: { type: String },

    badge: { type: String },
    discount: { type: String },

    valid: { type: String, default: "31 May 2026" },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    code: { type: String },
    deliveryFree: { type: Boolean, default: false },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Offer", offerSchema);