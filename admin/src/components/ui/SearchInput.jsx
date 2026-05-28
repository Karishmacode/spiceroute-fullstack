import { Search } from "lucide-react";

const SearchInput = ({ placeholder, value, onChange }) => {
  return (
    <div className="relative">
      <Search
        size={16}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
      />

      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full h-11 rounded-xl bg-[#0b1220] border border-white/10 pl-11 pr-4 outline-none text-sm text-slate-300 focus:border-[#ff7a00]/50"
      />
    </div>
  );
};

export default SearchInput;