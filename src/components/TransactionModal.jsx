import React, { useState, useEffect } from "react";

export default function TransactionModal({
  isOpen,
  onClose,
  onSave,
  editData,
}) {
  const [form, setForm] = useState({
    amount: "",
    category: "",
    type: "expense",
  });

  useEffect(() => {
    if (editData) {
      setForm(editData);
    } else {
      setForm({ amount: "", category: "", type: "expense" });
    }
  }, [editData]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!form.amount || !form.category) {
      alert("Please fill all fields");
      return;
    }

    const newTransaction = {
      ...form,
      id: editData ? editData.id : Date.now(),
      date: editData ? editData.date : new Date().toISOString().split("T")[0],
      amount: Number(form.amount),
    };

    onSave(newTransaction);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl w-80 space-y-4">
        <h2 className="text-xl font-bold dark:text-white">
          {editData ? "Edit" : "Add"} Transaction
        </h2>

        <input
          type="number"
          placeholder="Amount"
          className="w-full border p-2 rounded-lg"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />

        <input
          placeholder="Category"
          className="w-full border p-2 rounded-lg"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <select
          className="w-full border p-2 rounded-lg"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <div className="flex justify-between">
          <button onClick={onClose}>Cancel</button>

          <button
            onClick={handleSubmit}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
