import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, default: 4.5 },
    orders: { type: String, default: "1K" },
    tag: { type: String },
    category: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Food", foodSchema);