const API_URL = import.meta.env.VITE_API_URL;

export const getFoods = async () => {
  const res = await fetch(`${API_URL}/foods`);
  return res.json();
};

export const addFood = async (foodData) => {
  const res = await fetch(`${API_URL}/foods`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(foodData),
  });

  return res.json();
};

export const updateFood = async (id, foodData) => {
  const res = await fetch(`${API_URL}/foods/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(foodData),
  });

  return res.json();
};

export const deleteFood = async (id) => {
  const res = await fetch(`${API_URL}/foods/${id}`, {
    method: "DELETE",
  });

  return res.json();
};