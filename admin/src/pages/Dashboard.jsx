import { useEffect, useState } from "react";

import StatCard from "../components/cards/StatCard";
import FoodsCard from "../components/cards/FoodsCard";
import RecentOrdersCard from "../components/cards/RecentOrdersCard";
import SummaryCards from "../components/cards/SummaryCards";
import BottomFeatureBar from "../components/cards/BottomFeatureBar";
import AddFoodCard from "../components/cards/AddFoodCard";

import OrdersOverviewChart from "../components/charts/OrdersOverviewChart";

import SimpleTable from "../components/tables/SimpleTable";
import OrdersTable from "../components/tables/OrdersTable";
import RestaurantsTable from "../components/tables/RestaurantsTable";

import {
  ClipboardList,
  IndianRupee,
  Store,
  CalendarDays,
  Utensils,
} from "lucide-react";

import { getFoods } from "../services/foodService";
import { getRestaurants } from "../services/restaurantService";
import { getCategories } from "../services/categoryService";
import { getOffers } from "../services/offerService";
import { getOrders } from "../services/orderService";

const Dashboard = () => {
  const [foods, setFoods] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [offers, setOffers] = useState([]);
  const [orders, setOrders] = useState([]);

  const [dateRange, setDateRange] = useState({
    from: "2026-05-20",
    to: "2026-05-26",
  });

  const filteredOrders = orders.filter((order) => {
    if (!order.createdAt) return true;

    const orderDate = new Date(order.createdAt);
    const fromDate = new Date(dateRange.from);
    const toDate = new Date(dateRange.to);

    toDate.setHours(23, 59, 59, 999);

    return orderDate >= fromDate && orderDate <= toDate;
  });

  const totalRevenue = filteredOrders.reduce(
    (sum, order) => sum + Number(order.total || order.totalAmount || 0),
    0
  );

  const deliveredOrders = filteredOrders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const pendingOrders = filteredOrders.filter(
    (order) => order.status !== "Delivered" && order.status !== "Canceled"
  ).length;

  const canceledOrders = filteredOrders.filter(
    (order) => order.status === "Canceled"
  ).length;

  const growth = (value) => `↑ ${value > 0 ? Math.min(value * 2, 99) : 0}%`;

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [
          foodsData,
          ordersData,
          restaurantsData,
          categoriesData,
          offersData,
        ] = await Promise.all([
          getFoods(),
          getOrders(),
          getRestaurants(),
          getCategories(),
          getOffers(),
        ]);

        setFoods(Array.isArray(foodsData) ? foodsData : foodsData.foods || []);
        setOrders(
          Array.isArray(ordersData) ? ordersData : ordersData.orders || []
        );
        setRestaurants(
          Array.isArray(restaurantsData)
            ? restaurantsData
            : restaurantsData.restaurants || []
        );
        setCategories(
          Array.isArray(categoriesData)
            ? categoriesData
            : categoriesData.categories || []
        );
        setOffers(
          Array.isArray(offersData) ? offersData : offersData.offers || []
        );
      } catch (error) {
        console.log("Dashboard fetch error:", error);
      }
    };

    loadDashboardData();
  }, []);

  return (
    <div className="admin-dashboard flex flex-col p-4 gap-4">
      <div className="flex-1 grid grid-cols-1 xl:grid-cols-[1.5fr_1fr] gap-4">
        <div className="space-y-4">
          <div className="admin-panel p-4">
            <div className="flex justify-between mb-6">
              <div>
                <h1 className="text-[28px] font-black">Dashboard</h1>
                <p className="text-slate-500 text-sm">Welcome back Admin</p>
              </div>

              <label className="relative cursor-pointer rounded-xl bg-white/5 border border-white/10 px-4 py-3 flex items-center gap-3 hover:border-orange-500/40 transition">
                <span className="text-sm font-medium">
                  {dateRange.from} - {dateRange.to}
                </span>

                <CalendarDays size={16} className="text-slate-400" />

                <input
                  type="date"
                  value={dateRange.from}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, from: e.target.value })
                  }
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </label>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
             <StatCard
  title="Total Orders"
  value={orders.length}
  icon={ClipboardList}
  growth={growth(orders.length)}
/>

<StatCard
  title="Total Revenue"
  value={`₹${totalRevenue}`}
  icon={IndianRupee}
  growth={growth(Math.floor(totalRevenue / 1000))}
/>

              <StatCard
                title="Total Foods"
                value={foods.length}
                icon={Utensils}
                growth={growth(foods.length)}
              />

              <StatCard
                title="Restaurants"
                value={restaurants.length}
                icon={Store}
                growth={growth(restaurants.length)}
              />
            </div>

            <div className="mt-4 grid lg:grid-cols-[1.55fr_.95fr] gap-4">
              <OrdersOverviewChart orders={orders} />

              {/* recent order */}
              <RecentOrdersCard orders={orders} />
            </div>

            <SummaryCards
              activeOffers={
                offers.filter((offer) => offer.status !== "Inactive").length
              }
              todayRevenue={totalRevenue}
              pendingOrders={pendingOrders}
              newUsers={
                [...new Set(orders.map((order) => order.phone).filter(Boolean))]
                  .length
              }
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-4">
            <OrdersTable orders={orders.slice(0, 5)} />
            <RestaurantsTable restaurants={restaurants.slice(0, 5)} />
          </div>
        </div>

        <div className="space-y-4">
          <FoodsCard foods={foods.slice(0, 5)} />

          <AddFoodCard />

          <div className="grid sm:grid-cols-2 gap-4">
            {/* discouttable */}
            <SimpleTable
              title="Offers"
              desc="Discounts"
              columns={["Offer", "Valid", "Status"]}
              rows={offers
                .slice(0, 5)
                .map((offer) => [
                  offer.title,
                  offer.valid || offer.endDate || "N/A",
                  offer.status || "Active",
                ])}
            />


            {/* categoriesTable */}

            <SimpleTable
              title="Categories"
              desc="Food types"
              columns={["Name", "Items", "Status"]}
              rows={categories
                .slice(0, 5)
                .map((category) => [
                  category.name,
                  category.items || category.count || 0,
                  category.status || "Active",
                ])}
            />
          </div>
        </div>
      </div>

      <BottomFeatureBar
        foods={foods.length}
        restaurants={restaurants.length}
        categories={categories.length}
        offers={offers.length}
      />
    </div>
  );
};

export default Dashboard;
