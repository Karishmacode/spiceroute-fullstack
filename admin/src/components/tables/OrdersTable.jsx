import { Eye, Pencil, Trash2 } from "lucide-react";
import StatusBadge from "../ui/StatusBadge";

const OrdersTable = ({
  orders = [],
  onView,
  onEdit,
  onDelete,
  showCrud = false,
}) => {
  return (
    <div className="admin-card p-5 overflow-x-auto">
      <h2 className="text-lg font-black">Orders</h2>

      <p className="text-xs text-slate-500 mb-5">
        Latest customer transactions.
      </p>

      <table className="w-full min-w-[760px] text-left">
        <thead>
          <tr className="border-b border-white/10 text-slate-400 text-xs">
            <th className="py-3">Order ID</th>
            <th>Items</th>
            <th>Address</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="6" className="py-8 text-center text-slate-500">
                No orders found
              </td>
            </tr>
          ) : (
            orders.slice(0, 8).map((order) => (
              <tr key={order._id} className="border-b border-white/[0.05]">
                <td className="py-4 text-sm font-bold">
                  #{order._id?.slice(-6).toUpperCase()}
                </td>

                <td className="text-sm text-slate-300 max-w-[220px] truncate">
                  {order.items?.map((item) => item.name).join(", ") || "N/A"}
                </td>

                <td className="text-sm text-slate-300 max-w-[220px] truncate">
                  {order.address || "N/A"}
                </td>

                <td className="text-sm font-bold">₹{order.total || 0}</td>

                <td>
                  <StatusBadge>{order.status || "Order Placed"}</StatusBadge>
                </td>

                <td>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onView && onView(order)}
                      className="h-8 w-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center"
                    >
                      <Eye size={15} />
                    </button>

                    {showCrud && (
                      <>
                        <button
                          onClick={() => onEdit && onEdit(order)}
                          className="h-8 w-8 rounded-lg bg-white/5 hover:bg-blue-500/20 hover:text-blue-400 flex items-center justify-center"
                        >
                          <Pencil size={15} />
                        </button>

                        <button
                          onClick={() => onDelete && onDelete(order._id)}
                          className="h-8 w-8 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 flex items-center justify-center"
                        >
                          <Trash2 size={15} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;