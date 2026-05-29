// 



import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000,
    });

    console.log("MongoDB Connected");
  } catch (error) {
    console.log("DB Error:", error);
    process.exit(1);
  }
};

export default connectDB;