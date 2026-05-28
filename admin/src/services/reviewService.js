const API_URL = "http://localhost:5000/api/reviews";

export const getReviews = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const addReview = async (review) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  });

  return res.json();
};

export const updateReview = async (id, review) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  });

  return res.json();
};

export const deleteReview = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  return res.json();
};