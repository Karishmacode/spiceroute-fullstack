import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CategoryTabs = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          setCategories([]);
        }
      })
      .catch((error) => {
        console.log(error);
        setCategories([]);
      });
  }, []);

  return (
    <section className="mt-5">
      <div className="card-bg rounded-3xl p-3 flex gap-3 overflow-x-auto">
        {categories.map((category, index) => (
          <Link
            key={category._id || category.name}
            to={`/menu?category=${encodeURIComponent(
              category.name
            )}&title=${encodeURIComponent(
              category.name === "All" ? "All Menu Items" : category.name
            )}`}
            className={`min-w-[130px] h-[72px] rounded-2xl flex flex-col items-center justify-center gap-2 border transition-all ${
              index === 0
                ? "border-[#ff7a00] bg-[#ff7a00]/10 text-[#ff7a00]"
                : "border-white/10 bg-white/5 hover:border-[#ff7a00]/50"
            }`}
          >
            {category.image ? (
              <img
                src={category.image}
                alt={category.name}
                className="h-9 w-9 rounded-full object-cover"
              />
            ) : (
              <span className="text-2xl">{category.emoji}</span>
            )}

            <span className="text-sm font-extrabold">{category.name}</span>
          </Link>
        ))}

        <Link
          to="/menu?category=All&title=All Menu Items"
          className="min-w-[130px] h-[72px] rounded-2xl flex items-center justify-center bg-white/10 hover:bg-[#ff7a00] transition font-extrabold"
        >
          View All →
        </Link>
      </div>
    </section>
  );
};

export default CategoryTabs;