import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Clock,
  CheckCircle,
  PackageCheck,
  ChefHat,
  Bike,
  Home,
} from "lucide-react";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

const steps = [
  { label: "Order Placed", time: "0-10 min", icon: PackageCheck },
  { label: "Preparing", time: "10-20 min", icon: ChefHat },
  { label: "Out for Delivery", time: "20-30 min", icon: Bike },
  { label: "Delivered", time: "30+ min", icon: Home },
];

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const [reviewData, setReviewData] = useState({
    orderId: null,
    rating: 5,
    comment: "",
  });

  const fetchOrders = () => {
    fetch("http://localhost:5000/api/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.log(error);
        setOrders([]);
      });
  };

  useEffect(() => {
    fetchOrders();

    const interval = setInterval(fetchOrders, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmitReview = async (order) => {
    if (!reviewData.comment.trim()) {
      alert("Please write your review");
      return;
    }

    try {
      await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: order._id,
          customerName: order.customerName || "Guest User",
          foodName: order.items?.[0]?.name || "Food Order",
          rating: reviewData.rating,
          comment: reviewData.comment,
        }),
      });

      alert("Review submitted successfully");

      setReviewData({
        orderId: null,
        rating: 5,
        comment: "",
      });
    } catch (error) {
      console.log("Review submit error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <Navbar />
      <Sidebar />

      <main className="pt-24 xl:pl-64 px-4 lg:px-8 pb-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-extrabold">Track Order</h1>

          <p className="text-slate-400 mt-2">
            Your order status updates when admin changes it.
          </p>

          {orders.length === 0 ? (
            <div className="mt-8 rounded-3xl bg-white/5 border border-white/10 p-10 text-center">
              <p className="text-5xl mb-4">🍽️</p>

              <h2 className="text-2xl font-extrabold">No active orders yet</h2>

              <p className="text-slate-400 mt-2">
                Order something delicious and track it here.
              </p>

              <Link
                to="/"
                className="inline-block mt-6 px-6 py-3 rounded-2xl bg-[#ff7a00] hover:bg-[#ff9129] font-bold transition"
              >
                Browse Food
              </Link>
            </div>
          ) : (
            <div className="mt-8 space-y-6">
              {orders.map((order) => {
                const currentStatus = order.status || "Order Placed";

                const activeIndex = steps.findIndex(
                  (step) => step.label === currentStatus
                );

                return (
                  <div
                    key={order._id}
                    className="rounded-3xl bg-white/5 border border-white/10 p-6"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-white/10 pb-5">
                      <div>
                        <h2 className="text-xl font-extrabold">
                          Order #{order._id?.slice(-6)}
                        </h2>

                        <p className="text-slate-400 text-sm mt-1 flex items-center gap-2">
                          <Clock size={15} />
                          {new Date(order.createdAt).toLocaleString()}
                        </p>
                      </div>

                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#ff7a00]/10 text-[#ff7a00] font-bold text-sm border border-[#ff7a00]/30">
                        <CheckCircle size={16} />
                        {currentStatus}
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
                      <div className="space-y-4">
                        {order.items?.map((item) => (
                          <div
                            key={item.name}
                            className="flex items-center gap-4 rounded-2xl bg-[#111827] border border-white/10 p-3"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-20 w-20 rounded-xl object-cover"
                            />

                            <div className="flex-1">
                              <h3 className="font-bold">{item.name}</h3>
                              <p className="text-sm text-slate-400">
                                Qty: {item.quantity}
                              </p>
                            </div>

                            <p className="font-extrabold text-yellow-400">
                              ₹{item.price * item.quantity}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="rounded-2xl bg-[#111827] border border-white/10 p-4 h-fit">
                        <h3 className="font-extrabold mb-3">
                          Delivery Details
                        </h3>

                        <div className="space-y-2 text-sm">
                          <p className="text-slate-300 font-bold">
                            {order.customerName || "Guest User"}
                          </p>

                          <p className="text-slate-400">
                            Phone:{" "}
                            {order.phone ? order.phone.substring(0, 10) : "N/A"}
                          </p>

                          <p className="flex items-start gap-2 text-slate-400">
                            <MapPin
                              size={16}
                              className="text-[#ff7a00] mt-0.5 shrink-0"
                            />
                            <span>{order.address}</span>
                          </p>
                        </div>

                        <div className="mt-5 pt-4 border-t border-white/10 flex justify-between font-extrabold">
                          <span>Total</span>
                          <span className="text-[#ff7a00]">₹{order.total}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-7">
                      <h3 className="font-extrabold mb-4">Order Timeline</h3>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        {steps.map((step, index) => {
                          const Icon = step.icon;
                          const active = index <= activeIndex;

                          return (
                            <div
                              key={step.label}
                              className={`rounded-2xl border p-4 text-center transition-all ${
                                active
                                  ? "bg-[#ff7a00]/10 border-[#ff7a00]/40 text-[#ff7a00]"
                                  : "bg-white/5 border-white/10 text-slate-400"
                              }`}
                            >
                              <div
                                className={`mx-auto h-10 w-10 rounded-full flex items-center justify-center mb-3 ${
                                  active
                                    ? "bg-[#ff7a00] text-white"
                                    : "bg-white/10 text-slate-400"
                                }`}
                              >
                                <Icon size={19} />
                              </div>

                              <p className="font-extrabold text-sm">
                                {step.label}
                              </p>

                              <p className="text-xs mt-1 opacity-80">
                                {step.time}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {currentStatus === "Delivered" && (
                      <div className="mt-6 rounded-3xl bg-[#111827] border border-white/10 p-5">
                        <h2 className="text-xl font-extrabold mb-2">
                          Write Review
                        </h2>

                        <p className="text-sm text-slate-400 mb-4">
                          Share your experience about the food.
                        </p>

                        <select
                          value={reviewData.rating}
                          onChange={(e) =>
                            setReviewData({
                              ...reviewData,
                              orderId: order._id,
                              rating: Number(e.target.value),
                            })
                          }
                          className="w-full p-3 rounded-xl bg-white/5 border border-white/10 mb-3 outline-none"
                        >
                          <option value={5}>⭐⭐⭐⭐⭐ 5 Stars</option>
                          <option value={4}>⭐⭐⭐⭐ 4 Stars</option>
                          <option value={3}>⭐⭐⭐ 3 Stars</option>
                          <option value={2}>⭐⭐ 2 Stars</option>
                          <option value={1}>⭐ 1 Star</option>
                        </select>

                        <textarea
                          value={
                            reviewData.orderId === order._id
                              ? reviewData.comment
                              : ""
                          }
                          onChange={(e) =>
                            setReviewData({
                              ...reviewData,
                              orderId: order._id,
                              comment: e.target.value,
                            })
                          }
                          placeholder="Write your review..."
                          className="w-full min-h-[120px] p-3 rounded-xl bg-white/5 border border-white/10 resize-none outline-none"
                        />

                        <button
                          onClick={() => handleSubmitReview(order)}
                          className="mt-4 w-full py-3 rounded-xl bg-[#ff7a00] hover:bg-[#ff9129] font-bold"
                        >
                          Submit Review
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Orders;