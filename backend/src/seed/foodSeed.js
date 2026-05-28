import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Food from "../models/Food.js";

dotenv.config();
connectDB();

const foodData = [
  {
    name: "Butter Chicken",
    desc: "Creamy tomato gravy with tender chicken pieces.",
    price: 269,
    rating: 4.7,
    orders: "15K",
    tag: "Bestseller",
    category: "North Indian",
    image:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=500&auto=format&fit=crop",
  },

  {
    name: "Classic Biryani",
    desc: "Flavorful layered rice dish infused with traditional spices.",
    price: 120,
    rating: 4.5,
    orders: "9.5K",
    category: "Biryani",
    image:
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=500&auto=format&fit=crop",
  },

  {
    name: "Pav Bhaji",
    desc: "Mumbai street-style bhaji served with butter pav.",
    price: 110,
    rating: 4.5,
    orders: "13K",
    tag: "Street Style",
    category: "Street Food",
    image:
      "https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=500&auto=format&fit=crop",
  },

  {
    name: "Hakka Noodles",
    desc: "Veg noodles tossed with sauces and crunchy veggies.",
    price: 130,
    rating: 4.2,
    orders: "7.1K",
    category: "Chinese",
    image:
      "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?q=80&w=500&auto=format&fit=crop",
  },

  {
    name: "Paneer Tikka",
    desc: "Spicy grilled paneer cubes with smoky flavor.",
    price: 220,
    rating: 4.6,
    orders: "6.9K",
    category: "Starter",
    image:
      "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=500&auto=format&fit=crop",
  },

  {
    name: "Chicken BBQ Platter",
    desc: "Tender smoked chicken served with herbs and fresh greens.",
    price: 120,
    rating: 4.3,
    orders: "8.7K",
    category: "Rolls",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=500&auto=format&fit=crop",
  },

  {
  name: "Chicken Biryani",
  desc: "Authentic Kolkata-style biryani",
  price: 219,
  rating: 4.4,
  orders: "9.1K",
  featured: true,
  category: "Biryani",
  image:
    "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=90&w=1100&auto=format&fit=crop",
},

  {
    name: "Veg Fried Rice",
    desc: "Flavorful fried rice with vegetables and spices.",
    price: 110,
    rating: 4.2,
    orders: "7.4K",
    category: "Chinese",
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=500&auto=format&fit=crop",
  },

  {
    name: "Grilled Fish Fillet",
    desc: "Tender grilled fillet served with healthy vegetable sides.",
    price: 299,
    rating: 4.7,
    orders: "12K",
    tag: "Chef's Special",
    category: "North Indian",
    image:
      "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=500&auto=format&fit=crop",
  },

  {
    name: "Seekh Kebab Platter",
    desc: "Juicy grilled kebabs served with fries, salad, and chutney.",
    price: 90,
    rating: 4.1,
    orders: "5.6K",
    category: "Chinese",
    image:
      "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?q=80&w=500&auto=format&fit=crop",
  },

  {
    name: "Punjabi Snack Platter",
    desc: "A delightful combo of samosas, chaat, and flavorful curry.",
    price: 130,
    rating: 4.4,
    orders: "9K",
    category: "North Indian",
    image:
      "https://images.unsplash.com/photo-1613292443284-8d10ef9383fe?q=80&w=500&auto=format&fit=crop",
  },

  {
    name: "Cold Coffee",
    desc: "Refreshing cold coffee blended with ice cream.",
    price: 99,
    rating: 4.3,
    orders: "4.2K",
    category: "Beverages",
    image:
      "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=500&auto=format&fit=crop",
  },

  {
    name: "Chocolate Cake",
    desc: "Rich chocolate cake topped with creamy layers.",
    price: 150,
    rating: 4.8,
    orders: "14K",
    tag: "Sweet Tooth",
    category: "Desserts",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=500&auto=format&fit=crop",
  },

  {
    name: "Samosa",
    desc: "Crunchy deep-fried samosas stuffed with flavorful potato filling.",
    price: 199,
    rating: 4.3,
    orders: "10.2K",
    tag: "Popular",
    category: "Street Food",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=500&auto=format&fit=crop",
  },

  {
    name: "Chicken Biryani",
    desc: "Authentic Kolkata-style biryani with boiled eggs.",
    price: 219,
    rating: 4.4,
    orders: "9.1K",
    tag: "Popular",
    category: "Biryani",
    image:
      "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=500&auto=format&fit=crop",
  },

  {
    name: "Mutton Biryani",
    desc: "Slow-cooked mutton biryani with authentic spices.",
    price: 329,
    rating: 4.8,
    orders: "11K",
    tag: "Chef's Special",
    category: "Biryani",
    image:
      "https://images.unsplash.com/photo-1701579231305-d84d8af9a3fd?q=80&w=500&auto=format&fit=crop",
  },

  {
    name: "Margherita Pizza",
    desc: "Classic cheese pizza with tomato & herbs.",
    price: 299,
    rating: 4.5,
    orders: "9.1K",
    category: "Pizza",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=500&auto=format&fit=crop",
  },

  {
    name: "Farmhouse Pizza",
    desc: "Loaded pizza with fresh veggies & mozzarella cheese.",
    price: 349,
    rating: 4.6,
    orders: "7.4K",
    category: "Pizza",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=500&auto=format&fit=crop",
  },

  {
    name: "Chicken Pizza",
    desc: "Juicy chicken chunks with extra cheese toppings.",
    price: 399,
    rating: 4.7,
    orders: "8.7K",
    tag: "Hot",
    category: "Pizza",
    image:
      "https://images.unsplash.com/photo-1594007654729-407eedc4be65?q=80&w=500&auto=format&fit=crop",
  },

  {
    name: "Cheese Burst Pizza",
    desc: "Extra cheesy pizza with molten cheese center.",
    price: 429,
    rating: 4.8,
    orders: "10K",
    tag: "Trending",
    category: "Pizza",
    image:
      "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?q=80&w=500&auto=format&fit=crop",
  },

  {
    name: "Veg Hakka Noodles",
    desc: "Stir-fried noodles with crunchy vegetables.",
    price: 139,
    rating: 4.2,
    orders: "6.5K",
    category: "Chinese",
    image:
      "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?q=80&w=500&auto=format&fit=crop",
  },

  {
    name: "Chicken Noodles",
    desc: "Spicy chicken noodles tossed in Asian sauces.",
    price: 169,
    rating: 4.4,
    orders: "7.3K",
    category: "Chinese",
    image:
      "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=500&auto=format&fit=crop",
  },

  {
    name: "Veg Burger",
    desc: "Crispy veg patty layered with lettuce & mayo.",
    price: 149,
    rating: 4.2,
    orders: "8.3K",
    category: "Burger",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500&auto=format&fit=crop",
  },

  {
    name: "Chicken Burger",
    desc: "Juicy chicken burger with spicy sauce.",
    price: 189,
    rating: 4.5,
    orders: "9.2K",
    category: "Burger",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=500&auto=format&fit=crop",
  },

  {
    name: "Cheese Burger",
    desc: "Loaded cheeseburger with double cheese layers.",
    price: 209,
    rating: 4.6,
    orders: "7.8K",
    tag: "Cheesy",
    category: "Burger",
    image:
      "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?q=80&w=500&auto=format&fit=crop",
  },

  {
    name: "Paneer Burger",
    desc: "Soft paneer patty burger with spicy flavors.",
    price: 179,
    rating: 4.4,
    orders: "6.7K",
    category: "Burger",
    image:
      "https://images.unsplash.com/photo-1520072959219-c595dc870360?q=80&w=500&auto=format&fit=crop",
  },

  {
  name: "South Indian Thali",
  desc: "Authentic South Indian thali with dosa, rice, sambar, and tasty curries.",
  price: 299,
  rating: 4.2,
  orders: "2.2k",
  category: "South Indian",
  image:
    "https://images.unsplash.com/photo-1630383249896-424e482df921?q=80&w=1000&auto=format&fit=crop",
},

{
  name: "Idli Chutney",
  desc: "Soft steamed idlis served with fresh coconut chutney and flavorful South Indian sambar.",
  price: 149,
  rating: 4.6,
  orders: "4.1k",
  category: "South Indian",
  image:
    "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=1000&auto=format&fit=crop",
},

{
  name: "Healthy Veggie Bowl",
  desc: "Fresh avocado, cherry tomatoes, chickpeas, and colorful veggies served in a nutritious healthy bowl.",
  price: 249,
  rating: 4.7,
  orders: "4.5k",
  category: "Healthy",
  image:
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000&auto=format&fit=crop",
},

{
  name: "Veg Thukpa",
  desc: "Traditional Himalayan noodle soup loaded with vegetables and flavorful broth.",
  price: 219,
  rating: 4.5,
  orders: "2.9k",
  category: "North East",
  image:
    "https://images.unsplash.com/photo-1617093727343-374698b1b08d?q=80&w=1000&auto=format&fit=crop",
},

];

const seedFoods = async () => {
  try {
    await Food.deleteMany();

    await Food.insertMany(foodData);

    console.log("Foods Seeded");

    process.exit();
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

seedFoods();