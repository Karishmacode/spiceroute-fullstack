const PageHero = ({ icon: Icon, label, title, description }) => {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-[#ff7a00]/25 bg-gradient-to-br from-[#ff7a00]/20 via-white/5 to-[#050816] p-8 md:p-12 min-h-[280px] flex items-center">
      <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-[#ff7a00]/10 blur-3xl" />

      <div className="relative z-10">
        {Icon && (
          <div className="h-14 w-14 rounded-2xl bg-[#ff7a00]/15 flex items-center justify-center mb-6">
            <Icon className="text-[#ff7a00]" size={30} />
          </div>
        )}

        {label && <p className="text-[#ff7a00] font-bold mb-3">{label}</p>}

        <h1 className="text-4xl md:text-6xl font-black leading-tight">
          {title}
        </h1>

        <p className="mt-5 max-w-3xl text-slate-300 leading-relaxed">
          {description}
        </p>
      </div>
    </section>
  );
};

export default PageHero;