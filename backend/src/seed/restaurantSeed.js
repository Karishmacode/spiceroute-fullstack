import dotenv from "dotenv";

import connectDB from "../config/db.js";
import Restaurant from "../models/Restaurant.js";

dotenv.config();

connectDB();

const restaurants = [
  {
    name: "Biryani House",
    slug: "biryani-house",
    image:
      "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=600&auto=format&fit=crop",
    rating: 4.7,
    time: "30-40 min",
    delivery: "₹40 Delivery",
    cuisine: "Biryani, Mughlai, North Indian",
    offer: "50% OFF UP TO ₹120",
    category: "Biryani",
  },

  {
    name: "Pizza Corner",
    slug: "pizza-corner",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600&auto=format&fit=crop",
    rating: 4.5,
    time: "25-35 min",
    delivery: "₹50 Delivery",
    cuisine: "Pizza, Italian, Fast Food",
    offer: "40% OFF UP TO ₹100",
    category: "Pizza",
  },

  {
    name: "China Town",
    slug: "china-town",
    image:
      "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=600&auto=format&fit=crop",
    rating: 4.4,
    time: "20-30 min",
    delivery: "₹35 Delivery",
    cuisine: "Chinese, Asian, Noodles",
    offer: "30% OFF UP TO ₹80",
    category: "Chinese",
  },

  {
    name: "Burger Hub",
    slug: "burger-hub",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop",
    rating: 4.3,
    time: "15-25 min",
    delivery: "₹30 Delivery",
    cuisine: "Burger, Fast Food, Beverages",
    offer: "20% OFF UP TO ₹60",
    category: "Burger",
  },
];

const seedRestaurants = async () => {
  try {
    await Restaurant.deleteMany();

    await Restaurant.insertMany(restaurants);

    console.log("Restaurants Seeded");

    process.exit();
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

seedRestaurants();