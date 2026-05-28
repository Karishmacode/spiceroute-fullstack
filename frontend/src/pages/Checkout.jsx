import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, CreditCard, User, Phone } from "lucide-react";

import Navbar from "../components/layout/Navbar";

const Checkout = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const getPrice = (price) => {
    if (typeof price === "number") return price;
    return Number(String(price).replace("₹", ""));
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + getPrice(item.price) * item.quantity,
    0
  );

  const hasFreeDelivery = cartItems.some((item) => item.deliveryFree);
  const deliveryFee = subtotal > 0 && !hasFreeDelivery ? 40 : 0;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = async () => {
    if (!customerName.trim()) {
      alert("Please enter your name");
      return;
    }

    if (!phone.trim()) {
      alert("Please enter phone number");
      return;
    }

    if (phone.length !== 10) {
      alert("Phone number must be 10 digits");
      return;
    }

    if (!address.trim()) {
      alert("Please enter delivery address");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    let paymentStatus = "Pending";

    if (paymentMethod === "ONLINE") {
      const confirmPayment = window.confirm(
        `Demo Razorpay Payment\n\nPay ₹${total} online?`
      );

      if (!confirmPayment) return;

      alert("Payment successful ✅");
      paymentStatus = "Paid";
    }

    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName,
          phone,
          items: cartItems.map((item) => ({
            name: item.name,
            image: item.image,
            price: getPrice(item.price),
            quantity: item.quantity,
          })),
          address,
          total,
          paymentMethod,
          paymentStatus,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Order failed");
        return;
      }

      localStorage.setItem("latestOrderId", data._id);
      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("cartUpdated"));

      alert(
        paymentMethod === "ONLINE"
          ? "Paid order placed successfully!"
          : "Order placed successfully!"
      );

      navigate("/orders");
    } catch (error) {
      console.log(error);
      alert("Something went wrong while placing order");
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <Navbar />

      <main className="pt-24 px-4 lg:px-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold">Checkout</h1>

        <p className="text-slate-400 mt-2">
          Add your details and confirm your order.
        </p>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
          <div className="space-y-5">
            <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
              <div className="flex items-center gap-3">
                <User className="text-[#ff7a00]" />
                <h2 className="text-xl font-extrabold">Customer Details</h2>
              </div>

              <input
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter your name"
                className="mt-5 w-full rounded-2xl bg-[#111827] border border-white/10 px-4 py-3 text-white outline-none focus:border-[#ff7a00]"
              />

              <div className="relative mt-3">
                <Phone
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                  }
                  placeholder="Enter phone number"
                  className="w-full rounded-2xl bg-[#111827] border border-white/10 pl-11 pr-4 py-3 text-white outline-none focus:border-[#ff7a00]"
                />
              </div>
            </div>

            <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
              <div className="flex items-center gap-3">
                <MapPin className="text-[#ff7a00]" />
                <h2 className="text-xl font-extrabold">Delivery Address</h2>
              </div>

              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your full delivery address..."
                className="mt-5 w-full min-h-32 rounded-2xl bg-[#111827] border border-white/10 px-4 py-3 text-white outline-none focus:border-[#ff7a00] resize-none"
              />
            </div>

            <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
              <div className="flex items-center gap-3">
                <CreditCard className="text-[#ff7a00]" />
                <h2 className="text-xl font-extrabold">Payment Method</h2>
              </div>

              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("COD")}
                  className={`text-left rounded-2xl border p-4 transition ${
                    paymentMethod === "COD"
                      ? "border-[#ff7a00] bg-[#ff7a00]/10"
                      : "border-white/10 bg-[#111827]"
                  }`}
                >
                  <p className="font-bold">Cash on Delivery</p>
                  <p className="text-sm text-slate-400 mt-1">
                    Pay when your food arrives.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("ONLINE")}
                  className={`text-left rounded-2xl border p-4 transition ${
                    paymentMethod === "ONLINE"
                      ? "border-[#ff7a00] bg-[#ff7a00]/10"
                      : "border-white/10 bg-[#111827]"
                  }`}
                >
                  <p className="font-bold">Pay Online</p>
                  <p className="text-sm text-slate-400 mt-1">
                    Demo Razorpay payment.
                  </p>
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-6 h-fit">
            <h2 className="text-xl font-extrabold">Order Summary</h2>

            <div className="mt-5 space-y-4">
              {cartItems.map((item) => (
                <div key={item.name} className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-14 w-14 rounded-xl object-cover"
                  />

                  <div className="flex-1">
                    <p className="font-bold text-sm">{item.name}</p>
                    <p className="text-xs text-slate-400">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="font-bold text-yellow-400">
                    ₹{getPrice(item.price) * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-white/10 space-y-3 text-sm">
              <div className="flex justify-between text-slate-300">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between text-slate-300">
                <span>Delivery Fee</span>
                <span
                  className={
                    hasFreeDelivery ? "text-emerald-400 font-bold" : ""
                  }
                >
                  {hasFreeDelivery ? "FREE" : `₹${deliveryFee}`}
                </span>
              </div>

              <div className="flex justify-between text-slate-300">
                <span>Payment</span>
                <span>{paymentMethod === "COD" ? "Cash" : "Online"}</span>
              </div>

              <div className="flex justify-between text-lg font-extrabold pt-3 border-t border-white/10">
                <span>Total</span>
                <span className="text-[#ff7a00]">₹{total}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="mt-6 w-full bg-[#ff7a00] hover:bg-[#ff9129] py-3 rounded-2xl font-bold transition"
            >
              {paymentMethod === "ONLINE" ? `Pay ₹${total}` : "Place Order"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;