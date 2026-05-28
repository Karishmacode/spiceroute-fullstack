const API_URL = import.meta.env.VITE_API_URL;

export const getRestaurants = async () => {
  const res = await fetch(`${API_URL}/restaurants`);
  return res.json();
};

export const addRestaurant = async (restaurantData) => {
  const res = await fetch(`${API_URL}/restaurants`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(restaurantData),
  });

  return res.json();
};

export const updateRestaurant = async (id, restaurantData) => {
  const res = await fetch(`${API_URL}/restaurants/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(restaurantData),
  });

  return res.json();
};

export const deleteRestaurant = async (id) => {
  const res = await fetch(`${API_URL}/restaurants/${id}`, {
    method: "DELETE",
  });

  return res.json();
};