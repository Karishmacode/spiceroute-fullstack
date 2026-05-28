import { useEffect, useState } from "react";

import PageHeader from "../components/ui/PageHeader";
import SearchInput from "../components/ui/SearchInput";
import SimpleTable from "../components/tables/SimpleTable";
import AdminModal from "../components/ui/AdminModal";

import { getOrders } from "../services/orderService";

const Users = () => {
  const [usersRows, setUsersRows] = useState([]);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const loadUsers = async () => {
    try {
      const data = await getOrders();
      const orders = Array.isArray(data) ? data : data.orders || [];

      const customerMap = {};

      orders.forEach((order) => {
        const phone = order.phone || "N/A";
        const name = order.customerName || "Guest User";

        if (!customerMap[phone]) {
          customerMap[phone] = {
            name,
            phone,
            orders: 0,
            status: "Active",
          };
        }

        customerMap[phone].orders += 1;
      });

      const rows = Object.values(customerMap)
        .filter((user) => {
          const searchText = search.toLowerCase();

          return (
            user.name.toLowerCase().includes(searchText) ||
            user.phone.includes(search)
          );
        })
        .map((user) => [
          user.name,
          user.phone,
          `${user.orders} Orders`,
          user.status,
        ]);

      setUsersRows(rows);
    } catch (error) {
      console.log("Users load error:", error);
      setUsersRows([]);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [search]);

  return (
    <div className="space-y-5 pr-2">
      <section className="admin-panel p-5">
        <PageHeader
          title="Users"
          desc="Manage customer accounts."
          buttonText="+ Add User"
          onClick={() => setOpenModal(true)}
        />

        <div className="admin-panel p-5 mt-5">
          <div className="mb-5">
            <SearchInput
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <SimpleTable
            title="Users"
            desc="Customer account details and status."
            columns={["Name", "Phone", "Orders", "Status", "Actions"]}
            rows={usersRows}
          />
        </div>
      </section>

      {openModal && (
        <AdminModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          title="Add User"
          subtitle="Users are created from real orders"
          submitText="Okay"
          onSubmit={() => setOpenModal(false)}
        >
          <p className="text-sm text-slate-300 leading-6">
            Users are generated automatically when an order is placed. To add a
            new user, create a new order with customer name and phone number.
          </p>
        </AdminModal>
      )}
    </div>
  );
};

export default Users;