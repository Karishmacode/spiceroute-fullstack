import { useLocation } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import { useEffect, useState } from "react";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

const Menu = () => {
  const location = useLocation();

  const [dishes, setDishes] = useState([]);
  const [favourites, setFavourites] = useState([]);

  const params = new URLSearchParams(location.search);

  const title = params.get("title") || "All Menu Items";
  const category = params.get("category") || "All";

  useEffect(() => {
    const url =
      category && category !== "All"
        ? `http://localhost:5000/api/foods?category=${encodeURIComponent(
            category
          )}`
        : "http://localhost:5000/api/foods";

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setDishes(data);
        } else {
          setDishes([]);
        }
      })
      .catch((error) => {
        console.log(error);
        setDishes([]);
      });

    const savedFavourites =
      JSON.parse(localStorage.getItem("favourites")) || [];

    setFavourites(savedFavourites);
  }, [category]);

  const isFavourite = (dishName) => {
    return favourites.some((item) => item.name === dishName);
  };

  const handleFavourite = (dish) => {
    let updatedFavourites;

    if (isFavourite(dish.name)) {
      updatedFavourites = favourites.filter((item) => item.name !== dish.name);
    } else {
      updatedFavourites = [...favourites, dish];
    }

    setFavourites(updatedFavourites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  };

  const handleAddToCart = (dish) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = cart.find((item) => item.name === dish.name);

    const updatedCart = exists
      ? cart.map((item) =>
          item.name === dish.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...cart, { ...dish, quantity: 1 }];

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#11213f_0%,#070b14_48%,#050816_100%)] text-white">
      <Navbar />
      <Sidebar />

      <main className="pt-24 xl:pl-64 px-4 lg:px-6 pb-12">
        <div className="max-w-[1600px] mx-auto">
          <h1 className="text-3xl font-extrabold">{title}</h1>

          <p className="text-slate-400 mt-2">
            Browse dishes available on SpiceRoute.
          </p>

          {dishes.length === 0 ? (
            <p className="mt-8 text-slate-400">No dishes found.</p>
          ) : (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-5">
              {dishes.map((dish) => (
                <article
                  key={dish._id}
                  className="group card-bg rounded-3xl p-3 hover:-translate-y-1 transition-all"
                >
                  <div className="relative h-44 rounded-2xl overflow-hidden bg-white/5">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
                    />

                    {dish.tag && (
                      <span className="absolute top-2 left-2 bg-[#ff7a00] px-2 py-1 text-xs font-bold rounded-lg">
                        {dish.tag}
                      </span>
                    )}

                    <button
                      onClick={() => handleFavourite(dish)}
                      className="absolute top-2 right-2 h-9 w-9 rounded-full bg-black/35 backdrop-blur flex items-center justify-center"
                    >
                      <Heart
                        size={18}
                        className={
                          isFavourite(dish.name)
                            ? "text-red-500 fill-red-500"
                            : "text-white"
                        }
                      />
                    </button>
                  </div>

                  <div className="p-2">
                    <h3 className="font-extrabold mt-2">{dish.name}</h3>

                    <p className="text-sm text-slate-400 line-clamp-2 mt-1">
                      {dish.desc}
                    </p>

                    <div className="mt-2 flex items-center gap-2 text-sm">
                      <Star
                        size={16}
                        className="text-yellow-400 fill-yellow-400"
                      />
                      <span className="font-bold">{dish.rating}</span>
                      <span className="text-slate-500">({dish.orders})</span>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-yellow-400 font-extrabold">
                        ₹{dish.price}
                      </p>

                      <button
                        onClick={() => handleAddToCart(dish)}
                        className="px-4 py-2 rounded-xl bg-[#ff7a00] hover:bg-[#ff9129] text-sm font-bold"
                      >
                        Add +
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Menu;