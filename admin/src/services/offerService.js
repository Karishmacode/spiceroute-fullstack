const API_URL = import.meta.env.VITE_API_URL;

export const getOffers = async () => {
  const res = await fetch(`${API_URL}/offers`);
  return res.json();
};

export const addOffer = async (offerData) => {
  const res = await fetch(`${API_URL}/offers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(offerData),
  });

  return res.json();
};

export const updateOffer = async (id, offerData) => {
  const res = await fetch(`${API_URL}/offers/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(offerData),
  });

  return res.json();
};

export const deleteOffer = async (id) => {
  const res = await fetch(`${API_URL}/offers/${id}`, {
    method: "DELETE",
  });

  return res.json();
};