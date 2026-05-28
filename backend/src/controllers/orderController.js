import Order from "../models/Order.js";
import User from "../models/User.js";

export const createOrder = async (req, res) => {
  try {
    const {
      customerName,
      phone,
      items,
      address,
      total,
      userId,
      paymentMethod,
      paymentStatus,
    } = req.body;

    const order = await Order.create({
      customerName,
      phone,
      items,
      address,
      total,
      userId,
      status: "Order Placed",
      paymentMethod: paymentMethod || "COD",
      paymentStatus: paymentStatus || "Pending",
    });

    if (userId) {
      await User.findByIdAndUpdate(userId, {
        $inc: { totalOrders: 1 },
      });
    }

    res.status(201).json(order);
  } catch (error) {
    console.log("Create order error:", error.message);

    res.status(500).json({
      message: "Failed to create order",
      error: error.message,
    });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch order",
      error: error.message,
    });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update order",
      error: error.message,
    });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    if (order.userId) {
      await User.findByIdAndUpdate(order.userId, {
        $inc: { totalOrders: -1 },
      });
    }

    res.status(200).json({
      message: "Order deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete order",
      error: error.message,
    });
  }
};