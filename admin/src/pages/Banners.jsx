import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

import PageHeader from "../components/ui/PageHeader";
import SearchInput from "../components/ui/SearchInput";
import AdminModal from "../components/ui/AdminModal";

import {
  getBanners,
  addBanner,
  updateBanner,
  deleteBanner,
} from "../services/bannerService";

const Banners = () => {
  const [banners, setBanners] = useState([]);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editBanner, setEditBanner] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    image: "",
    placement: "Home Hero",
    discount: "",
    startDate: "",
    endDate: "",
    status: "Active",
  });

  const loadBanners = async () => {
    const data = await getBanners();
    setBanners(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    loadBanners();
  }, []);

  const resetForm = () => {
    setFormData({
      title: "",
      subtitle: "",
      image: "",
      placement: "Home Hero",
      discount: "",
      startDate: "",
      endDate: "",
      status: "Active",
    });
    setEditBanner(null);
  };

  const handleOpenAdd = () => {
    resetForm();
    setOpenModal(true);
  };

  const handleEdit = (banner) => {
    setEditBanner(banner);
    setFormData({
      title: banner.title || "",
      subtitle: banner.subtitle || "",
      image: banner.image || "",
      placement: banner.placement || "Home Hero",
      discount: banner.discount || "",
      startDate: banner.startDate || "",
      endDate: banner.endDate || "",
      status: banner.status || "Active",
    });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    resetForm();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.subtitle || !formData.image) {
      alert("Please fill title, subtitle and image");
      return;
    }

    if (editBanner) {
      await updateBanner(editBanner._id, formData);
    } else {
      await addBanner(formData);
    }

    await loadBanners();
    handleCloseModal();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this banner?")) return;

    await deleteBanner(id);
    loadBanners();
  };

  const filteredBanners = banners.filter((banner) => {
    const text = search.toLowerCase();
    return (
      banner.title?.toLowerCase().includes(text) ||
      banner.placement?.toLowerCase().includes(text) ||
      banner.discount?.toLowerCase().includes(text) ||
      banner.status?.toLowerCase().includes(text)
    );
  });

  return (
    <div className="space-y-5 pr-2">
      <section className="admin-panel p-5">
        <PageHeader
          title="Banners"
          desc="Control promotional campaigns and banners."
          buttonText="+ Add Banner"
          onClick={handleOpenAdd}
        />

        <div className="admin-panel p-5 mt-5">
          <div className="mb-5">
            <SearchInput
              placeholder="Search banners..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0b1220]/50 p-4">
            <h2 className="text-base font-black">Banners</h2>
            <p className="text-xs text-slate-400 mb-5">
              Promotional banners management.
            </p>

            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-400 border-b border-white/10">
                  <th className="py-3">Banner</th>
                  <th className="py-3">Placement</th>
                  <th className="py-3">Discount</th>
                  <th className="py-3">Date</th>
                  <th className="py-3">Status</th>
                  <th className="py-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredBanners.map((banner) => (
                  <tr key={banner._id} className="border-b border-white/10">
                    <td className="py-3">{banner.title}</td>
                    <td className="py-3">{banner.placement}</td>
                    <td className="py-3">{banner.discount || "N/A"}</td>
                    <td className="py-3">
                      {banner.startDate || "N/A"} - {banner.endDate || "N/A"}
                    </td>
                    <td className="py-3">
                      <span
                        className={`px-3 py-1 rounded-lg text-xs font-bold ${
                          banner.status === "Active"
                            ? "bg-emerald-500/15 text-emerald-400"
                            : "bg-red-500/15 text-red-400"
                        }`}
                      >
                        {banner.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(banner)}
                          className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center"
                        >
                          <Pencil size={15} />
                        </button>

                        <button
                          onClick={() => handleDelete(banner._id)}
                          className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-red-500/20 text-slate-300 hover:text-red-400 flex items-center justify-center"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredBanners.length === 0 && (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-slate-400">
                      No banners found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <AdminModal
        open={openModal}
        onClose={handleCloseModal}
        title={editBanner ? "Edit Banner" : "Add Banner"}
        subtitle={`Banners > ${editBanner ? "Edit" : "Add"}`}
        previewImage={formData.image}
        submitText={editBanner ? "Update Banner" : "Add Banner"}
        onSubmit={handleSubmit}
      >
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Banner Title"
          className="w-full p-3 rounded-lg bg-white/5 border border-white/10 outline-none"
        />
        <textarea
          name="subtitle"
          value={formData.subtitle}
          onChange={handleChange}
          placeholder="Banner Subtitle"
          className="w-full h-24 p-3 rounded-lg bg-white/5 border border-white/10 outline-none resize-none"
        />
        <input
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full p-3 rounded-lg bg-white/5 border border-white/10 outline-none"
        />

        <div className="grid grid-cols-2 gap-3">
          <select
            name="placement"
            value={formData.placement}
            onChange={handleChange}
            className="p-3 rounded-lg bg-[#111827] border border-white/10 outline-none"
          >
            <option value="Home Hero">Home Hero</option>
            <option value="Offers Page">Offers Page</option>
          </select>

          <input
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            placeholder="Discount e.g. 40% OFF"
            className="p-3 rounded-lg bg-white/5 border border-white/10 outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <input
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            placeholder="Start Date e.g. 20 May"
            className="p-3 rounded-lg bg-white/5 border border-white/10 outline-none"
          />
          <input
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            placeholder="End Date e.g. 25 May"
            className="p-3 rounded-lg bg-white/5 border border-white/10 outline-none"
          />
        </div>

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

export default Banners;
