// // import { Link, useParams } from "react-router-dom";
// // import { ArrowLeft, Star, Clock, Bike } from "lucide-react";

// // import Navbar from "../components/layout/Navbar";
// // import Sidebar from "../components/layout/Sidebar";
// // import { restaurants, dishes } from "../components/data/foodData";

// // const slugify = (text) => text.toLowerCase().replace(/\s+/g, "-");

// // const getRestaurantDishes = (restaurantName) => {
// //   if (restaurantName === "Biryani House") {
// //     return dishes.filter((dish) =>
// //       dish.name.toLowerCase().includes("biryani")
// //     );
// //   }

// //   if (restaurantName === "Pizza Corner") {
// //     return dishes.filter((dish) =>
// //       dish.name.toLowerCase().includes("pizza")
// //     );
// //   }

// //   if (restaurantName === "China Town") {
// //     return dishes.filter(
// //       (dish) =>
// //         dish.name.toLowerCase().includes("momo") ||
// //         dish.name.toLowerCase().includes("chinese")
// //     );
// //   }

// //   if (restaurantName === "Burger Hub") {
// //     return dishes.filter((dish) =>
// //       dish.name.toLowerCase().includes("burger")
// //     );
// //   }

// //   return dishes;
// // };

// // const getRestaurantDiscount = (price, offer) => {
// //   if (!offer) return 0;

// //   if (offer.includes("50%")) return Math.min(price * 0.5, 120);
// //   if (offer.includes("40%")) return Math.min(price * 0.4, 100);
// //   if (offer.includes("30%")) return Math.min(price * 0.3, 80);
// //   if (offer.includes("20%")) return Math.min(price * 0.2, 60);

// //   return 0;
// // };

// // const RestaurantDetails = () => {
// //   const { slug } = useParams();

// //   const restaurant = restaurants.find((res) => slugify(res.name) === slug);

// //   const restaurantDishes = restaurant
// //     ? getRestaurantDishes(restaurant.name)
// //     : [];

// //   const handleAddToCart = (dish) => {
// //     const dishPrice = Number(String(dish.price).replace("₹", ""));
// //     const discountAmount = getRestaurantDiscount(
// //       dishPrice,
// //       restaurant.offer
// //     );

// //     const finalPrice = Math.round(dishPrice - discountAmount);

// //     const cartItem = {
// //       ...dish,
// //       price: finalPrice,
// //       oldPrice: dishPrice,
// //       discountText: restaurant.offer,
// //       restaurantName: restaurant.name,
// //       deliveryFree: restaurant.delivery === "₹0 Delivery",
// //       quantity: 1,
// //     };

// //     const cart = JSON.parse(localStorage.getItem("cart")) || [];

// //     const exists = cart.find(
// //       (item) =>
// //         item.name === cartItem.name &&
// //         item.restaurantName === restaurant.name
// //     );

// //     const updatedCart = exists
// //       ? cart.map((item) =>
// //           item.name === cartItem.name &&
// //           item.restaurantName === restaurant.name
// //             ? { ...item, quantity: item.quantity + 1 }
// //             : item
// //         )
// //       : [...cart, cartItem];

// //     localStorage.setItem("cart", JSON.stringify(updatedCart));
// //     window.dispatchEvent(new Event("cartUpdated"));
// //   };

// //   if (!restaurant) {
// //     return (
// //       <div className="min-h-screen bg-[#050816] text-white">
// //         <Navbar />

// //         <main className="pt-24 px-4 max-w-5xl mx-auto">
// //           <h1 className="text-3xl font-extrabold">Restaurant not found</h1>

        
// //         </main>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-[radial-gradient(circle_at_top,#11213f_0%,#070b14_48%,#050816_100%)] text-white">
// //       <Navbar />
// //       <Sidebar />

// //       <main className="pt-24 xl:pl-64 px-4 lg:px-6 pb-12">
// //         <div className="max-w-[1600px] mx-auto">
       

// //           <section className="rounded-3xl overflow-hidden bg-white/5 border border-white/10">
// //             <div className="relative h-72">
// //               <img
// //                 src={restaurant.image}
// //                 alt={restaurant.name}
// //                 className="h-full w-full object-cover"
// //               />

// //               <div className="absolute inset-0 bg-black/55" />

// //               <div className="absolute bottom-8 left-8 right-8">
// //                 <h1 className="text-4xl font-extrabold">
// //                   {restaurant.name}
// //                 </h1>

// //                 <p className="text-slate-300 mt-2">{restaurant.cuisine}</p>

// //                 <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
// //                   <span className="flex items-center gap-2">
// //                     <Star
// //                       className="text-yellow-400 fill-yellow-400"
// //                       size={17}
// //                     />
// //                     {restaurant.rating}
// //                   </span>

// //                   <span className="flex items-center gap-2">
// //                     <Clock className="text-[#ff7a00]" size={17} />
// //                     {restaurant.time}
// //                   </span>

// //                   <span className="flex items-center gap-2">
// //                     <Bike className="text-[#ff7a00]" size={17} />
// //                     {restaurant.delivery}
// //                   </span>
// //                 </div>

// //                 <p className="mt-4 inline-block px-4 py-2 rounded-xl bg-green-500/15 text-green-400 text-sm font-bold">
// //                   {restaurant.offer}
// //                 </p>
// //               </div>
// //             </div>
// //           </section>

// //           <section className="mt-8">
// //             <h2 className="text-2xl font-extrabold">
// //               {restaurant.name} Menu
// //             </h2>

// //             <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-5">
// //               {restaurantDishes.map((dish) => {
// //                 const dishPrice = Number(String(dish.price).replace("₹", ""));
// //                 const discountAmount = getRestaurantDiscount(
// //                   dishPrice,
// //                   restaurant.offer
// //                 );
// //                 const finalPrice = Math.round(dishPrice - discountAmount);

// //                 return (
// //                   <article
// //                     key={dish.name}
// //                     className="group card-bg rounded-3xl p-3 hover:-translate-y-1 transition-all"
// //                   >
// //                     <div className="relative h-44 rounded-2xl overflow-hidden bg-white/5">
// //                       <img
// //                         src={dish.image}
// //                         alt={dish.name}
// //                         className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
// //                       />
// //                     </div>

// //                     <div className="p-2">
// //                       <h3 className="font-extrabold mt-2">{dish.name}</h3>

// //                       <p className="text-sm text-slate-400 line-clamp-2 mt-1">
// //                         {dish.desc}
// //                       </p>

// //                       <div className="mt-2 flex items-center gap-2 text-sm">
// //                         <Star
// //                           size={16}
// //                           className="text-yellow-400 fill-yellow-400"
// //                         />
// //                         <span className="font-bold">{dish.rating}</span>
// //                         <span className="text-slate-500">({dish.orders})</span>
// //                       </div>

// //                       <div className="mt-3 flex items-center justify-between">
// //                         <div>
// //                           <p className="text-yellow-400 font-extrabold">
// //                             ₹{finalPrice}
// //                           </p>

// //                           {discountAmount > 0 && (
// //                             <p className="text-xs text-slate-500 line-through">
// //                               ₹{dishPrice}
// //                             </p>
// //                           )}
// //                         </div>

// //                         <button
// //                           onClick={() => handleAddToCart(dish)}
// //                           className="px-4 py-2 rounded-xl bg-[#ff7a00] hover:bg-[#ff9129] text-sm font-bold"
// //                         >
// //                           Add +
// //                         </button>
// //                       </div>
// //                     </div>
// //                   </article>
// //                 );
// //               })}
// //             </div>
// //           </section>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // };

// // export default RestaurantDetails;


// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Star, Clock, Bike } from "lucide-react";

// import Navbar from "../components/layout/Navbar";
// import Sidebar from "../components/layout/Sidebar";

// const getRestaurantDiscount = (price, offer) => {
//   if (!offer) return 0;

//   if (offer.includes("50%")) return Math.min(price * 0.5, 120);
//   if (offer.includes("40%")) return Math.min(price * 0.4, 100);
//   if (offer.includes("30%")) return Math.min(price * 0.3, 80);
//   if (offer.includes("20%")) return Math.min(price * 0.2, 60);

//   return 0;
// };

// const RestaurantDetails = () => {
//   const { slug } = useParams();

//   const [restaurant, setRestaurant] = useState(null);
//   const [restaurantDishes, setRestaurantDishes] = useState([]);

//   useEffect(() => {
//     fetch(`http://localhost:5000/api/restaurants/${slug}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setRestaurant(data.restaurant);
//         setRestaurantDishes(data.foods || []);
//       })
//       .catch((error) => console.log(error));
//   }, [slug]);

//   const handleAddToCart = (dish) => {
//     const dishPrice = Number(dish.price);
//     const discountAmount = getRestaurantDiscount(dishPrice, restaurant.offer);
//     const finalPrice = Math.round(dishPrice - discountAmount);

//     const cartItem = {
//       ...dish,
//       price: finalPrice,
//       oldPrice: dishPrice,
//       discountText: restaurant.offer,
//       restaurantName: restaurant.name,
//       deliveryFree: restaurant.delivery === "₹0 Delivery",
//       quantity: 1,
//     };

//     const cart = JSON.parse(localStorage.getItem("cart")) || [];

//     const exists = cart.find(
//       (item) =>
//         item.name === cartItem.name &&
//         item.restaurantName === restaurant.name
//     );

//     const updatedCart = exists
//       ? cart.map((item) =>
//           item.name === cartItem.name &&
//           item.restaurantName === restaurant.name
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         )
//       : [...cart, cartItem];

//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//     window.dispatchEvent(new Event("cartUpdated"));
//   };

//   if (!restaurant) {
//     return (
//       <div className="min-h-screen bg-[#050816] text-white">
//         <Navbar />
//         <main className="pt-24 px-4 max-w-5xl mx-auto">
//           <h1 className="text-3xl font-extrabold">Loading restaurant...</h1>
//         </main>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[radial-gradient(circle_at_top,#11213f_0%,#070b14_48%,#050816_100%)] text-white">
//       <Navbar />
//       <Sidebar />

//       <main className="pt-24 xl:pl-64 px-4 lg:px-6 pb-12">
//         <div className="max-w-[1600px] mx-auto">
//           <section className="rounded-3xl overflow-hidden bg-white/5 border border-white/10">
//             <div className="relative h-72">
//               <img
//                 src={restaurant.image}
//                 alt={restaurant.name}
//                 className="h-full w-full object-cover"
//               />

//               <div className="absolute inset-0 bg-black/55" />

//               <div className="absolute bottom-8 left-8 right-8">
//                 <h1 className="text-4xl font-extrabold">{restaurant.name}</h1>

//                 <p className="text-slate-300 mt-2">{restaurant.cuisine}</p>

//                 <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
//                   <span className="flex items-center gap-2">
//                     <Star className="text-yellow-400 fill-yellow-400" size={17} />
//                     {restaurant.rating}
//                   </span>

//                   <span className="flex items-center gap-2">
//                     <Clock className="text-[#ff7a00]" size={17} />
//                     {restaurant.time}
//                   </span>

//                   <span className="flex items-center gap-2">
//                     <Bike className="text-[#ff7a00]" size={17} />
//                     {restaurant.delivery}
//                   </span>
//                 </div>

//                 <p className="mt-4 inline-block px-4 py-2 rounded-xl bg-green-500/15 text-green-400 text-sm font-bold">
//                   {restaurant.offer}
//                 </p>
//               </div>
//             </div>
//           </section>

//           <section className="mt-8">
//             <h2 className="text-2xl font-extrabold">
//               {restaurant.name} Menu
//             </h2>

//             <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-5">
//               {restaurantDishes.map((dish) => {
//                 const dishPrice = Number(dish.price);
//                 const discountAmount = getRestaurantDiscount(
//                   dishPrice,
//                   restaurant.offer
//                 );
//                 const finalPrice = Math.round(dishPrice - discountAmount);

//                 return (
//                   <article
//                     key={dish._id}
//                     className="group card-bg rounded-3xl p-3 hover:-translate-y-1 transition-all"
//                   >
//                     <div className="relative h-44 rounded-2xl overflow-hidden bg-white/5">
//                       <img
//                         src={dish.image}
//                         alt={dish.name}
//                         className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
//                       />
//                     </div>

//                     <div className="p-2">
//                       <h3 className="font-extrabold mt-2">{dish.name}</h3>

//                       <p className="text-sm text-slate-400 line-clamp-2 mt-1">
//                         {dish.desc}
//                       </p>

//                       <div className="mt-2 flex items-center gap-2 text-sm">
//                         <Star size={16} className="text-yellow-400 fill-yellow-400" />
//                         <span className="font-bold">{dish.rating}</span>
//                         <span className="text-slate-500">({dish.orders})</span>
//                       </div>

//                       <div className="mt-3 flex items-center justify-between">
//                         <div>
//                           <p className="text-yellow-400 font-extrabold">
//                             ₹{finalPrice}
//                           </p>

//                           {discountAmount > 0 && (
//                             <p className="text-xs text-slate-500 line-through">
//                               ₹{dishPrice}
//                             </p>
//                           )}
//                         </div>

//                         <button
//                           onClick={() => handleAddToCart(dish)}
//                           className="px-4 py-2 rounded-xl bg-[#ff7a00] hover:bg-[#ff9129] text-sm font-bold"
//                         >
//                           Add +
//                         </button>
//                       </div>
//                     </div>
//                   </article>
//                 );
//               })}
//             </div>
//           </section>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default RestaurantDetails;



import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Star, Clock, Bike } from "lucide-react";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

const getRestaurantDiscount = (price, offer) => {
  if (!offer) return 0;

  if (offer.includes("50%")) return Math.min(price * 0.5, 120);
  if (offer.includes("40%")) return Math.min(price * 0.4, 100);
  if (offer.includes("30%")) return Math.min(price * 0.3, 80);
  if (offer.includes("20%")) return Math.min(price * 0.2, 60);

  return 0;
};

const RestaurantDetails = () => {
  const { slug } = useParams();

  const [restaurant, setRestaurant] = useState(null);
  const [restaurantDishes, setRestaurantDishes] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/restaurants/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setRestaurant(data.restaurant);
        setRestaurantDishes(data.foods || []);
      })
      .catch((error) => console.log(error));
  }, [slug]);

  const handleAddToCart = (dish) => {
    const dishPrice = Number(dish.price);
    const discountAmount = getRestaurantDiscount(dishPrice, restaurant.offer);
    const finalPrice = Math.round(dishPrice - discountAmount);

    const cartItem = {
      ...dish,
      price: finalPrice,
      oldPrice: dishPrice,
      discountText: restaurant.offer,
      restaurantName: restaurant.name,
      deliveryFree: restaurant.delivery === "₹0 Delivery",
      quantity: 1,
    };

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const exists = cart.find(
      (item) =>
        item.name === cartItem.name &&
        item.restaurantName === restaurant.name
    );

    const updatedCart = exists
      ? cart.map((item) =>
          item.name === cartItem.name &&
          item.restaurantName === restaurant.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...cart, cartItem];

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-[#050816] text-white">
        <Navbar />
        <main className="pt-24 px-4 max-w-5xl mx-auto">
          <h1 className="text-3xl font-extrabold">Loading restaurant...</h1>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#11213f_0%,#070b14_48%,#050816_100%)] text-white">
      <Navbar />
      <Sidebar />

      <main className="pt-24 xl:pl-64 px-4 lg:px-6 pb-12">
        <div className="max-w-[1600px] mx-auto">
          <section className="rounded-3xl overflow-hidden bg-white/5 border border-white/10">
            <div className="relative h-72">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-black/55" />

              <div className="absolute bottom-8 left-8 right-8">
                <h1 className="text-4xl font-extrabold">{restaurant.name}</h1>

                <p className="text-slate-300 mt-2">{restaurant.cuisine}</p>

                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                  <span className="flex items-center gap-2">
                    <Star className="text-yellow-400 fill-yellow-400" size={17} />
                    {restaurant.rating}
                  </span>

                  <span className="flex items-center gap-2">
                    <Clock className="text-[#ff7a00]" size={17} />
                    {restaurant.time}
                  </span>

                  <span className="flex items-center gap-2">
                    <Bike className="text-[#ff7a00]" size={17} />
                    {restaurant.delivery}
                  </span>
                </div>

                <p className="mt-4 inline-block px-4 py-2 rounded-xl bg-green-500/15 text-green-400 text-sm font-bold">
                  {restaurant.offer}
                </p>
              </div>
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-extrabold">
              {restaurant.name} Menu
            </h2>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-5">
              {restaurantDishes.map((dish) => {
                const dishPrice = Number(dish.price);
                const discountAmount = getRestaurantDiscount(
                  dishPrice,
                  restaurant.offer
                );
                const finalPrice = Math.round(dishPrice - discountAmount);

                return (
                  <article
                    key={dish._id}
                    className="group card-bg rounded-3xl p-3 hover:-translate-y-1 transition-all"
                  >
                    <div className="relative h-44 rounded-2xl overflow-hidden bg-white/5">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
                      />
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
                        <div>
                          <p className="text-yellow-400 font-extrabold">
                            ₹{finalPrice}
                          </p>

                          {discountAmount > 0 && (
                            <p className="text-xs text-slate-500 line-through">
                              ₹{dishPrice}
                            </p>
                          )}
                        </div>

                        <button
                          onClick={() => handleAddToCart(dish)}
                          className="px-4 py-2 rounded-xl bg-[#ff7a00] hover:bg-[#ff9129] text-sm font-bold"
                        >
                          Add +
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default RestaurantDetails;