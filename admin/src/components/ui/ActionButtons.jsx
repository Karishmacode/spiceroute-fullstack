import { Pencil, Trash2 } from "lucide-react";

const ActionButtons = ({
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex items-center gap-2">

      {/* Edit */}
      <button
        onClick={onEdit}
        className="h-7 w-7 rounded-lg bg-white/5 hover:bg-blue-500/20 hover:text-blue-400 flex items-center justify-center transition"
      >
        <Pencil size={13} />
      </button>

      {/* Delete */}
      <button
        onClick={onDelete}
        className="h-7 w-7 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 flex items-center justify-center transition"
      >
        <Trash2 size={13} />
      </button>

    </div>
  );
};

export default ActionButtons;