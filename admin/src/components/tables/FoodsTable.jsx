import StatusBadge from "../ui/StatusBadge";
import ActionButtons from "../ui/ActionButtons";

const FoodsTable = ({ foods = [], onDelete, onEdit }) => {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10">
      <table className="w-full min-w-[620px] text-left">
        <thead className="bg-white/[0.02] border-b border-white/10">
          <tr className="text-slate-400">
            {[
              "Food",
              "Restaurant",
              "Category",
              "Price",
              "Status",
              "Actions",
            ].map((item) => (
              <th key={item} className="py-2 px-3 text-[10px] font-bold">
                {item}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {foods.length === 0 ? (
            <tr>
              <td
                colSpan="6"
                className="px-3 py-8 text-center text-sm text-slate-500"
              >
                No foods found
              </td>
            </tr>
          ) : (
            foods.map((food) => (
              <tr key={food._id} className="border-b border-white/[0.06]">
                <td className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={food.image}
                      alt={food.name}
                      className="h-8 w-8 rounded-lg object-cover"
                    />

                    <span className="text-[12px] font-bold">{food.name}</span>
                  </div>
                </td>

                <td className="px-3 py-2 text-[12px] text-slate-300">
                  {food.restaurant || "N/A"}
                </td>

                <td className="px-3 py-2 text-[12px] text-slate-300">
                  {food.category}
                </td>

                <td className="px-3 py-2 text-[12px] font-bold">
                  ₹{food.price}
                </td>

                <td className="px-3 py-2">
                  <StatusBadge>{food.status || "Active"}</StatusBadge>
                </td>

                <td className="px-3 py-2">
                  <ActionButtons
                    onEdit={() => onEdit && onEdit(food)}
                    onDelete={() => onDelete && onDelete(food._id)}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="h-9 px-3 flex items-center justify-between text-[11px] text-slate-500 border-t border-white/10">
        <p>Showing {foods.length} food items</p>

        <div className="flex items-center gap-2">
          <button className="h-6 w-6 rounded-md border border-[#ff7a00] text-[#ff7a00]">
            1
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodsTable;
