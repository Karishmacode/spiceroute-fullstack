import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import PageHero from "../components/common/PageHero";

const Contact = () => {
  const contactCards = [
    {
      icon: Mail,
      title: "Email Support",
      value: "support@spiceroute.com",
    },
    {
      icon: Phone,
      title: "Call Support",
      value: "+91 98765 43210",
    },
    {
      icon: MapPin,
      title: "Office Location",
      value: "Patna, Bihar, India",
    },
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 px-4 lg:px-8 pb-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <PageHero
            icon={MessageCircle}
            label="Contact SpiceRoute"
            title="We’re here to help."
            description="Have questions or need support? Reach out to us for order help, refunds, delivery support, or general enquiries."
          />

          <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {contactCards.map((card) => {
              const Icon = card.icon;

              return (
                <div
                  key={card.title}
                  className="rounded-3xl bg-white/5 border border-white/10 p-6 hover:border-[#ff7a00]/40 transition"
                >
                  <Icon className="text-[#ff7a00]" size={32} />

                  <h2 className="mt-5 text-xl font-extrabold">
                    {card.title}
                  </h2>

                  <p className="mt-3 text-slate-400">
                    {card.value}
                  </p>
                </div>
              );
            })}
          </section>

          <section className="rounded-3xl bg-white/5 border border-white/10 p-8">
            <h2 className="text-2xl font-extrabold">Send us a message</h2>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                placeholder="Your name"
                className="rounded-2xl bg-[#0f172a] border border-white/10 px-5 py-4 outline-none focus:border-[#ff7a00]"
              />

              <input
                placeholder="Your email"
                className="rounded-2xl bg-[#0f172a] border border-white/10 px-5 py-4 outline-none focus:border-[#ff7a00]"
              />

              <textarea
                placeholder="Write your message..."
                className="md:col-span-2 min-h-[140px] rounded-2xl bg-[#0f172a] border border-white/10 px-5 py-4 outline-none focus:border-[#ff7a00]"
              />

              <button className="md:col-span-2 rounded-2xl bg-[#ff7a00] hover:bg-[#ff9129] py-4 font-bold transition">
                Submit Message
              </button>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;