import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const OrdersOverviewChart = ({ orders = [] }) => {
  const chartData = days.map((day) => ({
    day,
    orders: 0,
  }));

  orders.forEach((order) => {
    const date = new Date(order.createdAt);
    const dayName = days[date.getDay()];

    const item = chartData.find((data) => data.day === dayName);

    if (item) {
      item.orders += 1;
    }
  });

  return (
    <div className="admin-card p-5 h-[320px]">
      <div className="flex justify-between mb-4">
        <h2 className="text-base font-black">Orders Overview</h2>

        <button className="rounded-lg bg-white/5 border border-white/10 px-3 py-1.5 text-xs">
          This Week ▾
        </button>
      </div>

      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={chartData}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.05)"
            vertical={false}
          />

          <XAxis
            dataKey="day"
            stroke="#64748b"
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            stroke="#64748b"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "none",
              borderRadius: "8px",
              fontSize: "12px",
              color: "#fff",
            }}
          />

          <Line
            type="monotone"
            dataKey="orders"
            stroke="var(--admin-primary)"
            strokeWidth={3}
            dot={{
              r: 4,
              fill: "var(--admin-primary)",
              strokeWidth: 0,
            }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrdersOverviewChart;