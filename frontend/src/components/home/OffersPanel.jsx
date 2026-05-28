import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flame } from "lucide-react";

const OffersPanel = () => {
  const navigate = useNavigate();

  const [offers, setOffers] = useState([]);
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/offers")
      .then((res) => res.json())
      .then((data) => {
        setOffers(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.log(error);
        setOffers([]);
      });

    fetch("http://localhost:5000/api/foods")
      .then((res) => res.json())
      .then((data) => {
        setDishes(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.log(error);
        setDishes([]);
      });
  }, []);

  const handleOfferOrder = (offer) => {
    const dish = dishes.find((item) => item.name === offer.productName);

    if (!dish) {
      navigate("/offers");
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
    <aside className="grid md:grid-cols-3 xl:grid-cols-1 gap-3 xl:h-[390px]">
      {offers.map((offer) => (
        <div
          key={offer._id || offer.title}
          className="card-bg rounded-3xl p-4 relative overflow-hidden h-[180px] border border-white/10 hover:border-[#ff7a00]/30 transition-all"
        >
          <img
            src={offer.image}
            alt={offer.name}
            className="absolute right-3 bottom-3 w-20 h-20 object-cover rounded-2xl shadow-2xl"
          />

          <div className="relative z-10 max-w-[68%]">
            <p className="text-[#ff7a00] font-bold text-xs flex items-center gap-1.5">
              <Flame size={13} className="fill-[#ff7a00] text-[#ff7a00]" />
              {offer.title}
            </p>

            <h3 className="mt-2 font-extrabold text-base leading-snug">
              {offer.name}
            </h3>

            {offer.badge && (
              <span className="inline-block mt-2 rounded-xl bg-emerald-500/15 text-emerald-400 px-2.5 py-0.5 text-[10px] font-bold">
                {offer.badge}
              </span>
            )}

            <div className="mt-2">
              <p className="font-extrabold text-sm">{offer.price}</p>

              {offer.old && (
                <span className="text-slate-500 line-through text-xs">
                  {offer.old}
                </span>
              )}
            </div>

            <button
              onClick={() => handleOfferOrder(offer)}
              className="inline-flex items-center mt-2 text-[#ff7a00] hover:text-[#ff9129] text-xs font-bold transition"
            >
              Order Now →
            </button>
          </div>
        </div>
      ))}
    </aside>
  );
};

export default OffersPanel;