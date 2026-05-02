"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  ShoppingBag,
  CheckCircle2,
  Calendar,
  Filter,
  ArrowUpRight,
} from "lucide-react";
import { redirect } from "next/navigation";

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    let url = "/api/orders";
    if (startDate && endDate) {
      url += `?startDate=${startDate}&endDate=${endDate}`;
    }

    try {
      const res = await fetch(url);
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (err) {
      console.error("Fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Stats Logic
  const totalSales = orders
    .filter((o) => o.status === "delivered")
    .reduce((sum, o) => sum + o.totalPrice, 0);

  const totalOrders = orders.length;
  const approvedOrders = orders.filter((o) => o.status === "approved").length;

  const stats = [
    {
      label: "Total Sales",
      value: `QAR ${totalSales.toLocaleString()}`,
      icon: TrendingUp,
      color: "text-[#0070f3]",
      bg: "bg-[#0070f3]/10",
    },
    {
      label: "Total Orders",
      value: totalOrders,
      icon: ShoppingBag,
      color: "text-white",
      bg: "bg-neutral-800",
    },
    {
      label: "Approved",
      value: approvedOrders,
      icon: CheckCircle2,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6 lg:p-10 pb-24 lg:pb-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10"
      >
        <div>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter">
            Executive <span className="text-[#0070f3]">Overview</span>
          </h1>
          <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest mt-1">
            LevenVerse Real-time Metrics
          </p>
        </div>

        {/* Date Filters - Mobile Optimized */}
        <div className="flex flex-wrap items-center gap-3 bg-[#0a0a0a] p-2 rounded-2xl border border-neutral-900">
          <div className="flex items-center gap-2 px-3 py-2 bg-black rounded-xl border border-neutral-800">
            <Calendar size={16} className="text-[#0070f3]" />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-transparent text-xs font-bold uppercase outline-none w-28"
            />
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-black rounded-xl border border-neutral-800">
            <Calendar size={16} className="text-[#0070f3]" />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-transparent text-xs font-bold uppercase outline-none w-28"
            />
          </div>
          <button
            onClick={fetchOrders}
            className="bg-[#0070f3] hover:bg-[#0070f3]/80 text-white p-3 rounded-xl transition-all active:scale-95"
          >
            <Filter size={18} />
          </button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="relative overflow-hidden bg-[#0a0a0a] border border-neutral-900 p-6 rounded-3xl group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`${stat.bg} ${stat.color} p-3 rounded-2xl`}>
                <stat.icon size={24} />
              </div>
              <ArrowUpRight
                size={20}
                className="text-neutral-700 group-hover:text-[#0070f3] transition-colors"
              />
            </div>

            <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest">
              {stat.label}
            </p>
            <h2 className="text-3xl font-black italic mt-1 tracking-tight">
              {loading ? "..." : stat.value}
            </h2>

            {/* Decorative "Speed" line in card */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#0070f3]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>

      {/* Recent Activity Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-10 bg-[#0a0a0a] border border-neutral-900 rounded-3xl p-8"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold uppercase tracking-tighter italic">
            Recent Orders
          </h3>
          <button className="text-[#0070f3] text-xs font-black uppercase tracking-widest hover:underline">
            View All
          </button>
        </div>

        {orders.length === 0 ? (
          <div className="py-10 text-center text-neutral-600 italic">
            No orders found for the selected period.
          </div>
        ) : (
          <div className="overflow-x-auto">
            {/* Table code would go here, optimized for mobile with cards */}
            <p className="text-sm text-neutral-400">
              Displaying {orders.length} transactions.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
