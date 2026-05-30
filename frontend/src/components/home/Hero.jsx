import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Clock, ShieldCheck, Star, Flame } from "lucide-react";

const Hero = () => {
  const [hero, setHero] = useState(null);
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    fetch("https://spiceroute-fullstack.onrender.com/api/hero")
      .then((res) => res.json())
      .then((data) => setHero(data))
      .catch((error) => console.log(error));

    fetch("https://spiceroute-fullstack.onrender.com/api/banners")
      .then((res) => res.json())
      .then((data) => {
        const activeHeroBanner = data.find(
          (item) =>
            item.placement === "Home Hero" && item.status === "Active"
        );

        setBanner(activeHeroBanner || null);
      })
      .catch((error) => console.log(error));
  }, []);

  const heroData = {
    badge: banner?.discount || hero?.badge || "Fast Delivery",
    title: banner?.title || hero?.title || "Fresh Food",
    highlight: hero?.highlight || "Fast Delivery",
    desc:
      banner?.subtitle ||
      hero?.desc ||
      "Order your favorite meals from top restaurants near you.",
    image: banner?.image || hero?.image,
  };

  return (
    <section className="relative overflow-hidden rounded-3xl card-bg h-[580px] orange-glow">
      {heroData?.image && (
        <img
          src={heroData.image}
          alt={heroData.title}
          className="absolute right-0 top-0 h-full w-[58%] object-cover hidden md:block"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-[#091326] via-[#091326]/95 to-[#091326]/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,rgba(255,122,0,0.22),transparent_35%)]" />

      <div className="relative z-10 p-8 md:p-10 lg:p-12 max-w-[620px]">
        <span className="inline-flex items-center gap-2 rounded-full bg-[#ff7a00]/15 border border-[#ff7a00]/35 px-4 py-2 text-[#ff9a3d] text-sm font-bold">
          <Flame size={16} className="text-[#ff7a00] fill-[#ff7a00]" />
          {heroData.badge}
        </span>

        <h2 className="mt-7 text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-white">
          {heroData.title}
          <span className="block text-[#ff7a00]">{heroData.highlight}</span>
        </h2>

        <p className="mt-5 text-slate-300 max-w-lg leading-relaxed">
          {heroData.desc}
        </p>

        <div className="mt-7 flex flex-wrap gap-5 text-white">
          <div className="flex items-center gap-3">
            <Clock className="text-[#ff7a00]" />
            <div>
              <p className="font-bold">30-40 min</p>
              <p className="text-xs text-slate-400">Delivery</p>
            </div>
          </div>

          <div className="h-10 w-px bg-white/10" />

          <div className="flex items-center gap-3">
            <ShieldCheck className="text-emerald-400" />
            <div>
              <p className="font-bold">Fresh</p>
              <p className="text-xs text-slate-400">& Hygienic</p>
            </div>
          </div>

          <div className="h-10 w-px bg-white/10" />

          <div className="flex items-center gap-3">
            <Star className="text-yellow-400 fill-yellow-400" />
            <div>
              <p className="font-bold">4.5+</p>
              <p className="text-xs text-slate-400">Average Rating</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/menu?title=Popular Dishes"
            className="px-8 py-4 rounded-2xl bg-[#ff7a00] hover:bg-[#ff9129] text-white font-extrabold transition"
          >
            Order Now →
          </Link>

          <Link
            to="/restaurants"
            className="px-8 py-4 rounded-2xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold transition"
          >
            Explore Restaurants
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;