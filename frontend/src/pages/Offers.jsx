import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { BadgePercent, Truck, Clock, Flame, Timer } from "lucide-react";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import { offers } from "../components/data/foodData";

const getOfferIcon = (title) => {
  if (title.toLowerCase().includes("special")) return Flame;
  if (title.toLowerCase().includes("happy")) return Timer;
  if (title.toLowerCase().includes("delivery")) return Truck;
  return BadgePercent;
};

const Offers = () => {
  const navigate = useNavigate();

  const [restaurants, setRestaurants] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [offerBanner, setOfferBanner] = useState(null);

  useEffect(() => {
    fetch("https://spiceroute-fullstack.onrender.com/api/restaurants")
      .then((res) => res.json())
      .then((data) => setRestaurants(Array.isArray(data) ? data : []))
      .catch(() => setRestaurants([]));

    fetch("https://spiceroute-fullstack.onrender.com/api/foods")
      .then((res) => res.json())
      .then((data) => setDishes(Array.isArray(data) ? data : []))
      .catch(() => setDishes([]));

    fetch("https://spiceroute-fullstack.onrender.com/api/banners")
      .then((res) => res.json())
      .then((data) => {
        const banner = data.find(
          (item) =>
            item.placement === "Offers Page" && item.status === "Active"
        );

        setOfferBanner(banner || null);
      })
      .catch(() => setOfferBanner(null));
  }, []);

  const handleGrabDeal = (offer) => {
    const dish = dishes.find((item) => item.name === offer.productName);

    if (!dish) {
      alert("Offer item not found");
      return;
    }

    const offerPrice = Number(String(offer.price).replace("₹", ""));

    const offerCartItem = {
      ...dish,
      price: offerPrice,
      oldPrice: dish.price,
      discountText: offer.badge,
      deliveryFree: offer.deliveryFree || false,
      offerTitle: offer.title,
      quantity: 1,
    };

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const exists = cart.find(
      (item) =>
        item.name === offerCartItem.name && item.offerTitle === offer.title
    );

    const updatedCart = exists
      ? cart.map((item) =>
          item.name === offerCartItem.name && item.offerTitle === offer.title
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...cart, offerCartItem];

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));

    navigate("/cart");
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <Navbar />
      <Sidebar />

      <main className="pt-24 xl:pl-64 px-4 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#ff7a00]/25 to-white/5 border border-[#ff7a00]/30 p-8">
            {offerBanner?.image && (
              <img
                src={offerBanner.image}
                alt={offerBanner.title}
                className="absolute right-0 top-0 h-full w-[45%] object-cover opacity-30 hidden md:block"
              />
            )}

            <div className="relative z-10 max-w-2xl">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ff7a00]/15 border border-[#ff7a00]/30 text-[#ff9a3d] text-sm font-bold mb-4">
                <Flame size={15} className="fill-[#ff7a00]" />
                {offerBanner?.discount || "Best Deals"}
              </span>

              <h1 className="text-4xl font-extrabold">
                {offerBanner?.title || "Offers & Deals"}
              </h1>

              <p className="text-slate-300 mt-3 max-w-2xl">
                {offerBanner?.subtitle ||
                  "Save more on your favourite food with today’s special offers, restaurant discounts and free delivery deals."}
              </p>
            </div>
          </div>

          <section className="mt-10">
            <h2 className="text-2xl font-extrabold mb-5">
              Today’s Best Offers
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {offers.map((offer) => {
                const Icon = getOfferIcon(offer.title);

                return (
                  <div
                    key={offer.title}
                    className="rounded-3xl bg-white/5 border border-white/10 p-6 hover:border-[#ff7a00]/40 transition"
                  >
                    <div className="flex items-center justify-between">
                      <div className="h-14 w-14 rounded-2xl bg-[#ff7a00]/15 border border-[#ff7a00]/30 flex items-center justify-center">
                        <Icon className="text-[#ff7a00]" size={28} />
                      </div>

                      <span className="px-3 py-1 rounded-full bg-green-500/15 text-green-400 text-xs font-bold">
                        {offer.badge}
                      </span>
                    </div>

                    <h3 className="mt-5 text-sm text-[#ff7a00] font-bold">
                      {offer.title}
                    </h3>

                    <h2 className="mt-2 text-xl font-extrabold">
                      {offer.name}
                    </h2>

                    <p className="mt-2 text-slate-300 font-bold">
                      {offer.price}
                    </p>

                    {offer.old && (
                      <p className="mt-1 text-sm text-slate-500 line-through">
                        {offer.old}
                      </p>
                    )}

                    <button
                      onClick={() => handleGrabDeal(offer)}
                      className="mt-5 w-full py-3 rounded-2xl bg-[#ff7a00] hover:bg-[#ff9129] font-bold transition"
                    >
                      Grab Deal
                    </button>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-extrabold mb-5">
              Restaurant Discounts
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
              {restaurants.map((restaurant) => (
                <Link
                  key={restaurant._id}
                  to={`/restaurant/${restaurant.slug}`}
                  className="rounded-3xl bg-white/5 border border-white/10 overflow-hidden hover:border-[#ff7a00]/40 hover:-translate-y-1 transition block"
                >
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="h-36 w-full object-cover"
                  />

                  <div className="p-4">
                    <h3 className="font-extrabold text-lg">
                      {restaurant.name}
                    </h3>

                    <p className="text-slate-400 text-sm mt-1">
                      {restaurant.cuisine}
                    </p>

                    <div className="mt-3 flex items-center gap-2 text-sm">
                      <span className="text-yellow-400">
                        ⭐ {restaurant.rating}
                      </span>

                      <span className="text-slate-500">•</span>

                      <span className="text-slate-300">{restaurant.time}</span>
                    </div>

                    <div className="mt-4 flex justify-between items-center">
                      <span className="px-3 py-2 rounded-xl bg-emerald-500/15 text-emerald-400 text-xs font-bold">
                        {restaurant.offer || "20% OFF up to ₹80"}
                      </span>

                      <button className="text-[#ff7a00] font-bold text-sm hover:text-[#ff9129]">
                        View →
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
              <Truck className="text-[#ff7a00]" size={34} />
              <h2 className="mt-4 text-xl font-extrabold">Free Delivery</h2>
              <p className="text-slate-400 mt-2">
                Get free delivery on selected restaurants and orders above ₹199.
              </p>
            </div>

            <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
              <Clock className="text-[#ff7a00]" size={34} />
              <h2 className="mt-4 text-xl font-extrabold">Happy Hours</h2>
              <p className="text-slate-400 mt-2">
                Extra 10% OFF during limited-time happy hour deals.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Offers;