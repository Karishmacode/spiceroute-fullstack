import User from "../models/User.js";
import Order from "../models/Order.js";

export const getUsers = async (req, res) => {
  try {
    const { search } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { status: { $regex: search, $options: "i" } },
      ];
    }

    const users = await User.find(query).sort({ createdAt: -1 });

    const usersWithOrders = await Promise.all(
      users.map(async (user) => {
        const orders = await Order.find({
          $or: [
            { userId: user._id },
            { phone: user.phone },
            { customerName: user.name },
          ],
        });

        const phoneFromOrder = orders[0]?.phone || user.phone || "N/A";

        return {
          ...user._doc,
          phone: phoneFromOrder,
          totalOrders: orders.length,
        };
      })
    );

    res.status(200).json(usersWithOrders);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { phone, status } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { phone, status },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update user",
      error: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete user",
      error: error.message,
    });
  }
};