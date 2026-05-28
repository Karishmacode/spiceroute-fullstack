const API_URL = import.meta.env.VITE_API_URL;

export const getOrders = async () => {
  const res = await fetch(`${API_URL}/orders`);
  return res.json();
};

export const addOrder = async (orderData) => {
  const res = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });

  return res.json();
};

export const updateOrder = async (id, orderData) => {
  const res = await fetch(`${API_URL}/orders/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });

  return res.json();
};

export const deleteOrder = async (id) => {
  const res = await fetch(`${API_URL}/orders/${id}`, {
    method: "DELETE",
  });

  return res.json();
};