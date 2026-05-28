import { Link } from "react-router-dom";

const SummaryCards = ({
  activeOffers = 0,
  todayRevenue = 0,
  pendingOrders = 0,
  newUsers = 0,
}) => {
  const cards = [
    ["Active Offers", activeOffers, "View all offers →", "/offers"],
    ["Today's Revenue", `₹${todayRevenue}`, "View detailed report →", "/orders"],
    ["Pending Orders", pendingOrders, "View all orders →", "/orders"],
    ["New Users", newUsers, "View all users →", "/users"],
  ];

  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(([title, value, link, path]) => (
        <div
          key={title}
          className="admin-card p-4 hover:border-white/20 transition-all"
        >
          <p className="text-slate-400 font-bold text-[11px] uppercase tracking-wider">
            {title}
          </p>

          <h3 className="text-xl font-black mt-2 text-white">{value}</h3>

          <Link
            to={path}
            className="inline-block text-[#ff7a00] font-bold mt-3 text-[10px]"
          >
            {link}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;