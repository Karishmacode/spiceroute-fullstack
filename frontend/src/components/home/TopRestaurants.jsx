import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

const slugify = (text) => text.toLowerCase().replace(/\s+/g, "-");

const TopRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch("https://spiceroute-fullstack.onrender.com/api/restaurants")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setRestaurants(data);
        } else {
          setRestaurants([]);
        }
      })
      .catch((error) => {
        console.log(error);
        setRestaurants([]);
      });
  }, []);

  return (
    <section className="mt-7">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-extrabold">Top Restaurants</h2>

        <Link
          to="/restaurants"
          className="text-slate-300 hover:text-[#ff7a00] text-sm font-bold"
        >
          View All →
        </Link>
      </div>

      {restaurants.length === 0 ? (
        <p className="mt-6 text-slate-400">No restaurants found.</p>
      ) : (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4">
          {restaurants.map((res) => (
            <Link
              key={res._id}
              to={`/restaurant/${res.slug || slugify(res.name)}`}
              className="card-bg rounded-3xl p-4 flex gap-4 hover:bg-white/[0.06] hover:-translate-y-1 transition-all"
            >
              <img
                src={res.image}
                alt={res.name}
                className="h-20 w-20 rounded-2xl object-cover"
              />

              <div className="min-w-0">
                <h3 className="font-extrabold truncate">{res.name}</h3>

                <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-300">
                  <Star
                    size={14}
                    className="text-yellow-400 fill-yellow-400"
                  />

                  <span className="font-bold text-yellow-400">
                    {res.rating}
                  </span>

                  <span>·</span>

                  <span>{res.time}</span>

                  <span>·</span>

                  <span>{res.delivery}</span>
                </div>

                <p className="mt-1 text-sm text-slate-500 truncate">
                  {res.cuisine}
                </p>

                {res.offer && (
                  <span className="inline-block mt-2 px-2 py-1 rounded-lg bg-emerald-500/15 text-emerald-400 text-xs font-bold">
                    {res.offer}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default TopRestaurants;