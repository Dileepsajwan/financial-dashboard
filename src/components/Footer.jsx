import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 ">
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
        {/* 🔹 Brand */}
        <div>
          <h2 className="text-xl font-bold text-white mb-2">
            💰 Finance Tracker
          </h2>
          <p className="text-sm text-gray-400">
            Track your income, expenses, and financial insights with a clean and
            modern dashboard.
          </p>
        </div>

        {/* 🔹 Quick Links */}
        <ul className="space-y-2 text-sm">
          <li
            onClick={() =>
              document
                .getElementById("dashboard")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="hover:text-white transition cursor-pointer"
          >
            Dashboard
          </li>

          <li
            onClick={() =>
              document
                .getElementById("transactions")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="hover:text-white transition cursor-pointer"
          >
            Transactions
          </li>

          <li
            onClick={() =>
              document
                .getElementById("charts")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="hover:text-white transition cursor-pointer"
          >
            Charts
          </li>

          <li
            onClick={() =>
              document
                .getElementById("insights")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="hover:text-white transition cursor-pointer"
          >
            Insights
          </li>
        </ul>

        {/* 🔹 Contact / Info */}
        <div>
          <h3 className="text-white font-semibold mb-3">Contact</h3>
          <p className="text-sm text-gray-400">📧 dileepsajwan@gmail.com</p>
          <p className="text-sm text-gray-400 mt-1">📍 India</p>

          <div className="flex gap-3 mt-3">
            <span className="hover:text-indigo-400 cursor-pointer">🌐</span>
            <span className="hover:text-indigo-400 cursor-pointer">🐦</span>
            <span className="hover:text-indigo-400 cursor-pointer">💼</span>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} Finance Tracker • All rights reserved
      </div>
    </footer>
  );
}
