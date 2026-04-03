import React from "react";
export default function Transactions({
  filteredTx,
  search,
  setSearch,
  filter,
  setFilter,
  role,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-4">
      {/* 🔍 Controls */}
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          className="border p-2 rounded-lg w-full md:w-auto dark:bg-gray-700 dark:text-white"
          placeholder="Search category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded-lg dark:bg-gray-700 dark:text-white"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      {filteredTx.length === 0 ? (
        <p className="text-gray-500">No transactions found</p>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left">
              <th className="py-2">Date</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Type</th>
              {role === "admin" && <th>Actions</th>}
            </tr>
          </thead>

          <tbody>
            {filteredTx.map((t) => (
              <tr
                key={t.id}
                className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <td className="py-2">{t.date}</td>
                <td>{t.category}</td>
                <td>₹{t.amount}</td>
                <td
                  className={
                    t.type === "income" ? "text-green-600" : "text-red-600"
                  }
                >
                  {t.type}
                </td>
                {role === "admin" && (
                  <td className="flex gap-3">
                    <button
                      onClick={() => onEdit(t)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(t.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
