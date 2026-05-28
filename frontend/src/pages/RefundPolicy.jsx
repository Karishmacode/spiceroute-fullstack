import { Wallet } from "lucide-react";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import PageHero from "../components/common/PageHero";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-[#050816] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 px-4 lg:px-8 pb-12">
        <div className="max-w-5xl mx-auto space-y-8">
          <PageHero
            icon={Wallet}
            label="Refunds"
            title="Refund Policy"
            description="Learn how refunds and cancellations are handled on SpiceRoute."
          />

          <section className="rounded-3xl bg-white/5 border border-white/10 p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold">
                Eligible Refunds
              </h2>

              <p className="mt-3 text-slate-300 leading-relaxed">
                Refunds may be provided for failed payments, cancelled orders,
                or incorrect deliveries.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-extrabold">
                Refund Processing
              </h2>

              <p className="mt-3 text-slate-300 leading-relaxed">
                Approved refunds are generally processed within 3–7 business
                days.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-extrabold">
                Cancellation Policy
              </h2>

              <p className="mt-3 text-slate-300 leading-relaxed">
                Orders can only be cancelled before restaurant preparation
                begins.
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RefundPolicy;