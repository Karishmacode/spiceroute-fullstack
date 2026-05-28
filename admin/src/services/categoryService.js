const API_URL = import.meta.env.VITE_API_URL;

export const getCategories = async () => {
  const res = await fetch(`${API_URL}/categories`);
  return res.json();
};

export const addCategory = async (categoryData) => {
  const res = await fetch(`${API_URL}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categoryData),
  });

  return res.json();
};

export const updateCategory = async (id, categoryData) => {
  const res = await fetch(`${API_URL}/categories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categoryData),
  });

  return res.json();
};

export const deleteCategory = async (id) => {
  const res = await fetch(`${API_URL}/categories/${id}`, {
    method: "DELETE",
  });

  return res.json();
};