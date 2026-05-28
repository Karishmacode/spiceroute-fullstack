import { useEffect, useState } from "react";

import PageHeader from "../components/ui/PageHeader";
import SearchInput from "../components/ui/SearchInput";
import OrdersTable from "../components/tables/OrdersTable";
import AdminModal from "../components/ui/AdminModal";

import {
  getOrders,
  addOrder,
  updateOrder,
  deleteOrder,
} from "../services/orderService";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const [viewOrder, setViewOrder] = useState(null);
  const [editOrder, setEditOrder] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);

  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    items: "",
    address: "",
    total: "",
    status: "Order Placed",
  });

  const loadOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(Array.isArray(data) ? data : data.orders || []);
    } catch (error) {
      console.log("Orders fetch error:", error);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const resetForm = () => {
    setFormData({
      customerName: "",
      phone: "",
      items: "",
      address: "",
      total: "",
      status: "Order Placed",
    });
  };

  const handleOpenAdd = () => {
    resetForm();
    setOpenAddModal(true);
  };

  const handleCloseAdd = () => {
    setOpenAddModal(false);
    resetForm();
  };

  const handleAddOrder = async () => {
    if (
      !formData.customerName ||
      !formData.phone ||
      !formData.items ||
      !formData.address ||
      !formData.total
    ) {
      alert("Please fill all fields");
      return;
    }

    if (formData.phone.length !== 10) {
      alert("Phone number must be exactly 10 digits");
      return;
    }

    try {
      await addOrder({
        customerName: formData.customerName,
        phone: formData.phone,
        address: formData.address,
        total: Number(formData.total),
        status: formData.status,
        items: formData.items.split(",").map((item) => ({
          name: item.trim(),
          image: "",
          price: 0,
          quantity: 1,
        })),
      });

      await loadOrders();
      handleCloseAdd();
    } catch (error) {
      console.log("Add order error:", error);
    }
  };

  const handleEdit = (order) => {
    setEditOrder(order);
    setFormData({
      ...formData,
      status: order.status || "Order Placed",
    });
  };

  const handleCloseEdit = () => {
    setEditOrder(null);
    resetForm();
  };

  const handleUpdateStatus = async () => {
    try {
      await updateOrder(editOrder._id, {
        status: formData.status,
      });

      await loadOrders();
      handleCloseEdit();
    } catch (error) {
      console.log("Update order status error:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmDelete) return;

    try {
      await deleteOrder(id);
      loadOrders();
    } catch (error) {
      console.log("Delete order error:", error);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const itemsText = order.items?.map((item) => item.name).join(" ") || "";

    const matchSearch =
      itemsText.toLowerCase().includes(search.toLowerCase()) ||
      order.customerName?.toLowerCase().includes(search.toLowerCase()) ||
      order.phone?.includes(search) ||
      order.address?.toLowerCase().includes(search.toLowerCase()) ||
      order._id?.toLowerCase().includes(search.toLowerCase());

    const matchStatus = status === "All" || order.status === status;

    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-5 pr-2">
      <section className="admin-panel p-5">
        <PageHeader
          title="Orders"
          desc="Track and manage customer orders."
          buttonText="+ Add Order"
          onClick={handleOpenAdd}
        />

        <div className="mt-5 grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-3 mb-5">
          <SearchInput
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-11 rounded-xl bg-[#0b1220] border border-white/10 px-4 outline-none text-sm text-slate-300"
          >
            <option value="All">All Status</option>
            <option value="Order Placed">Order Placed</option>
            <option value="Preparing">Preparing</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Canceled">Canceled</option>
          </select>
        </div>

        <OrdersTable
          orders={filteredOrders}
          onView={(order) => setViewOrder(order)}
          onEdit={handleEdit}
          onDelete={handleDelete}
          showCrud={true}
        />
      </section>

      {openAddModal && (
        <AdminModal
          open={openAddModal}
          onClose={handleCloseAdd}
          title="Add Order"
          subtitle="Orders > Add"
          submitText="Add Order"
          onSubmit={handleAddOrder}
        >
          <input
            name="customerName"
            value={formData.customerName}
            onChange={(e) =>
              setFormData({ ...formData, customerName: e.target.value })
            }
            placeholder="Customer Name"
            className="w-full p-3 rounded-lg bg-white/5 border border-white/10 outline-none"
          />

          <input
            name="phone"
            value={formData.phone}
            maxLength={10}
            onChange={(e) =>
              setFormData({
                ...formData,
                phone: e.target.value.replace(/\D/g, ""),
              })
            }
            placeholder="Phone Number"
            className="w-full p-3 rounded-lg bg-white/5 border border-white/10 outline-none"
          />

          <input
            name="items"
            value={formData.items}
            onChange={(e) =>
              setFormData({ ...formData, items: e.target.value })
            }
            placeholder="Items comma separated"
            className="w-full p-3 rounded-lg bg-white/5 border border-white/10 outline-none"
          />

          <input
            name="address"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            placeholder="Address"
            className="w-full p-3 rounded-lg bg-white/5 border border-white/10 outline-none"
          />

          <input
            name="total"
            value={formData.total}
            onChange={(e) =>
              setFormData({ ...formData, total: e.target.value })
            }
            placeholder="Total Amount"
            type="number"
            className="w-full p-3 rounded-lg bg-white/5 border border-white/10 outline-none"
          />
        </AdminModal>
      )}

      {viewOrder && (
        <AdminModal
          open={true}
          onClose={() => setViewOrder(null)}
          title={`Order #${viewOrder._id?.slice(-6).toUpperCase()}`}
          subtitle="Order Details"
          previewImage={viewOrder.items?.[0]?.image}
        >
          <div className="space-y-4">
            <p>
              <span className="text-slate-400">Customer:</span>{" "}
              {viewOrder.customerName || "Guest User"}
            </p>

            <p>
              <span className="text-slate-400">Phone:</span>{" "}
              {viewOrder.phone || "N/A"}
            </p>

            <p>
              <span className="text-slate-400">Address:</span>{" "}
              {viewOrder.address}
            </p>

            <p>
              <span className="text-slate-400">Total:</span> ₹{viewOrder.total}
            </p>

            <p>
              <span className="text-slate-400">Status:</span>{" "}
              {viewOrder.status}
            </p>

            <div className="space-y-3">
              {viewOrder.items?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white/5 p-3 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                    )}

                    <div>
                      <p className="font-bold">{item.name}</p>
                      <p className="text-xs text-slate-400">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>

                  <p className="font-bold">₹{item.price}</p>
                </div>
              ))}
            </div>
          </div>
        </AdminModal>
      )}

      {editOrder && (
        <AdminModal
          open={true}
          onClose={handleCloseEdit}
          title={`Update Order #${editOrder._id?.slice(-6).toUpperCase()}`}
          subtitle="Change order status"
          submitText="Update Status"
          onSubmit={handleUpdateStatus}
        >
          <select
            name="status"
            value={formData.status}
            onChange={(e) =>
              setFormData({
                ...formData,
                status: e.target.value,
              })
            }
            className="w-full p-3 rounded-lg bg-[#111827] border border-white/10 outline-none"
          >
            <option value="Order Placed">Order Placed</option>
            <option value="Preparing">Preparing</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Canceled">Canceled</option>
          </select>
        </AdminModal>
      )}
    </div>
  );
};

export default Orders;