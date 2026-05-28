import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Star, ArrowLeft, Trash2 } from "lucide-react";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const savedFavourites =
      JSON.parse(localStorage.getItem("favourites")) || [];

    setFavourites(savedFavourites);
  }, []);

  const removeFavourite = (name) => {
    const updated = favourites.filter((item) => item.name !== name);

    setFavourites(updated);
    localStorage.setItem("favourites", JSON.stringify(updated));
  };

  const addToCart = (dish) => {
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
    <div className="min-h-screen bg-[#050816] text-white">
      <Navbar />
        <Sidebar />

      <main className="pt-24 px-4 lg:px-8 max-w-6xl mx-auto pb-12">
       

        <h1 className="text-3xl font-extrabold">My Favourites</h1>
        <p className="text-slate-400 mt-2">
          Your saved dishes appear here.
        </p>

        {favourites.length === 0 ? (
          <div className="mt-8 rounded-3xl bg-white/5 border border-white/10 p-10 text-center">
            <Heart className="mx-auto text-[#ff7a00]" size={42} />
            <h2 className="text-2xl font-extrabold mt-4">
              No favourites yet
            </h2>
            <p className="text-slate-400 mt-2">
              Tap the heart icon on dishes you like.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {favourites.map((dish) => (
              <article
                key={dish.name}
                className="group rounded-3xl bg-white/5 border border-white/10 p-3 hover:-translate-y-1 transition-all"
              >
                <div className="relative h-44 rounded-2xl overflow-hidden bg-white/5">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
                  />

                  <button
                    onClick={() => removeFavourite(dish.name)}
                    className="absolute top-2 right-2 h-9 w-9 rounded-full bg-black/45 backdrop-blur flex items-center justify-center text-red-400 hover:text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="p-2">
                  <h3 className="font-extrabold mt-2">{dish.name}</h3>

                  <p className="text-sm text-slate-400 line-clamp-2 mt-1">
                    {dish.desc}
                  </p>

                  <div className="mt-2 flex items-center gap-2 text-sm">
                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                    <span className="font-bold">{dish.rating}</span>
                    <span className="text-slate-500">({dish.orders})</span>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-yellow-400 font-extrabold">
                      ₹{dish.price}
                    </p>

                    <button
                      onClick={() => addToCart(dish)}
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
      </main>
    </div>
  );
};

export default Favourites;