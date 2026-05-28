


import { useEffect, useState } from "react";
import {
  MapPin,
  Search,
  SlidersHorizontal,
  ShoppingCart,
  ChevronDown,
  User,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import LocationModal from "../location/LocationModal";

const Navbar = () => {
  const navigate = useNavigate();

  const [cartCount, setCartCount] = useState(0);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(
    localStorage.getItem("selectedLocation") || "Patna, India"
  );

  const user = JSON.parse(localStorage.getItem("user"));
  const firstLetter = user?.name?.charAt(0).toUpperCase();

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
  };

  useEffect(() => {
    updateCartCount();

    window.addEventListener("storage", updateCartCount);
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  const handleCartClick = () => {
    if (!user) {
      navigate("/auth", { state: { from: "/cart" } });
      return;
    }

    navigate("/cart");
  };

const handleLogout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");

  navigate("/");
  window.location.reload();
};

  const handleSearch = (e) => {
    const value = e.target.value;

    if (value.trim()) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#070b14]/80 backdrop-blur-xl border-b border-white/5">
        <div className="h-full px-4 lg:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-3 min-w-max cursor-pointer group"
            >
              <div className="transition-transform group-hover:scale-110">
                <img
                  src="/logo.png"
                  alt="SpiceRoute"
                  className="h-10 w-10 object-contain"
                />
              </div>

              <h1 className="text-xl font-extrabold tracking-tight">
                <span className="text-[#ff7a00]">Spice</span>Route
              </h1>
            </Link>

            <button
              onClick={() => setIsLocationOpen(true)}
              className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[13px] font-medium text-slate-300 hover:bg-white/10 transition-colors max-w-[180px]"
            >
              <MapPin size={16} className="text-[#ff7a00] shrink-0" />
              <span className="truncate">{selectedLocation}</span>
              <ChevronDown size={14} className="opacity-50 shrink-0" />
            </button>
          </div>

          <div className="flex-1 max-w-lg hidden md:flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus-within:border-[#ff7a00]/50 transition-all">
            <Search size={18} className="text-slate-500" />

            <input
              onChange={handleSearch}
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-slate-500 text-slate-200"
              placeholder="Search for restaurants, cuisines or dishes..."
            />

            <button className="p-1 hover:bg-white/10 rounded-lg transition-colors">
              <SlidersHorizontal size={17} className="text-slate-400" />
            </button>
          </div>

          <div className="flex items-center gap-4 lg:gap-8">
            <nav className="hidden lg:flex items-center gap-6 text-[13px] font-semibold text-slate-400">
              <Link className="hover:text-white transition-colors" to="/offers">
                Offers
              </Link>

              <Link className="hover:text-white transition-colors" to="/orders">
                Track Order
              </Link>

              <Link className="hover:text-white transition-colors" to="/help">
                Help
              </Link>
            </nav>

            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
              <button
                onClick={handleCartClick}
                className="relative p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
              >
                <ShoppingCart
                  size={20}
                  className="text-slate-300 group-hover:text-white"
                />

                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 h-5 min-w-5 px-1 rounded-full bg-[#ff7a00] text-[10px] font-bold flex items-center justify-center border-2 border-[#070b14] shadow-lg">
                    {cartCount}
                  </span>
                )}
              </button>

              <div className="relative group">
                <button className="flex items-center gap-2.5 p-0.5 pr-2 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10">
                  <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-[#ff7a00] to-[#ff9129] flex items-center justify-center font-bold text-white shadow-lg shadow-orange-500/20">
                    {user ? firstLetter : <User size={18} />}
                  </div>

                  <ChevronDown
                    size={14}
                    className="text-slate-500 hidden sm:block"
                  />
                </button>

                <div className="absolute right-0 top-12 w-48 rounded-2xl bg-[#0b1220] border border-white/10 shadow-xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  {user ? (
                    <>
                      <p className="px-3 py-2 text-sm font-bold text-white border-b border-white/10">
                        {user.name}
                      </p>

                      <Link
                        to="/orders"
                        className="block px-3 py-2 text-sm text-slate-300 hover:bg-white/5 rounded-xl"
                      >
                        My Orders
                      </Link>

                      <Link
                        to="/settings"
                        className="block px-3 py-2 text-sm text-slate-300 hover:bg-white/5 rounded-xl"
                      >
                        Settings
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-xl"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/auth"
                      className="block px-3 py-2 text-sm text-slate-300 hover:bg-white/5 rounded-xl"
                    >
                      Login
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <LocationModal
        isOpen={isLocationOpen}
        onClose={() => setIsLocationOpen(false)}
        onSave={(location) => setSelectedLocation(location)}
      />
    </>
  );
};

export default Navbar;
