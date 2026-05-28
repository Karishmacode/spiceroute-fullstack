import { Gift } from "lucide-react";
import { Link } from "react-router-dom";
import { sidebarItems, accountItems } from "../data/foodData";


const NavItem = ({ item }) => {
  const Icon = item.icon;

  return (
    <Link
      to={item.path}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all
        ${
          item.active
            ? "bg-[#ff7a00]/15 text-[#ff7a00] border border-[#ff7a00]/40 shadow-glow"
            : "text-slate-300 hover:bg-white/5 hover:text-white border border-transparent"
        }`}
    >
      <Icon size={19} />
      {item.name}
    </Link>
  );
};

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-[#070b14]/95 border-r border-white/10 hidden xl:flex flex-col z-40">
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
        <div className="space-y-1">
          {sidebarItems.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}
        </div>

        <div className="h-px bg-white/5 mx-2" />

        <div className="space-y-1">
          {accountItems.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}
        </div>
      </div>

      <div className="p-4 mt-auto">
        <div className="rounded-3xl p-5 border border-[#ff7a00]/25 bg-gradient-to-br from-[#ff7a00]/15 to-transparent relative overflow-hidden group">
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#ff7a00]/10 blur-3xl rounded-full" />

          <Gift className="text-[#ff7a00] mb-3" size={24} />

          <h3 className="font-bold text-white">Invite & Earn</h3>

          <p className="mt-1 text-xs text-slate-400 leading-relaxed">
            Invite your friends and earn up to ₹200 SpiceCash!
          </p>

          <Link
            to="/invite"
            className="mt-4 w-full py-2.5 rounded-xl bg-[#ff7a00] text-sm font-bold hover:bg-[#ff9129] transition-all transform active:scale-95 flex items-center justify-center"
          >
            Invite Now
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
