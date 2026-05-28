const StatCard = ({ title, value, icon: Icon, color, growth }) => (
  <div
    className={`rounded-2xl p-5 min-h-[118px] border border-white/10 ${color}`}
  >
    <div className="flex justify-between">
      <div>
        <p className="text-slate-300 text-[13px] font-semibold">{title}</p>
        <h2 className="text-[27px] font-black mt-4">{value}</h2>
        <p className="text-emerald-400 text-[11px] font-bold mt-2">
          ↑ {growth}
        </p>
      </div>
      <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-[#ff7a00]">
        <Icon size={20} />
      </div>
    </div>
  </div>
);

export default StatCard;