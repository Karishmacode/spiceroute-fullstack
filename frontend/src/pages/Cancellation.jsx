import { Ban } from "lucide-react";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import PageHero from "../components/common/PageHero";

const Cancellation = () => {
  return (
    <div className="min-h-screen bg-[#050816] text-white flex flex-col">
      <Navbar />
  

      <main className="flex-1 pt-24 xl:pl-64 px-4 lg:px-8 pb-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <PageHero
            icon={Ban}
            label="Support"
            title="Cancellation Policy"
            description="Learn how order cancellation and refund processing work on SpiceRoute."
          />

          <section className="rounded-3xl bg-white/5 border border-white/10 p-8 space-y-8">
            <div>
              <h2 className="text-2xl font-extrabold">
                Order Cancellation
              </h2>

              <p className="mt-3 text-slate-300 leading-relaxed">
                Orders can only be cancelled before restaurant preparation
                begins. Once preparation starts, cancellation may not be
                possible.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-extrabold">
                Refund Processing
              </h2>

              <p className="mt-3 text-slate-300 leading-relaxed">
                Refunds for cancelled or failed orders are usually processed
                within 3–7 business days.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-extrabold">
                Failed Payments
              </h2>

              <p className="mt-3 text-slate-300 leading-relaxed">
                If payment fails but money is deducted, the amount will be
                automatically refunded to your original payment method.
              </p>
            </div>

            <button className="px-6 py-3 rounded-2xl bg-[#ff7a00] hover:bg-[#ff9129] font-bold transition">
              Contact Support
            </button>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cancellation;