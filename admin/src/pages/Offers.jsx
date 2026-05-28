import { useEffect, useState } from "react";

import PageHeader from "../components/ui/PageHeader";
import SearchInput from "../components/ui/SearchInput";
import AdminModal from "../components/ui/AdminModal";
import StatusBadge from "../components/ui/StatusBadge";
import ActionButtons from "../components/ui/ActionButtons";

import {
  getOffers,
  addOffer,
  updateOffer,
  deleteOffer,
} from "../services/offerService";

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editOffer, setEditOffer] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    discount: "",
    valid: "",
    status: "Active",
  });

  const loadOffers = async () => {
    try {
      const data = await getOffers();
      setOffers(Array.isArray(data) ? data : data.offers || []);
    } catch (error) {
      console.log("Offers fetch error:", error);
    }
  };

  useEffect(() => {
    loadOffers();
  }, []);

  const resetForm = () => {
    setFormData({
      title: "",
      discount: "",
      valid: "",
      status: "Active",
    });
  };

  const handleOpenAdd = () => {
    setEditOffer(null);
    resetForm();
    setOpenModal(true);
  };

  const handleEdit = (offer) => {
    setEditOffer(offer);

    setFormData({
      title: offer.title || "",
      discount: offer.discount || offer.badge || "",
      valid: offer.valid || "31 May 2026",
      status: offer.status || "Active",
    });

    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditOffer(null);
    resetForm();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.discount || !formData.valid) {
      alert("Please fill offer, discount and valid date");
      return;
    }

    try {
      const payload = {
        title: formData.title,
        discount: formData.discount,
        badge: formData.discount,
        valid: formData.valid,
        status: formData.status,
      };

      if (editOffer) {
        await updateOffer(editOffer._id, payload);
      } else {
        await addOffer({
          ...payload,
          name: formData.title,
          productName: formData.title,
          price: "₹0",
          old: "",
          image:
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=500",
        });
      }

      await loadOffers();
      handleCloseModal();
    } catch (error) {
      console.log("Offer submit error:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this offer?"
    );

    if (!confirmDelete) return;

    try {
      await deleteOffer(id);
      loadOffers();
    } catch (error) {
      console.log("Delete offer error:", error);
    }
  };

  const filteredOffers = offers.filter((offer) => {
    const title = offer.title || "";
    const discount = offer.discount || offer.badge || "";
    const valid = offer.valid || "";

    return (
      title.toLowerCase().includes(search.toLowerCase()) ||
      discount.toLowerCase().includes(search.toLowerCase()) ||
      valid.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="space-y-5 pr-2">
      <section className="admin-panel p-5">
        <PageHeader
          title="Offers"
          desc="Manage all food offers here."
          buttonText="+ Add Offer"
          onClick={handleOpenAdd}
        />

        <div className="mt-5">
          <SearchInput
            placeholder="Search offers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="mt-5 overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[700px] text-left">
            <thead className="bg-white/[0.03] border-b border-white/10">
              <tr className="text-slate-400">
                {["Offer", "Discount", "Valid", "Status", "Actions"].map(
                  (item) => (
                    <th key={item} className="py-3 px-4 text-[11px] font-bold">
                      {item}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody>
              {filteredOffers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-slate-500">
                    No offers found
                  </td>
                </tr>
              ) : (
                filteredOffers.map((offer) => (
                  <tr key={offer._id} className="border-b border-white/[0.06]">
                    <td className="px-4 py-3 text-sm font-bold">
                      {offer.title || "No Offer"}
                    </td>

                    <td className="px-4 py-3 text-sm text-slate-300">
                      {offer.discount || offer.badge || "N/A"}
                    </td>

                    <td className="px-4 py-3 text-sm text-slate-300">
                      {offer.valid || "31 May 2026"}
                    </td>

                    <td className="px-4 py-3">
                      <StatusBadge>{offer.status || "Active"}</StatusBadge>
                    </td>

                    <td className="px-4 py-3">
                      <ActionButtons
                        onEdit={() => handleEdit(offer)}
                        onDelete={() => handleDelete(offer._id)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="h-10 px-4 flex items-center justify-between text-xs text-slate-500 border-t border-white/10">
            <p>Showing {filteredOffers.length} offers</p>

            <button className="h-6 w-6 rounded-md border border-[#ff7a00] text-[#ff7a00]">
              1
            </button>
          </div>
        </div>
      </section>

      <AdminModal
        open={openModal}
        onClose={handleCloseModal}
        title={editOffer ? "Edit Offer" : "Add Offer"}
        subtitle={`Offers > ${editOffer ? "Edit" : "Add"}`}
        submitText={editOffer ? "Update Offer" : "Add Offer"}
        onSubmit={handleSubmit}
      >
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Offer Title"
          className="w-full p-3 rounded-lg bg-white/5 border border-white/10 outline-none"
        />

        <input
          name="discount"
          value={formData.discount}
          onChange={handleChange}
          placeholder="Discount e.g. 20% OFF"
          className="w-full p-3 rounded-lg bg-white/5 border border-white/10 outline-none"
        />

        <input
          name="valid"
          value={formData.valid}
          onChange={handleChange}
          placeholder="Valid Date e.g. 31 May 2026"
          className="w-full p-3 rounded-lg bg-white/5 border border-white/10 outline-none"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-[#111827] border border-white/10 outline-none"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </AdminModal>
    </div>
  );
};

export default Offers;