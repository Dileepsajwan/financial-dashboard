import React from "react";

export default function SummaryCards({ summary }) {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 shadow-md dark:shadow-black/40 rounded-2xl p-4 transition">
        <p className="text-gray-500">Balance</p>
        <h2 className="text-xl font-bold dark:text-white">
          ₹{summary.balance}
        </h2>
      </div>

      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 shadow-md dark:shadow-black/40 rounded-2xl p-4 transition">
        <p className="text-gray-500">Income</p>
        <h2 className="text-xl font-bold text-green-600">₹{summary.income}</h2>
      </div>

      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 shadow-md dark:shadow-black/40 rounded-2xl p-4 transition">
        <p className="text-gray-500">Expense</p>
        <h2 className="text-xl font-bold text-red-600">₹{summary.expense}</h2>
      </div>
    </div>
  );
}
