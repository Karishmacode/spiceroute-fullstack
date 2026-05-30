import { useEffect, useState } from "react";

import PageHeader from "../components/ui/PageHeader";
import SearchInput from "../components/ui/SearchInput";
import SimpleTable from "../components/tables/SimpleTable";

const API_URL = "https://spiceroute-fullstack.onrender.com/api/reviews";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [search, setSearch] = useState("");

  const loadReviews = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();

      setReviews(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Reviews fetch error:", error);
      setReviews([]);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const filteredReviews = reviews.filter((review) => {
    const searchText = search.toLowerCase();

    return (
      review.customerName?.toLowerCase().includes(searchText) ||
      review.foodName?.toLowerCase().includes(searchText) ||
      review.comment?.toLowerCase().includes(searchText) ||
      review.status?.toLowerCase().includes(searchText)
    );
  });

  const reviewRows = filteredReviews.map((review) => [
    review.customerName || "Guest User",
    review.foodName || "Food Order",
    `${review.rating} ⭐`,
    review.status || "Published",
  ]);

  return (
    <div className="space-y-5 pr-2">
      <section className="admin-panel p-5">
        <PageHeader
          title="Reviews"
          desc="Manage customer reviews."
        />

        <div className="admin-panel p-5 mt-5">
          <div className="mb-5">
            <SearchInput
              placeholder="Search reviews..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <SimpleTable
            title="Reviews"
            desc="Customer feedback ratings and status."
            columns={["Customer", "Food", "Rating", "Status", "Actions"]}
            rows={reviewRows}
          />
        </div>
      </section>
    </div>
  );
};

export default Reviews;