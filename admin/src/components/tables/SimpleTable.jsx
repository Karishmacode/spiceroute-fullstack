import { Eye } from "lucide-react";
import StatusBadge from "../ui/StatusBadge";
import ActionButtons from "../ui/ActionButtons";

const SimpleTable = ({ title, desc, columns, rows, addLabel, type }) => (
  <div className="admin-card p-4 overflow-hidden h-full">
    <div className="flex justify-between items-start mb-4 gap-3">
      <div>
        <h3 className="font-black text-[15px]">{title}</h3>
        <p className="text-[10px] text-slate-500">{desc}</p>
      </div>
      {addLabel && (
        <button className="px-3 py-2 rounded-lg bg-[#ff7a00] text-white text-[11px] font-bold">
          + {addLabel}
        </button>
      )}
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left min-w-[400px]">
        <thead>
          <tr className="border-b border-white/10 text-slate-400">
            {columns.map((col) => (
              <th key={col} className="py-2 text-[11px] font-bold">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="border-b border-white/[0.06]">
              {row.map((cell, i) => (
                <td
                  key={i}
                  className="py-3 text-[11px] text-slate-300 whitespace-nowrap"
                >
                  {[
                    "Active",
                    "Inactive",
                    "Delivered",
                    "Preparing",
                    "Canceled",
                    "Out for Delivery",
                  ].includes(cell) ? (
                    <StatusBadge>{cell}</StatusBadge>
                  ) : i === 2 && type === "restaurants" ? (
                    <span className="text-yellow-400">★ {cell}</span>
                  ) : (
                    cell
                  )}
                </td>
              ))}
              <td>
                {type === "orders" ? (
                  <button className="h-7 w-7 rounded-lg bg-white/5 flex items-center justify-center">
                    <Eye size={13} />
                  </button>
                ) : (
                  <ActionButtons />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default SimpleTable;