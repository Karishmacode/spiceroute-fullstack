import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Banner from "../models/Banner.js";

dotenv.config();
connectDB();

const banners = [
  {
    title: "Weekend Food Festival",
    subtitle: "Flat 40% OFF on pizzas, burgers and biryani.",
  image:
        "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=90&w=1100&auto=format&fit=crop",
    placement: "Home Hero",
    discount: "40% OFF",
    startDate: "26 May",
    endDate: "31 May",
    status: "Active",
  },
];

const seedBanners = async () => {
  try {
    await Banner.deleteMany();
    await Banner.insertMany(banners);

    console.log("Banners Seeded");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedBanners();