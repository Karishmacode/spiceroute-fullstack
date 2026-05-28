import StatusBadge from "../ui/StatusBadge";
import ActionButtons from "../ui/ActionButtons";

const RestaurantsTable = ({
  restaurants = [],
  onDelete,
  onEdit,
}) => {
  return (
    <div className="admin-card overflow-x-auto rounded-2xl border border-white/10">

      <div className="mb-4 p-4">
        <h2 className="text-lg font-black">
          Restaurants
        </h2>

        <p className="text-[10px] text-slate-500">
          Partner outlets management.
        </p>
      </div>

      <table className="w-full min-w-[700px] text-left">

       <thead className="bg-white/[0.03] border-b border-white/10">
          <tr className="text-slate-400">

            {[
              "Name",
              "Cuisine",
              "Rating",
              "Status",
              "Actions",
            ].map((item) => (
              <th
                key={item}
                className="py-2 px-4 text-[10px] font-bold"
              >
                {item}
              </th>
            ))}

          </tr>
        </thead>

        <tbody>

          {restaurants.length === 0 ? (
            <tr>
              <td
                colSpan="5"
                className="text-center py-10 text-slate-500"
              >
                No restaurants found
              </td>
            </tr>
          ) : (
            restaurants.map((restaurant) => (
              <tr
                key={restaurant._id}
                className="border-b border-white/[0.06]"
              >

                <td className="px-4 py-3 text-sm">
                  {restaurant.name}
                </td>

                <td className="px-4 py-3 text-sm text-slate-300">
                  {restaurant.cuisine}
                </td>

                <td className="px-4 py-3">

                  <div className="flex items-center gap-1 text-yellow-400">
                    ⭐
                    <span>
                      {restaurant.rating}
                    </span>
                  </div>

                </td>

                <td className="px-4 py-3">
                  <StatusBadge>
                    {restaurant.status || "Active"}
                  </StatusBadge>
                </td>

                <td className="px-4 py-3">

                  <ActionButtons
                    onEdit={() =>
                      onEdit &&
                      onEdit(restaurant)
                    }
                    onDelete={() =>
                      onDelete &&
                      onDelete(restaurant._id)
                    }
                  />

                </td>

              </tr>
            ))
          )}

        </tbody>

      </table>

      <div className="h-10 px-4 flex items-center justify-between text-xs text-slate-500 border-t border-white/10">
        <p>
          Showing {restaurants.length} restaurants
        </p>

        <button className="h-6 w-6 rounded-md border border-[#ff7a00] text-[#ff7a00]">
          1
        </button>
      </div>

    </div>
  );
};

export default RestaurantsTable;