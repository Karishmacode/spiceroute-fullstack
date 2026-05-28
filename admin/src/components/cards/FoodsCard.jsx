import { useEffect, useState } from "react";
import { getFoods } from "../../services/foodService";

import FoodsTable from "../tables/FoodsTable";
import SearchInput from "../ui/SearchInput";

const FoodsCard = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const loadFoods = async () => {
      try {
        const data = await getFoods();

        console.log("Dashboard Foods:", data);

        setFoods(
          Array.isArray(data)
            ? data.slice(0, 5)
            : data.foods?.slice(0, 5) || []
        );
      } catch (error) {
        console.log("Dashboard foods error:", error);
      }
    };

    loadFoods();
  }, []);

  return (
    <div className="admin-card overflow-hidden">
      <div className="p-3">

        <div className="mb-3">
          <h2 className="text-lg font-black">Foods</h2>

          <p className="text-[10px] text-slate-500">
            Manage all food items here.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_130px_150px_110px] gap-2 mb-3">

          <SearchInput placeholder="Search foods..." />

          <select className="h-9 rounded-xl border border-white/10 bg-white/[0.03] px-2 text-xs outline-none">
            <option>All Categories</option>
          </select>

          <select className="h-9 rounded-xl border border-white/10 bg-white/[0.03] px-2 text-xs outline-none">
            <option>All Restaurants</option>
          </select>

          <button className="h-9 rounded-xl bg-[#ff7a00] text-white font-bold text-xs">
            + Add Food
          </button>

        </div>

        <FoodsTable foods={foods} />

      </div>
    </div>
  );
};

export default FoodsCard;