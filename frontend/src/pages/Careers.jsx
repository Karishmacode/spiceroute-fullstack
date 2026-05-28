import { Briefcase, Users, Rocket, MapPin } from "lucide-react";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import PageHero from "../components/common/PageHero";

const Careers = () => {
  const roles = [
    {
      title: "Frontend Developer",
      type: "Full Time",
      location: "Remote / India",
    },
    {
      title: "Backend Developer",
      type: "Full Time",
      location: "Remote / India",
    },
    {
      title: "UI/UX Designer",
      type: "Internship",
      location: "Remote / India",
    },
    {
      title: "Delivery Partner",
      type: "Flexible",
      location: "Patna, Bihar",
    },
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 px-4 lg:px-8 pb-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <PageHero
            icon={Briefcase}
            label="Careers"
            title="Build the future of food delivery."
            description="Join SpiceRoute and help create a better ordering experience for customers, restaurants, and delivery partners."
          />

          <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
              <Users className="text-[#ff7a00]" size={32} />
              <h2 className="mt-5 text-xl font-extrabold">Team Culture</h2>
              <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                We value learning, ownership, creativity, and building useful
                products that solve real problems.
              </p>
            </div>

            <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
              <Rocket className="text-[#ff7a00]" size={32} />
              <h2 className="mt-5 text-xl font-extrabold">Growth Mindset</h2>
              <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                Work on modern product ideas, improve your skills, and grow with
                a product-first team.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-extrabold mb-5">Open Roles</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {roles.map((role) => (
                <div
                  key={role.title}
                  className="rounded-3xl bg-white/5 border border-white/10 p-6 hover:border-[#ff7a00]/40 transition"
                >
                  <h3 className="text-xl font-extrabold">{role.title}</h3>

                  <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-400">
                    <span>{role.type}</span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin size={14} />
                      {role.location}
                    </span>
                  </div>

                  <button className="mt-6 px-5 py-3 rounded-xl bg-[#ff7a00] hover:bg-[#ff9129] font-bold transition">
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Careers;