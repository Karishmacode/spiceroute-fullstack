// import { useEffect, useState } from "react";
// import { Heart, Star } from "lucide-react";
// import { dishes } from "../data/foodData";
// import { Link } from "react-router-dom";

// const PopularDishes = () => {
//   const [favourites, setFavourites] = useState([]);

//   useEffect(() => {
//     const savedFavourites =
//       JSON.parse(localStorage.getItem("favourites")) || [];

//     setFavourites(savedFavourites);
//   }, []);

//   const isFavourite = (dishName) => {
//     return favourites.some((item) => item.name === dishName);
//   };

//   const handleFavourite = (dish) => {
//     let updatedFavourites;

//     if (isFavourite(dish.name)) {
//       updatedFavourites = favourites.filter(
//         (item) => item.name !== dish.name
//       );
//     } else {
//       updatedFavourites = [...favourites, dish];
//     }

//     setFavourites(updatedFavourites);

//     localStorage.setItem(
//       "favourites",
//       JSON.stringify(updatedFavourites)
//     );
//   };

//   const handleAddToCart = (dish) => {
//     const existingCart =
//       JSON.parse(localStorage.getItem("cart")) || [];

//     const itemExists = existingCart.find(
//       (item) => item.name === dish.name
//     );

//     let updatedCart;

//     if (itemExists) {
//       updatedCart = existingCart.map((item) =>
//         item.name === dish.name
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       );
//     } else {
//       updatedCart = [...existingCart, { ...dish, quantity: 1 }];
//     }

//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//     window.dispatchEvent(new Event("cartUpdated"));
//   };

//   return (
//     <section className="mt-6">
//       <div className="flex items-center justify-between">
//         <h2 className="text-xl font-extrabold">Popular Dishes</h2>

//        <Link
//   to="/menu?title=Popular Dishes"
//   className="text-slate-300 hover:text-[#ff7a00] text-sm font-bold"
// >
//   View All →
// </Link>
//       </div>

//       <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-4">
//         {dishes.map((dish) => (
//           <article
//             key={dish.name}
//             className="group card-bg rounded-3xl p-3 hover:-translate-y-1 transition-all"
//           >
//             <div className="relative h-36 rounded-2xl overflow-hidden bg-white/5">
//               <img
//                 src={dish.image}
//                 alt={dish.name}
//                 className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
//               />

//               {dish.tag && (
//                 <span className="absolute top-2 left-2 bg-[#ff7a00] px-2 py-1 text-xs font-bold rounded-lg">
//                   {dish.tag}
//                 </span>
//               )}

//               <button
//                 onClick={() => handleFavourite(dish)}
//                 className="absolute top-2 right-2 h-9 w-9 rounded-full bg-black/35 backdrop-blur flex items-center justify-center"
//               >
//                 <Heart
//                   size={18}
//                   className={
//                     isFavourite(dish.name)
//                       ? "text-red-500 fill-red-500"
//                       : "text-white"
//                   }
//                 />
//               </button>
//             </div>

//             <div className="p-2">
//               <h3 className="font-extrabold mt-2">{dish.name}</h3>

//               <p className="text-sm text-slate-400 line-clamp-2 mt-1">
//                 {dish.desc}
//               </p>

//               <div className="mt-2 flex items-center gap-2 text-sm">
//                 <Star size={16} className="text-yellow-400 fill-yellow-400" />
//                 <span className="font-bold">{dish.rating}</span>
//                 <span className="text-slate-500">({dish.orders})</span>
//               </div>

//               <div className="mt-3 flex items-center justify-between">
//                 <p className="text-yellow-400 font-extrabold">₹{dish.price}</p>

//                 <button
//                   onClick={() => handleAddToCart(dish)}
//                   className="px-4 py-2 rounded-xl bg-[#ff7a00] hover:bg-[#ff9129] text-sm font-bold"
//                 >
//                   Add +
//                 </button>
//               </div>
//             </div>
//           </article>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default PopularDishes;



import { useEffect, useState } from "react";
import { Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";

const PopularDishes = () => {
  const [dishes, setDishes] = useState([]);
  const [favourites, setFavourites] = useState([]);
useEffect(() => {
  fetch("https://spiceroute-fullstack.onrender.com/api/foods?limit=6")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      if (Array.isArray(data)) {
        setDishes(data);
      } else {
        setDishes([]);
      }
    })
    .catch((error) => {
      console.log(error);
      setDishes([]);
    });
}, []);

  const isFavourite = (dishName) => {
    return favourites.some((item) => item.name === dishName);
  };

  const handleFavourite = (dish) => {
    let updatedFavourites;

    if (isFavourite(dish.name)) {
      updatedFavourites = favourites.filter((item) => item.name !== dish.name);
    } else {
      updatedFavourites = [...favourites, dish];
    }

    setFavourites(updatedFavourites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  };

  const handleAddToCart = (dish) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemExists = existingCart.find((item) => item.name === dish.name);

    let updatedCart;

    if (itemExists) {
      updatedCart = existingCart.map((item) =>
        item.name === dish.name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...existingCart, { ...dish, quantity: 1 }];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <section className="mt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-extrabold">Popular Dishes</h2>

        <Link
          to="/menu?title=Popular Dishes"
          className="text-slate-300 hover:text-[#ff7a00] text-sm font-bold"
        >
          View All →
        </Link>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-4">
        {dishes.map((dish) => (
          <article
            key={dish._id}
            className="group card-bg rounded-3xl p-3 hover:-translate-y-1 transition-all"
          >
            <div className="relative h-36 rounded-2xl overflow-hidden bg-white/5">
              <img
                src={dish.image}
                alt={dish.name}
                className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
              />

              {dish.tag && (
                <span className="absolute top-2 left-2 bg-[#ff7a00] px-2 py-1 text-xs font-bold rounded-lg">
                  {dish.tag}
                </span>
              )}

              <button
                onClick={() => handleFavourite(dish)}
                className="absolute top-2 right-2 h-9 w-9 rounded-full bg-black/35 backdrop-blur flex items-center justify-center"
              >
                <Heart
                  size={18}
                  className={
                    isFavourite(dish.name)
                      ? "text-red-500 fill-red-500"
                      : "text-white"
                  }
                />
              </button>
            </div>

            <div className="p-2">
              <h3 className="font-extrabold mt-2">{dish.name}</h3>

              <p className="text-sm text-slate-400 line-clamp-2 mt-1">
                {dish.desc}
              </p>

              <div className="mt-2 flex items-center gap-2 text-sm">
                <Star size={16} className="text-yellow-400 fill-yellow-400" />
                <span className="font-bold">{dish.rating}</span>
                <span className="text-slate-500">({dish.orders})</span>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <p className="text-yellow-400 font-extrabold">₹{dish.price}</p>

                <button
                  onClick={() => handleAddToCart(dish)}
                  className="px-4 py-2 rounded-xl bg-[#ff7a00] hover:bg-[#ff9129] text-sm font-bold"
                >
                  Add +
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default PopularDishes;