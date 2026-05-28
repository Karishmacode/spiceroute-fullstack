import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Hero from "../components/home/Hero";
import OffersPanel from "../components/home/OffersPanel";
import CategoryTabs from "../components/home/CategoryTabs";
import PopularDishes from "../components/home/PopularDishes";
import TopRestaurants from "../components/home/TopRestaurants";
import Footer from "../components/layout/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#11213f_0%,#070b14_48%,#050816_100%)] text-white">
      <Navbar />
      <Sidebar />

      <main className="pt-20 xl:pl-64 px-4 lg:px-6 pb-8">
        <div className="max-w-[1600px] mx-auto">
          <section className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-5">
            <Hero />
            <OffersPanel />
          </section>

          <CategoryTabs />
          <PopularDishes />
          <TopRestaurants />
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Home;