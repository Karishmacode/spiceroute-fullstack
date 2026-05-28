const PageHeader = ({ title, desc, buttonText, onClick }) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-black text-white">{title}</h1>
        <p className="text-sm text-slate-500 mt-1">{desc}</p>
      </div>

      {buttonText && (
        <button
          onClick={onClick}
          className="px-5 py-3 rounded-xl bg-[#ff7a00] text-white text-sm font-bold hover:bg-[#ff8c1f] transition"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default PageHeader;