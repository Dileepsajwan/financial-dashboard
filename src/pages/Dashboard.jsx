import React, { useState, useMemo, useEffect } from "react";
import SummaryCards from "../components/SummaryCards";
import Charts from "../components/Charts";
import Transactions from "../components/Transactions";
import Insights from "../components/Insights";
import TransactionModal from "../components/TransactionModal";
import Toast from "../components/Toast";
import { sampleData } from "../data/SampleData";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [role, setRole] = useState("viewer");
  const [darkMode, setDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // 🌙 Dark Mode
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // 📦 Load Data
  useEffect(() => {
    const fetchData = () => {
      try {
        const stored = localStorage.getItem("transactions");

        let data = sampleData;

        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            data = parsed;
          }
        }

        setTimeout(() => {
          setTransactions(data);
          setLoading(false);
          setIsInitialized(true);
        }, 500);
      } catch (error) {
        console.error("Error loading data:", error);
        setTransactions(sampleData);
        setLoading(false);
        setIsInitialized(true);
      }
    };

    fetchData();
  }, []);

  // 💾 Save Data
  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions, isInitialized]);

  // 🔔 Toast
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  // 🔍 Filtering
  const filteredTx = useMemo(() => {
    let data = transactions;

    if (filter !== "all") {
      data = data.filter((t) => t.type === filter);
    }

    if (search) {
      data = data.filter((t) =>
        t.category.toLowerCase().includes(search.toLowerCase()),
      );
    }

    return data;
  }, [transactions, search, filter]);

  // 📊 Summary
  const summary = useMemo(() => {
    let income = 0,
      expense = 0;

    transactions.forEach((t) => {
      t.type === "income" ? (income += t.amount) : (expense += t.amount);
    });

    return { income, expense, balance: income - expense };
  }, [transactions]);

  // 📊 Category Data
  const categoryData = useMemo(() => {
    const map = {};
    transactions.forEach((t) => {
      if (t.type === "expense") {
        map[t.category] = (map[t.category] || 0) + t.amount;
      }
    });
    return Object.keys(map).map((k) => ({ name: k, value: map[k] }));
  }, [transactions]);

  // 📈 Trend Data
  const trendData = useMemo(() => {
    let balance = 0;
    return transactions.map((t) => {
      balance += t.type === "income" ? t.amount : -t.amount;
      return { date: t.date, balance };
    });
  }, [transactions]);

  const highestCategory = categoryData.sort((a, b) => b.value - a.value)[0];

  // CRUD
  const handleSave = (tx) => {
    if (editData) {
      setTransactions((prev) => prev.map((t) => (t.id === tx.id ? tx : t)));
      showToast("Transaction Updated ✅");
    } else {
      setTransactions((prev) => [...prev, tx]);
      showToast("Transaction Added ✅");
    }
    setEditData(null);
  };

  const handleEdit = (tx) => {
    setEditData(tx);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure?")) return;

    setTransactions((prev) => prev.filter((t) => t.id !== id));
    showToast("Transaction Deleted ❌");
  };

  // 📤 Export
  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(transactions, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.json";
    a.click();
  };

  const exportCSV = () => {
    const header = "date,category,amount,type\n";
    const rows = transactions
      .map((t) => `${t.date},${t.category},${t.amount},${t.type}`)
      .join("\n");

    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
  };

  // ⏳ Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading data...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Navbar */}
      <Navbar
        role={role}
        setRole={setRole}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        exportJSON={exportJSON}
        exportCSV={exportCSV}
        onAddClick={() => {
          setEditData(null);
          setIsModalOpen(true);
        }}
      />

      {/* Main */}
      <div className="min-h-screen bg-linear-to-br from-indigo-100 via-white to-purple-100 dark:from-gray-900 transition-all duration-500">
        <div className="max-w-6xl mx-auto p-4 space-y-6">
          {/* Dashboard */}
          <div id="dashboard">
            <SummaryCards summary={summary} />
          </div>

          {/* Charts */}
          <div id="charts">
            <Charts trendData={trendData} categoryData={categoryData} />
          </div>

          {/* Transactions */}
          <div id="transactions">
            <Transactions
              filteredTx={filteredTx}
              search={search}
              setSearch={setSearch}
              filter={filter}
              setFilter={setFilter}
              role={role}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>

          {/* Insights */}
          <div id="insights">
            <Insights highestCategory={highestCategory} summary={summary} />
          </div>

          {/* Modal */}
          <TransactionModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setEditData(null);
            }}
            onSave={handleSave}
            editData={editData}
          />

          {/* Toast */}
          <Toast message={toast} />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
