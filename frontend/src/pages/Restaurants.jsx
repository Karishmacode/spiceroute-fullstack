import { Link } from "react-router-dom";
import { Star } from "lucide-react";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

import { useEffect, useState } from "react";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/restaurants")
      .then((res) => res.json())
      .then((data) => setRestaurants(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <Navbar />
      <Sidebar />

      <main className="pt-24 xl:pl-64 px-4 lg:px-6 pb-12">
        <div className="max-w-[1600px] mx-auto">
          <h1 className="text-3xl font-extrabold">All Restaurants</h1>

          <p className="text-slate-400 mt-2">
            Explore popular restaurants near you.
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {restaurants.map((restaurant) => (
              <Link
                key={restaurant._id}
                to={`/restaurant/${restaurant.slug}`}
                className="rounded-3xl bg-white/5 border border-white/10 p-4 hover:border-[#ff7a00]/40 hover:-translate-y-1 transition-all"
              >
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="h-40 w-full rounded-2xl object-cover"
                />

                <h2 className="mt-4 text-lg font-extrabold">
                  {restaurant.name}
                </h2>

                <p className="text-sm text-slate-400 mt-1">
                  {restaurant.cuisine}
                </p>

                <div className="mt-3 flex items-center gap-2 text-sm">
                  <Star
                    size={16}
                    className="text-yellow-400 fill-yellow-400"
                  />

                  <span className="font-bold">
                    {restaurant.rating}
                  </span>

                  <span className="text-slate-400">
                    • {restaurant.time}
                  </span>
                </div>

                <p className="mt-3 inline-block px-3 py-1 rounded-xl bg-green-500/15 text-green-400 text-xs font-bold">
                  {restaurant.offer}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Restaurants;