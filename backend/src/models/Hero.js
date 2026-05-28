import mongoose from "mongoose";

const heroSchema = new mongoose.Schema(
  {
    badge: { type: String, default: "Hot & Fresh" },
    title: { type: String, default: "Delicious Food," },
    highlight: { type: String, default: "Delivered Fast" },
    desc: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Hero", heroSchema);