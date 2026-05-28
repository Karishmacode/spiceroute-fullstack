import { Cookie } from "lucide-react";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import PageHero from "../components/common/PageHero";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-[#050816] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 px-4 lg:px-8 pb-12">
        <div className="max-w-5xl mx-auto space-y-8">
          <PageHero
            icon={Cookie}
            label="Cookies"
            title="Cookie Policy"
            description="Understand how cookies improve your experience on SpiceRoute."
          />

          <section className="rounded-3xl bg-white/5 border border-white/10 p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold">
                What Are Cookies?
              </h2>

              <p className="mt-3 text-slate-300 leading-relaxed">
                Cookies are small files stored in your browser to remember user
                preferences and improve performance.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-extrabold">
                Why We Use Cookies
              </h2>

              <p className="mt-3 text-slate-300 leading-relaxed">
                Cookies help keep users logged in, remember cart data, and
                personalise the browsing experience.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-extrabold">
                Managing Cookies
              </h2>

              <p className="mt-3 text-slate-300 leading-relaxed">
                Users can disable cookies from browser settings, though some
                features may not work properly.
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CookiePolicy;