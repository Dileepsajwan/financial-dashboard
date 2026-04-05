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
    <nav className="bg-indigo-600 dark:bg-gray-900 text-white px-6 py-4 shadow-md flex justify-between items-center">
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
          className="px-3 py-2 rounded-lg bg-white/20 backdrop-blur-md hover:scale-105 transition"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        {/* Export */}
        <button
          onClick={exportJSON}
          className="px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition"
        >
          JSON
        </button>

        <button
          onClick={exportCSV}
          className="px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition"
        >
          CSV
        </button>

        {/* Add */}
        {role === "admin" && (
          <button
            onClick={onAddClick}
            className="px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition"
          >
            + Add
          </button>
        )}
      </div>
    </nav>
  );
}
