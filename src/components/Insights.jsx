import React from "react";

export default function Insights({ highestCategory, summary }) {
  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 shadow-md dark:shadow-black/40 rounded-2xl p-4 transition">
      <h2 className="font-semibold mb-2 dark:text-white">Insights</h2>

      <p>Top Spending Category: {highestCategory?.name || "N/A"}</p>

      <p className="mt-1">
        Balance is
        <span
          className={summary.balance > 0 ? "text-green-600" : "text-red-600"}
        >
          {summary.balance > 0 ? " positive" : " negative"}
        </span>
      </p>
    </div>
  );
}
