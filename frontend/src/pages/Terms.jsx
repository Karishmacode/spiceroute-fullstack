import { FileText } from "lucide-react";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import PageHero from "../components/common/PageHero";

const Terms = () => {
  return (
    <div className="min-h-screen bg-[#050816] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 px-4 lg:px-8 pb-12">
        <div className="max-w-5xl mx-auto space-y-8">
          <PageHero
            icon={FileText}
            label="Legal"
            title="Terms & Conditions"
            description="Please read these terms carefully before using SpiceRoute services."
          />

          <section className="rounded-3xl bg-white/5 border border-white/10 p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold">
                Use of Service
              </h2>

              <p className="mt-3 text-slate-300 leading-relaxed">
                SpiceRoute allows users to browse restaurants, place food
                orders, use offers, and track deliveries through our platform.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-extrabold">
                User Responsibilities
              </h2>

              <p className="mt-3 text-slate-300 leading-relaxed">
                Users must provide accurate delivery details and maintain
                respectful behaviour while using the platform.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-extrabold">
                Payments & Orders
              </h2>

              <p className="mt-3 text-slate-300 leading-relaxed">
                Orders are confirmed only after successful checkout. Offers and
                discounts may vary by restaurant and availability.
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;