import { Search, Bell, Menu } from "lucide-react";
import logo from "/logo.png";

const Topbar = () => {
  return (
    <div className="flex items-center gap-3 text-[#ff7a00] font-black">
        <span className="text-sm">
           <img src={logo} alt="Logo" className="h-8 w-8 object-contain" />
        </span>
        <span className="text-sm">SpiceRoute</span>
        <Menu size={15} className="text-slate-300" />
      </div>
  );
};

export default Topbar;