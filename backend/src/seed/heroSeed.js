import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Hero from "../models/Hero.js";

dotenv.config();
connectDB();

const seedHero = async () => {
  try {
    await Hero.deleteMany();

    await Hero.create({
      badge: "Hot & Fresh",
      title: "Delicious Food,",
      highlight: "Delivered Fast",
      desc: "Discover top restaurants and enjoy your favorite meals at your doorstep, freshly prepared and delivered with care.",
      image:
        "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=90&w=1100&auto=format&fit=crop",
    });

    console.log("Hero Seeded");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedHero();