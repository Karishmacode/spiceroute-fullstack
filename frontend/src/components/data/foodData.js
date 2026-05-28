import {
  Home,
  Pizza,
  Beef,
  Soup,
  CakeSlice,
  Coffee,
  Leaf,
  ClipboardList,
  Heart,
  MapPin,
  Headphones,
  Settings,
  Gift,
  Flame,
} from "lucide-react";

export const sidebarItems = [
  { name: "Home", icon: Home, active: true, path: "/" },
  { name: "Biryani", icon: Flame, path: "/menu?category=Biryani&title=Biryani" },
  { name: "Pizza", icon: Pizza, path: "/menu?category=Pizza&title=Pizza" },
  { name: "Burger", icon: Beef, path: "/menu?category=Burger&title=Burger" },
  { name: "Chinese", icon: Soup, path: "/menu?category=Chinese&title=Chinese" },
  { name: "Desserts", icon: CakeSlice, path: "/menu?category=Desserts&title=Desserts" },
  { name: "Beverages", icon: Coffee, path: "/menu?category=Beverages&title=Beverages" },
  { name: "Healthy", icon: Leaf, path: "/menu?category=Healthy&title=Healthy" },
];

export const accountItems = [
  { name: "Orders", icon: ClipboardList, path: "/orders" },
  { name: "Favourites", icon: Heart, path: "/favourites" },

  { name: "Addresses", icon: MapPin, path: "/settings" },
  { name: "Support", icon: Headphones, path: "/help" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

//  export const categories = [
//   { name: "All", emoji: "▦" },
//   {
//     name: "Biryani",
//     image:
//       "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=300&auto=format&fit=crop",
//   },
//   {
//     name: "Pizza",
//     image:
//       "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=300&auto=format&fit=crop",
//   },
//   {
//     name: "Burger",
//     image:
//       "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=300&auto=format&fit=crop",
//   },
//   {
//     name: "Chinese",
//     image:
//       "https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=300&auto=format&fit=crop",
//   },
//   {
//     name: "Desserts",
//     image:
//       "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=300&auto=format&fit=crop",
//   },
//   {
//     name: "Beverages",
//     image:
//       "https://images.unsplash.com/photo-1544145945-f90425340c7e?q=80&w=300&auto=format&fit=crop",
//   },
//   {
//     name: "Healthy",
//     image:
//       "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=300&auto=format&fit=crop",
//   },
//   {
//     name: "North Indian",
//     image:
//       "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=300&auto=format&fit=crop",
//   },
//   {
//     name: "Dosa",
//     image:
//       "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=300&auto=format&fit=crop",
//   },
// ];

// export const dishes = [
//   {
//     name: "Chicken Biryani",
//     desc: "Classic chicken biryani cooked with rich spices.",
//     price: 249,
//     rating: 4.5,
//     orders: "12.5K",
//     tag: "Bestseller",
//     image:
//       "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=500&auto=format&fit=crop",
//   },
//   {
//     name: "Veg Burger",
//     desc: "Crispy veg patty layered with fresh lettuce.",
//     price: 149,
//     rating: 4.2,
//     orders: "8.3K",
//     image:
//       "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500&auto=format&fit=crop",
//   },
//   {
//     name: "Pizza Margherita",
//     desc: "Cheesy pizza loaded with herbs and tomato.",
//     price: 299,
//     rating: 4.6,
//     orders: "9.1K",
//     image:
//       "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=500&auto=format&fit=crop",
//   },
//   {
//     name: "Momo Steam",
//     desc: "Soft steamed momos served with spicy chutney.",
//     price: 80,
//     rating: 4.6,
//     orders: "6.2K",
//     image:
//       "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?q=80&w=500&auto=format&fit=crop",
//   },
//   {
//     name: "Paneer Butter Masala",
//     desc: "Creamy paneer curry with tomato gravy.",
//     price: 180,
//     rating: 4.6,
//     orders: "7.8K",
//     image:
//       "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=500&auto=format&fit=crop",
//   },
//   {
//     name: "South Indian Breakfast",
//     desc: "Idli, vada and sambhar with coconut chutney.",
//     price: 80,
//     rating: 4.6,
//     orders: "5.4K",
//     image:
//       "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=500&auto=format&fit=crop",
//   },
// ];

// export const restaurants = [
//   {
//     name: "Biryani House",
//     image:
//       "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=300&auto=format&fit=crop",
//     rating: 4.6,
//     time: "30-40 min",
//     delivery: "₹40 Delivery",
//     cuisine: "Biryani, North Indian, Mughlai",
//     offer: "50% OFF UP TO ₹120",
//   },


  
//   {
//     name: "Pizza Corner",
//     image:
//       "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=300&auto=format&fit=crop",
//     rating: 4.4,
//     time: "25-35 min",
//     delivery: "₹60 Delivery",
//     cuisine: "Pizza, Italian, Fast Food",
//     offer: "40% OFF UP TO ₹100",
//   },

//   {
//     name: "China Town",
//     image:
//       "https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=300&auto=format&fit=crop",
//     rating: 4.3,
//     time: "35-45 min",
//     delivery: "₹50 Delivery",
//     cuisine: "Chinese, Thai, Asian",
//     offer: "30% OFF UP TO ₹80",
//   },

//   {
//     name: "Burger Hub",
//     image:
//       "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=300&auto=format&fit=crop",
//     rating: 4.5,
//     time: "20-30 min",
//     delivery: "₹30 Delivery",
//     cuisine: "Burger, Fast Food, Beverages",
//     offer: "20% OFF UP TO ₹60",
//   },
// ];


export const offers = [
  {
    title: "Today's Special",
    name: "Chicken Biryani",
    productName: "Chicken Biryani",
    price: "₹199",
    old: "₹249",
    badge: "20% OFF",
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
    deliveryFree: true,
    image:
      "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=500",
  },
];

