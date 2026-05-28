import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    customerName: {
      type: String,
      required: true,
    },

    phone: {
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

    address: {
      type: String,
      required: true,
    },

    total: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["COD", "ONLINE"],
      default: "COD",
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },

    status: {
      type: String,
      enum: [
        "Order Placed",
        "Preparing",
        "Out for Delivery",
        "Delivered",
        "Canceled",
      ],
      default: "Order Placed",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);