import { Sparkles, Utensils, Truck, ShieldCheck } from "lucide-react";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import PageHero from "../components/common/PageHero";

const About = () => {
  const features = [
    {
      icon: Utensils,
      title: "Fresh Food",
      desc: "Explore delicious meals from popular restaurants near you.",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      desc: "Get your favourite food delivered quickly and safely.",
    },
    {
      icon: ShieldCheck,
      title: "Trusted Service",
      desc: "Simple ordering, reliable support, and smooth checkout.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 px-4 lg:px-8 pb-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <PageHero
            icon={Sparkles}
            label="About SpiceRoute"
            title="Good food, delivered with care."
            description="SpiceRoute is a modern food delivery platform designed to help users discover restaurants, explore delicious meals, grab offers, and order food easily from one place."
          />

          <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {features.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-3xl bg-white/5 border border-white/10 p-6 hover:border-[#ff7a00]/40 transition"
                >
                  <Icon className="text-[#ff7a00]" size={32} />

                  <h2 className="mt-5 text-xl font-extrabold">
                    {item.title}
                  </h2>

                  <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </section>

          <section className="rounded-3xl bg-white/5 border border-white/10 p-8">
            <h2 className="text-2xl font-extrabold">Our Mission</h2>

            <p className="mt-4 text-slate-300 leading-relaxed">
              Our mission is to make food ordering simple, enjoyable, and
              affordable. We focus on clean design, easy navigation, attractive
              offers, and a smooth cart-to-checkout experience.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;