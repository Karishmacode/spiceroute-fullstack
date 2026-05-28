const API_URL = "http://localhost:5000/api/banners";

export const getBanners = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const addBanner = async (banner) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(banner),
  });

  return res.json();
};

export const updateBanner = async (id, banner) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(banner),
  });

  return res.json();
};

export const deleteBanner = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  return res.json();
};