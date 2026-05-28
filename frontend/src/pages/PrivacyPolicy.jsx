import { ShieldCheck } from "lucide-react";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import PageHero from "../components/common/PageHero";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#050816] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 px-4 lg:px-8 pb-12">
        <div className="max-w-5xl mx-auto space-y-8">
          <PageHero
            icon={ShieldCheck}
            label="Privacy"
            title="Privacy Policy"
            description="Your privacy and personal information are important to us."
          />

          <section className="rounded-3xl bg-white/5 border border-white/10 p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold">
                Information Collection
              </h2>

              <p className="mt-3 text-slate-300 leading-relaxed">
                We may collect your name, address, phone number, and order
                details to improve delivery services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-extrabold">
                Data Protection
              </h2>

              <p className="mt-3 text-slate-300 leading-relaxed">
                User information is stored securely and is never sold to third
                parties.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-extrabold">
                Cookies & Tracking
              </h2>

              <p className="mt-3 text-slate-300 leading-relaxed">
                Cookies help improve user experience, remember preferences, and
                analyse platform performance.
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;