import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    rating: { type: Number, default: 4.5 },
    time: { type: String, required: true },
    delivery: { type: String, required: true },
    cuisine: { type: String, required: true },
    offer: { type: String },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Restaurant", restaurantSchema);