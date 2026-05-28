import { Link } from "react-router-dom";

const RecentOrdersCard = ({ orders = [] }) => {
  const getStatusClass = (status) => {
    if (status === "Delivered") return "bg-emerald-500/15 text-emerald-400";
    if (status === "Preparing") return "bg-yellow-500/15 text-yellow-400";
    if (status === "Out for Delivery") return "bg-blue-500/15 text-blue-400";
    if (status === "Canceled") return "bg-red-500/15 text-red-400";
    return "bg-orange-500/15 text-orange-400";
  };

  return (
    <div className="admin-card p-5 h-[320px] overflow-y-auto">
      <div className="flex justify-between mb-4">
        <h2 className="text-base font-black">Recent Orders</h2>

        <Link
          to="/orders"
          className="text-[#ff7a00] font-bold text-xs hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="space-y-4">
        {orders.length > 0 ? (
          orders.map((order) => {
            const firstItem = order.items?.[0];
            const status = order.status || "Order Placed";

            return (
              <div key={order._id} className="flex items-center gap-3">
                <img
                  src={
                    firstItem?.image ||
                    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=300"
                  }
                  alt={firstItem?.name || "Order"}
                  className="h-10 w-10 rounded-lg object-cover"
                />

                <div className="flex-1">
                  <p className="font-bold text-xs">
                    #{order._id?.slice(-6).toUpperCase()}
                  </p>

                  <p className="text-[10px] text-slate-400">
                    {firstItem?.name || "Food Order"}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-bold text-xs">₹{order.total}</p>

                  <span
                    className={`inline-block mt-1 px-2 py-1 rounded-lg text-[10px] font-bold ${getStatusClass(
                      status
                    )}`}
                  >
                    {status}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-sm text-slate-400 text-center mt-10">
            No recent orders
          </p>
        )}
      </div>
    </div>
  );
};

export default RecentOrdersCard;