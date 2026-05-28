import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const loginUser = async (req, res) => {
  try {
    const { name, mobile, otp } = req.body;

    if (!name || !mobile || !otp) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (otp !== "123456") {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    let user = await User.findOne({ mobile });

    if (!user) {
      user = await User.create({
        name,
        mobile,
      });
    } else {
      user.name = name;
      await user.save();
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
};