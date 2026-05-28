import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";

import Navbar from "../components/layout/Navbar";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  const getPrice = (price) => {
    if (typeof price === "number") return price;
    return Number(String(price).replace("₹", ""));
  };

  const updateCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const increaseQuantity = (name) => {
    const updatedCart = cartItems.map((item) =>
      item.name === name ? { ...item, quantity: item.quantity + 1 } : item
    );

    updateCart(updatedCart);
  };

  const decreaseQuantity = (name) => {
    const updatedCart = cartItems
      .map((item) =>
        item.name === name ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);

    updateCart(updatedCart);
  };

  const removeItem = (name) => {
    const updatedCart = cartItems.filter((item) => item.name !== name);
    updateCart(updatedCart);
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + getPrice(item.price) * item.quantity,
    0
  );

  const hasFreeDelivery = cartItems.some((item) => item.deliveryFree);

  const deliveryFee = subtotal > 0 && !hasFreeDelivery ? 40 : 0;

  const total = subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <Navbar />
      

      <main className="pt-24 px-4 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold">Your Cart</h1>

        <p className="text-slate-400 mt-2">Review your selected food items.</p>

        {cartItems.length === 0 ? (
          <div className="mt-8 rounded-3xl bg-white/5 border border-white/10 p-10 text-center">
            <p className="text-slate-300 text-lg">Your cart is empty 🍽️</p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6">
            <div className="space-y-4">
              {cartItems.map((item) => {
                const itemPrice = getPrice(item.price);
                const oldPrice = item.oldPrice ? getPrice(item.oldPrice) : null;

                return (
                  <div
                    key={item.name}
                    className="rounded-3xl bg-white/5 border border-white/10 p-4 flex gap-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-28 w-28 rounded-2xl object-cover"
                    />

                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h2 className="text-lg font-extrabold">{item.name}</h2>

                          <p className="text-slate-400 text-sm mt-1">
                            {item.desc}
                          </p>

                          {item.discountText && (
                            <p className="mt-2 text-xs text-emerald-400 font-bold">
                              {item.discountText} applied
                            </p>
                          )}

                          {item.deliveryFree && (
                            <p className="mt-1 text-xs text-emerald-400 font-bold">
                              Free delivery applied
                            </p>
                          )}
                        </div>

                        <button
                          onClick={() => removeItem(item.name)}
                          className="text-red-400 hover:text-red-500"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <div className="mt-5 flex items-center justify-between">
                        <div>
                          <p className="text-xl font-extrabold text-yellow-400">
                            ₹{itemPrice * item.quantity}
                          </p>

                          {oldPrice && oldPrice > itemPrice && (
                            <p className="text-sm text-slate-500 line-through">
                              ₹{oldPrice * item.quantity}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => decreaseQuantity(item.name)}
                            className="h-9 w-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center"
                          >
                            <Minus size={16} />
                          </button>

                          <span className="font-bold text-lg w-5 text-center">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => increaseQuantity(item.name)}
                            className="h-9 w-9 rounded-xl bg-[#ff7a00] hover:bg-[#ff9129] flex items-center justify-center"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="rounded-3xl bg-white/5 border border-white/10 p-6 h-fit sticky top-24">
              <h2 className="text-xl font-extrabold">Order Summary</h2>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex items-center justify-between text-slate-300">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>

                <div className="flex items-center justify-between text-slate-300">
                  <span>Delivery Fee</span>
                  <span className={hasFreeDelivery ? "text-emerald-400 font-bold" : ""}>
                    {hasFreeDelivery ? "FREE" : `₹${deliveryFee}`}
                  </span>
                </div>

                <div className="border-t border-white/10 pt-4 flex items-center justify-between font-extrabold text-lg">
                  <span>Total</span>
                  <span className="text-[#ff7a00]">₹{total}</span>
                </div>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="mt-6 w-full bg-[#ff7a00] hover:bg-[#ff9129] py-3 rounded-2xl font-bold transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;