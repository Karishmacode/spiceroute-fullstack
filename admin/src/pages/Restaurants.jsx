import { useEffect, useState } from "react";

import PageHeader from "../components/ui/PageHeader";
import SearchInput from "../components/ui/SearchInput";
import RestaurantsTable from "../components/tables/RestaurantsTable";
import AdminModal from "../components/ui/AdminModal";

import {
  getRestaurants,
  addRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from "../services/restaurantService";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editRestaurant, setEditRestaurant] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    cuisine: "",
    rating: "",
    image: "",
    status: "Active",
  });

  const loadRestaurants = async () => {
    try {
      const data = await getRestaurants();
      setRestaurants(Array.isArray(data) ? data : data.restaurants || []);
    } catch (error) {
      console.log("Restaurants fetch error:", error);
    }
  };

  useEffect(() => {
    loadRestaurants();
  }, []);

  const resetForm = () => {
    setFormData({
      name: "",
      cuisine: "",
      rating: "",
      image: "",
      status: "Active",
    });
  };

  const handleOpenAdd = () => {
    resetForm();
    setEditRestaurant(null);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditRestaurant(null);
    resetForm();
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this restaurant?"
    );

    if (!confirmDelete) return;

    try {
      await deleteRestaurant(id);
      loadRestaurants();
    } catch (error) {
      console.log("Delete restaurant error:", error);
    }
  };

  const handleEdit = (restaurant) => {
    setEditRestaurant(restaurant);

    setFormData({
      name: restaurant.name || "",
      cuisine: restaurant.cuisine || "",
      rating: restaurant.rating || "",
      image: restaurant.image || "",
      status: restaurant.status || "Active",
    });

    setOpenModal(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.cuisine || !formData.rating) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const payload = {
        ...formData,
        rating: Number(formData.rating),
      };

      if (editRestaurant) {
        await updateRestaurant(editRestaurant._id, payload);
      } else {
        await addRestaurant(payload);
      }

      await loadRestaurants();
      handleCloseModal();
    } catch (error) {
      console.log("Restaurant submit error:", error);
      alert("Something went wrong. Check console.");
    }
  };

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const name = restaurant.name || "";
    const cuisine = restaurant.cuisine || "";

    return (
      name.toLowerCase().includes(search.toLowerCase()) ||
      cuisine.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="space-y-5 pr-2">
      <section className="admin-panel p-5">
        <PageHeader
          title="Restaurants"
          desc="Manage all restaurants here."
          buttonText="+ Add Restaurant"
          onClick={handleOpenAdd}
        />

        <div className="mt-5">
          <SearchInput
            placeholder="Search restaurants..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="mt-5">
          <RestaurantsTable
            restaurants={filteredRestaurants}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </div>
      </section>

      <AdminModal
        open={openModal}
        onClose={handleCloseModal}
        title={editRestaurant ? "Edit Restaurant" : "Add Restaurant"}
        subtitle={`Restaurants > ${editRestaurant ? "Edit" : "Add"}`}
        previewImage={formData.image}
        submitText={editRestaurant ? "Update Restaurant" : "Add Restaurant"}
        onSubmit={handleSubmit}
      >
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Restaurant Name"
          className="w-full p-3 rounded-lg bg-white/5 border border-white/10 outline-none"
        />

        <input
          name="cuisine"
          value={formData.cuisine}
          onChange={handleChange}
          placeholder="Cuisine"
          className="w-full p-3 rounded-lg bg-white/5 border border-white/10 outline-none"
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            placeholder="Rating"
            type="number"
            step="0.1"
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

export default Restaurants;