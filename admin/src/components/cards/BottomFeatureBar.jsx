import { Link } from "react-router-dom";

import {
  ClipboardList,
  Utensils,
  Store,
  BadgePercent,
  Tags,
  Monitor,
} from "lucide-react";

const BottomFeatureBar = ({
  foods = 0,
  restaurants = 0,
  categories = 0,
  offers = 0,
}) => {
  const features = [
    [
      ClipboardList,
      "Dashboard",
      `${foods + restaurants + offers} Stats`,
      "bg-orange-500",
      "/",
    ],

    [
      Utensils,
      "Foods",
      `${foods} Items`,
      "bg-purple-500",
      "/foods",
    ],

    [
      ClipboardList,
      "Orders",
      "Live Tracking",
      "bg-red-500",
      "/orders",
    ],

    [
      Store,
      "Restaurants",
      `${restaurants} Partners`,
      "bg-green-500",
      "/restaurants",
    ],

    [
      BadgePercent,
      "Offers",
      `${offers} Deals`,
      "bg-yellow-500",
      "/offers",
    ],

    [
      Tags,
      "Categories",
      `${categories} Types`,
      "bg-violet-500",
      "/categories",
    ],

    [
      Monitor,
      "Settings",
      "Controls",
      "bg-blue-500",
      "/settings",
    ],
  ];

  return (
    <div className="admin-card p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mt-auto">
      {features.map(
        ([Icon, title, desc, color, link]) => (
          <Link
            to={link}
            key={title}
            className="flex items-center gap-3 group cursor-pointer hover:bg-white/[0.03] rounded-2xl p-2 transition-all"
          >
            <div
              className={`h-10 w-10 rounded-xl ${color} flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg`}
            >
              <Icon
                size={18}
                className="text-white"
              />
            </div>

            <div>
              <p className="font-black text-xs text-white">
                {title}
              </p>

              <p className="text-[10px] text-slate-500">
                {desc}
              </p>
            </div>
          </Link>
        )
      )}
    </div>
  );
};

export default BottomFeatureBar;