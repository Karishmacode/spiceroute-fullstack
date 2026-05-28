import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      default: "Guest User",
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    items: [
      {
        name: String,
        image: String,
        price: Number,
        quantity: Number,
      },
    ],
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Order Placed", "Preparing", "Out for Delivery", "Delivered"],
      default: "Order Placed",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);