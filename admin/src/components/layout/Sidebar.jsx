import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "/logo.png";

import {
  LayoutDashboard,
  Store,
  Utensils,
  Tags,
  BadgePercent,
  ClipboardList,
  Users,
  Settings,
  LogOut,
  Star,
  Image,
  X,
  ChevronDown,
  ExternalLink,
} from "lucide-react";

const items = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { name: "Restaurants", icon: Store, path: "/restaurants" },
  { name: "Foods", icon: Utensils, path: "/foods" },
  { name: "Categories", icon: Tags, path: "/categories" },
  { name: "Offers", icon: BadgePercent, path: "/offers" },
  { name: "Orders", icon: ClipboardList, path: "/orders" },
  { name: "Users", icon: Users, path: "/users" },
  { name: "Reviews", icon: Star, path: "/reviews" },
  { name: "Banners", icon: Image, path: "/banners" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);

  return (
   <aside
  className={`admin-sidebar fixed left-0 top-0 bottom-0 
  w-[230px]
  bg-[#070b14]/95
  backdrop-blur-xl
  border-r border-white/10
  p-3
  flex flex-col
  z-50
  transition-all duration-300
  shadow-[0_0_35px_rgba(0,0,0,0.25)]
  ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
  lg:translate-x-0`}
>
      <div className="flex items-center justify-between gap-3 px-1 py-2 shrink-0">
        <Link
          to="/"
          onClick={() => setSidebarOpen(false)}
          className="flex items-center gap-2 min-w-0"
        >
          <div className="h-10 w-10 rounded-2xl flex items-center justify-center shadow-lg shrink-0">
            <img
              src={logo}
              alt="SpiceRoute Logo"
              className="w-8 h-8 object-contain"
            />
          </div>

          <h1 className="text-[20px] font-black tracking-tight text-white truncate">
            <span className="text-[#ff7a00]">Spice</span>Route
          </h1>
        </Link>

        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center"
        >
          <X size={17} />
        </button>
      </div>

      <div className="relative mt-5">
        <button
          onClick={() => setAdminMenuOpen(!adminMenuOpen)}
          className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-2.5 flex items-center justify-between text-sm text-slate-200"
        >
          <span>Admin</span>
          <ChevronDown
            size={16}
            className={`transition-transform ${
              adminMenuOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {adminMenuOpen && (
          <div className="absolute left-0 top-[110%] w-full rounded-xl border border-white/10 bg-[#111827] overflow-hidden shadow-xl z-50">
            <a
              href={import.meta.env.VITE_SPICEROUTE_USER_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                setAdminMenuOpen(false);
                setSidebarOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-3 text-sm text-slate-300 hover:bg-white/[0.04]"
            >
              <ExternalLink size={15} />
              Main Website
            </a>
          </div>
        )}
      </div>

      <nav className="mt-4 space-y-1.5 flex-1 overflow-y-auto pr-1">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-bold transition border ${
                  isActive
                    ? "bg-[#ff7a00]/15 border-[#ff7a00]/35 text-[#ff7a00]"
                    : "text-slate-300 hover:bg-white/[0.04] hover:text-white border-transparent"
                }`
              }
            >
              <Icon size={17} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

   <button
  onClick={() => {
    localStorage.removeItem("adminToken");
    window.location.href =
      import.meta.env.VITE_SPICEROUTE_USER_URL;
  }}
  className="flex items-center gap-3 text-slate-300 hover:text-white px-4 py-2.5 text-sm"
>
  <LogOut size={17} />
  Logout
</button>

      <div className="mt-3 rounded-2xl bg-white/[0.04] border border-white/10 p-3 flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-[#ff7a00] flex items-center justify-center font-black">
          A
        </div>

        <div className="min-w-0">
          <p className="font-bold text-sm">Admin</p>
          <p className="text-[11px] text-slate-400 truncate">
            admin@spiceroute.com
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
