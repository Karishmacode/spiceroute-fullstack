import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Category from "../models/Category.js";

dotenv.config();
connectDB();

const categories = [
  { name: "All", emoji: "▦" },
  {
    name: "Biryani",
    image:
      "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=300&auto=format&fit=crop",
  },
  {
    name: "Pizza",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=300&auto=format&fit=crop",
  },
  {
    name: "Burger",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=300&auto=format&fit=crop",
  },
  {
    name: "Chinese",
    image:
      "https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=300&auto=format&fit=crop",
  },
  {
    name: "Desserts",
    image:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=300&auto=format&fit=crop",
  },
  {
    name: "Beverages",
    image:
      "https://images.unsplash.com/photo-1544145945-f90425340c7e?q=80&w=300&auto=format&fit=crop",
  },
  {
    name: "Healthy",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=300&auto=format&fit=crop",
  },
  {
    name: "North Indian",
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=300&auto=format&fit=crop",
  },
  {
    name: "Dosa",
    image:
      "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=300&auto=format&fit=crop",
  },
];

const seedCategories = async () => {
  try {
    await Category.deleteMany();
    await Category.insertMany(categories);

    console.log("Categories Seeded");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedCategories();