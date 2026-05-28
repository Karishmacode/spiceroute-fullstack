import { Search, Bell, Menu } from "lucide-react";
import logo from "/logo.png";

const MiniTopbar = ({ onMenuClick }) => {
  return (
    <div className="lg:hidden h-14 px-4 flex items-center justify-between border-b border-white/10 bg-[#070b14]/95 sticky top-0 z-40">
      <div className="flex items-center gap-3 text-[#ff7a00] font-black">
        <img src={logo} alt="Logo" className="h-8 w-8 object-contain" />
        <span className="text-sm">SpiceRoute</span>
      </div>

      <div className="flex items-center gap-3">
        <Search size={16} className="text-slate-400" />

        <div className="relative">
          <Bell size={16} className="text-slate-400" />
          <span className="absolute -top-1 -right-1 h-2 w-2 bg-[#ff7a00] rounded-full" />
        </div>

        <button
          onClick={onMenuClick}
          className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center"
        >
          <Menu size={17} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default MiniTopbar;