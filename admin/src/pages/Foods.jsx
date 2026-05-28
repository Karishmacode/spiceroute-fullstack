import { useEffect, useState } from "react";

import PageHeader from "../components/ui/PageHeader";
import SearchInput from "../components/ui/SearchInput";
import FoodsTable from "../components/tables/FoodsTable";
import AdminModal from "../components/ui/AdminModal";

import {
  getFoods,
  addFood,
  updateFood,
  deleteFood,
} from "../services/foodService";

const Foods = () => {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [restaurant, setRestaurant] = useState("All");
  const [openModal, setOpenModal] = useState(false);
  const [editFood, setEditFood] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    restaurant: "",
    category: "",
    price: "",
    desc: "",
    image: "",
    status: "Active",
  });

  const loadFoods = async () => {
    try {
      const data = await getFoods();
      setFoods(Array.isArray(data) ? data : data.foods || []);
    } catch (error) {
      console.log("Foods fetch error:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      restaurant: "",
      category: "",
      price: "",
      desc: "",
      image: "",
      status: "Active",
    });
  };

  const handleOpenAdd = () => {
    setEditFood(null);
    resetForm();
    setOpenModal(true);
  };

  const handleEdit = (food) => {
    setEditFood(food);
    setFormData({
      name: food.name || "",
      restaurant: food.restaurant || "",
      category: food.category || "",
      price: food.price || "",
      desc: food.desc || "",
      image: food.image || "",
      status: food.status || "Active",
    });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditFood(null);
    resetForm();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.category ||
      !formData.price ||
      !formData.desc ||
      !formData.image
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
      };

      if (editFood) {
        await updateFood(editFood._id, payload);
      } else {
        await addFood(payload);
      }

      await loadFoods();
      handleCloseModal();
    } catch (error) {
      console.log("Food submit error:", error);
      alert("Something went wrong. Check console.");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this food?"
    );

    if (!confirmDelete) return;

    try {
      await deleteFood(id);
      loadFoods();
    } catch (error) {
      console.log("Delete food error:", error);
    }
  };

  useEffect(() => {
    loadFoods();
  }, []);

  const categories = [
    "All",
    ...new Set(foods.map((food) => food.category).filter(Boolean)),
  ];

  const restaurants = [
    "All",
    ...new Set(foods.map((food) => food.restaurant).filter(Boolean)),
  ];

  const filteredFoods = foods.filter((food) => {
    const matchSearch = food.name
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory = category === "All" || food.category === category;

    const matchRestaurant =
      restaurant === "All" || food.restaurant === restaurant;

    return matchSearch && matchCategory && matchRestaurant;
  });

  return (
    <div className="space-y-5 pr-2">
      <section className="admin-panel p-5">
        <PageHeader
          title="Foods"
          desc="Manage all food items here."
          buttonText="+ Add Food"
          onClick={handleOpenAdd}
        />

        <div className="mt-5 grid grid-cols-1 lg:grid-cols-[1fr_170px_190px] gap-3">
          <SearchInput
            placeholder="Search foods..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-11 rounded-xl bg-[#0b1220] border border-white/10 px-4 outline-none text-sm text-slate-300 focus:border-[#ff7a00]/50"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item === "All" ? "All Categories" : item}
              </option>
            ))}
          </select>

          <select
            value={restaurant}
            onChange={(e) => setRestaurant(e.target.value)}
            className="h-11 rounded-xl bg-[#0b1220] border border-white/10 px-4 outline-none text-sm text-slate-300 focus:border-[#ff7a00]/50"
          >
            {restaurants.map((item) => (
              <option key={item} value={item}>
                {item === "All" ? "All Restaurants" : item}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-5">
          <FoodsTable
            foods={filteredFoods}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </div>
      </section>

      <AdminModal
        open={openModal}
        onClose={handleCloseModal}
        title={editFood ? "Edit Food" : "Add Food"}
        subtitle={`Foods > ${editFood ? "Edit" : "Add"}`}
        previewImage={formData.image}
        submitText={editFood ? "Update Food" : "Add Food"}
        onSubmit={handleSubmit}
      >
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Food Name"
          className="w-full p-3 rounded-lg bg-white/5 border border-white/10 outline-none"
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            name="restaurant"
            value={formData.restaurant}
            onChange={handleChange}
            placeholder="Restaurant"
            className="p-3 rounded-lg bg-white/5 border border-white/10 outline-none"
          />

          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            className="p-3 rounded-lg bg-white/5 border border-white/10 outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <input
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            type="number"
            className="p-3 rounded-lg bg-white/5 border border-white/10 outline-none"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="p-3 rounded-lg bg-[#111827] border border-white/10 outline-none"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <textarea
          name="desc"
          value={formData.desc}
          onChange={handleChange}
          placeholder="Description"
          className="w-full h-28 p-3 rounded-lg bg-white/5 border border-white/10 outline-none resize-none"
        />

        <input
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full p-3 rounded-lg bg-white/5 border border-white/10 outline-none"
        />
      </AdminModal>
    </div>
  );
};

export default Foods;