import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Charts({ trendData, categoryData }) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {/* Line Chart */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-4">
        <h2 className="font-semibold mb-2 dark:text-white">Balance Trend</h2>

        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={trendData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="balance" stroke="#6366f1" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-4">
        <h2 className="font-semibold mb-2 dark:text-white">
          Spending Breakdown
        </h2>

        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={categoryData} dataKey="value" outerRadius={80}>
              {categoryData.map((_, i) => (
                <Cell key={i} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
