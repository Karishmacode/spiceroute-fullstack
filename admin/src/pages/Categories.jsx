import { useEffect, useState } from "react";

import PageHeader from "../components/ui/PageHeader";
import SearchInput from "../components/ui/SearchInput";
import AdminModal from "../components/ui/AdminModal";
import StatusBadge from "../components/ui/StatusBadge";
import ActionButtons from "../components/ui/ActionButtons";

import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../services/categoryService";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    items: "",
    status: "Active",
  });

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(Array.isArray(data) ? data : data.categories || []);
    } catch (error) {
      console.log("Categories fetch error:", error);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const resetForm = () => {
    setFormData({
      name: "",
      items: "",
      status: "Active",
    });
  };

  const handleOpenAdd = () => {
    setEditCategory(null);
    resetForm();
    setOpenModal(true);
  };

  const handleEdit = (category) => {
    setEditCategory(category);

    setFormData({
      name: category.name || "",
      items: category.items || "",
      status: category.status || "Active",
    });

    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditCategory(null);
    resetForm();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!formData.name) {
      alert("Please enter category name");
      return;
    }

    try {
      const payload = {
        ...formData,
        items: Number(formData.items || 0),
      };

      if (editCategory) {
        await updateCategory(editCategory._id, payload);
      } else {
        await addCategory(payload);
      }

      await loadCategories();
      handleCloseModal();
    } catch (error) {
      console.log("Category submit error:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmDelete) return;

    try {
      await deleteCategory(id);
      loadCategories();
    } catch (error) {
      console.log("Delete category error:", error);
    }
  };

  const filteredCategories = categories.filter((category) =>
    category.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5 pr-2">
      <section className="admin-panel p-5">
        <PageHeader
          title="Categories"
          desc="Manage all food categories here."
          buttonText="+ Add Category"
          onClick={handleOpenAdd}
        />

        <div className="mt-5">
          <SearchInput
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="mt-5 overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[600px] text-left">
            <thead className="bg-white/[0.03] border-b border-white/10">
              <tr className="text-slate-400">
                {["Name", "Items", "Status", "Actions"].map((item) => (
                  <th key={item} className="py-3 px-4 text-[11px] font-bold">
                    {item}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-slate-500">
                    No categories found
                  </td>
                </tr>
              ) : (
                filteredCategories.map((category) => (
                  <tr key={category._id} className="border-b border-white/[0.06]">
                    <td className="px-4 py-3 text-sm font-bold">
                      {category.name}
                    </td>

                    <td className="px-4 py-3 text-sm text-slate-300">
                      {category.items || 0}
                    </td>

                    <td className="px-4 py-3">
                      <StatusBadge>{category.status || "Active"}</StatusBadge>
                    </td>

                    <td className="px-4 py-3">
                      <ActionButtons
                        onEdit={() => handleEdit(category)}
                        onDelete={() => handleDelete(category._id)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="h-10 px-4 flex items-center justify-between text-xs text-slate-500 border-t border-white/10">
            <p>Showing {filteredCategories.length} categories</p>
            <button className="h-6 w-6 rounded-md border border-[#ff7a00] text-[#ff7a00]">
              1
            </button>
          </div>
        </div>
      </section>

      <AdminModal
        open={openModal}
        onClose={handleCloseModal}
        title={editCategory ? "Edit Category" : "Add Category"}
        subtitle={`Categories > ${editCategory ? "Edit" : "Add"}`}
        submitText={editCategory ? "Update Category" : "Add Category"}
        onSubmit={handleSubmit}
      >
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Category Name"
          className="w-full p-3 rounded-lg bg-white/5 border border-white/10 outline-none"
        />

        <input
          name="items"
          value={formData.items}
          onChange={handleChange}
          placeholder="Items Count"
          type="number"
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

export default Categories;