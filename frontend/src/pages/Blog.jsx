import { Newspaper, Clock } from "lucide-react";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import PageHero from "../components/common/PageHero";

const Blog = () => {
  const blogs = [
    {
      title: "Top Food Trends You Should Try",
      desc: "Explore popular meals, spicy favourites, and customer-loved dishes available on SpiceRoute.",
      time: "4 min read",
    },
    {
      title: "How Online Food Delivery Works",
      desc: "Learn how restaurants, delivery partners, offers, cart, checkout, and order tracking work together.",
      time: "5 min read",
    },
    {
      title: "Best Ways to Save on Food Orders",
      desc: "Use restaurant discounts, happy hour deals, free delivery, and referral rewards smartly.",
      time: "3 min read",
    },
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 px-4 lg:px-8 pb-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <PageHero
            icon={Newspaper}
            label="SpiceRoute Blog"
            title="Food stories, tips, and updates."
            description="Read helpful food ordering tips, restaurant updates, savings guides, and product stories from SpiceRoute."
          />

          <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {blogs.map((blog) => (
              <article
                key={blog.title}
                className="rounded-3xl bg-white/5 border border-white/10 p-6 hover:border-[#ff7a00]/40 transition"
              >
                <div className="h-12 w-12 rounded-2xl bg-[#ff7a00]/15 flex items-center justify-center">
                  <Newspaper className="text-[#ff7a00]" size={24} />
                </div>

                <h2 className="mt-5 text-xl font-extrabold">
                  {blog.title}
                </h2>

                <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                  {blog.desc}
                </p>

                <div className="mt-5 flex items-center gap-2 text-xs text-slate-500">
                  <Clock size={14} />
                  {blog.time}
                </div>

                <button className="mt-6 text-[#ff7a00] hover:text-[#ff9129] font-bold transition">
                  Read More →
                </button>
              </article>
            ))}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;