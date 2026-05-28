
const StatusBadge = ({ children }) => {
  const type =
    children === "Preparing"
      ? "bg-yellow-500/15 text-yellow-400"
      : children === "Canceled" || children === "Inactive"
      ? "bg-red-500/15 text-red-400"
      : children === "Out for Delivery"
      ? "bg-blue-500/15 text-blue-400"
      : "bg-emerald-500/15 text-emerald-400";

  return (
    <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${type}`}>
      {children}
    </span>
  );
};

export default StatusBadge;