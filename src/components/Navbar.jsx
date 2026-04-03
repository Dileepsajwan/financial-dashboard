import React from "react";

export default function Navbar({
  role,
  setRole,
  darkMode,
  setDarkMode,
  exportJSON,
  exportCSV,
  onAddClick,
}) {
  return (
    <nav className="sticky top-0 z-50 bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-lg px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <h1 className="text-xl font-bold text-white tracking-wide">
        💰 Finance Tracker
      </h1>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Role */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="p-2 rounded-lg bg-white/90 text-gray-800"
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>

        {/* Dark Mode */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-3 py-2 rounded-lg bg-black/40 text-white hover:scale-105 transition"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        {/* Export */}
        <button
          onClick={exportJSON}
          className="px-3 py-2 bg-green-500 text-white rounded-lg hover:scale-105 transition"
        >
          JSON
        </button>

        <button
          onClick={exportCSV}
          className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:scale-105 transition"
        >
          CSV
        </button>

        {/* Add */}
        {role === "admin" && (
          <button
            onClick={onAddClick}
            className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:scale-105 transition"
          >
            + Add
          </button>
        )}
      </div>
    </nav>
  );
}
