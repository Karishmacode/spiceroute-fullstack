import { useEffect, useState } from "react";
import { User, Phone, MapPin, Bell } from "lucide-react";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

const Settings = () => {
  const user = JSON.parse(localStorage.getItem("user"));

const userName = user?.name || "Guest User";

const phoneNumber =
  localStorage.getItem("userPhone") ||
  user?.mobile ||
  user?.phone ||
  "Not available";

const selectedLocation =
  localStorage.getItem("selectedLocation") || "India";

 

  useEffect(() => {
    const loadUserPhone = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/orders");
        const data = await res.json();

        const orders = Array.isArray(data) ? data : [];

        const userOrder = orders.find(
          (order) =>
            order.customerName?.toLowerCase() === userName.toLowerCase()
        );

        if (userOrder?.phone) {
          setPhoneNumber(userOrder.phone.substring(0, 10));
        }
      } catch (error) {
        console.log("Phone fetch error:", error);
      }
    };

    if (user?.name) {
      loadUserPhone();
    }
  }, [userName]);

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <Navbar />
      <Sidebar />

      <main className="pt-24 xl:pl-64 px-4 lg:px-8 pb-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-extrabold">Settings</h1>
          <p className="text-slate-400 mt-2">
            Manage your profile and preferences.
          </p>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
            <div className="rounded-3xl bg-white/5 border border-white/10 p-6 text-center">
              <div className="h-24 w-24 mx-auto rounded-3xl bg-gradient-to-tr from-[#ff7a00] to-[#ff9129] flex items-center justify-center text-4xl font-extrabold shadow-lg shadow-orange-500/20">
                {user?.name ? user.name.charAt(0).toUpperCase() : <User size={36} />}
              </div>

              <h2 className="mt-4 text-xl font-extrabold">{userName}</h2>
              <p className="text-slate-400 text-sm mt-1">{phoneNumber}</p>
            </div>

            <div className="space-y-5">
              <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
                <h2 className="text-xl font-extrabold mb-5">Profile Info</h2>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 rounded-2xl bg-[#111827] border border-white/10 p-4">
                    <User className="text-[#ff7a00]" />
                    <div>
                      <p className="text-sm text-slate-400">Name</p>
                      <p className="font-bold">{userName}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 rounded-2xl bg-[#111827] border border-white/10 p-4">
                    <Phone className="text-[#ff7a00]" />
                    <div>
                      <p className="text-sm text-slate-400">Phone Number</p>
                      <p className="font-bold">{phoneNumber}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 rounded-2xl bg-[#111827] border border-white/10 p-4">
                    <MapPin className="text-[#ff7a00]" />
                    <div>
                      <p className="text-sm text-slate-400">Default Location</p>
                      <p className="font-bold">{selectedLocation}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
                <h2 className="text-xl font-extrabold mb-5">Preferences</h2>

                <div className="flex items-center gap-4 rounded-2xl bg-[#111827] border border-white/10 p-4">
                  <Bell className="text-[#ff7a00]" />
                  <div>
                    <p className="font-bold">Order Notifications</p>
                    <p className="text-sm text-slate-400">
                      Get updates for order status and delivery.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;