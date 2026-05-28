import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Offer from "../models/Offer.js";

dotenv.config();
connectDB();

const offers = [
  {
    title: "Today's Special",
    name: "Chicken Biryani",
    productName: "Chicken Biryani",
    price: "₹199",
    old: "₹249",
    badge: "20% OFF",
    discount: "20% OFF",
    valid: "25 May 2026",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=500",
  },
  {
    title: "Happy Hours",
    name: "Pizza Margherita",
    productName: "Pizza Margherita",
    price: "₹269",
    old: "₹299",
    badge: "10% OFF",
    discount: "10% OFF",
    valid: "31 May 2026",
    status: "Active",
    code: "HAPPY10",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=500",
  },
  {
    title: "Free Delivery",
    name: "Veg Burger",
    productName: "Veg Burger",
    price: "₹149",
    old: "₹189",
    badge: "Free Delivery",
    discount: "Free Delivery",
    valid: "31 May 2026",
    status: "Active",
    deliveryFree: true,
    image:
      "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=500",
  },
];

const seedOffers = async () => {
  try {
    await Offer.deleteMany();
    await Offer.insertMany(offers);

    console.log("Offers Seeded");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedOffers();