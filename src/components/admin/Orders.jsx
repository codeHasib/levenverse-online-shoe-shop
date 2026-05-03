"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package,
  MapPin,
  Phone,
  Check,
  X,
  Truck,
  Clock,
  ChevronDown,
} from "lucide-react";
import { redirect } from "next/navigation";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchOrders = async () => {
    const res = await fetch("/api/orders", {cache: "no-store"});
    const data = await res.json();
    setOrders(data.orders || []);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    setUpdatingId(id);
    await fetch(`/api/orders/${id}`, {
      cache: "no-store",
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    await fetchOrders();
    setUpdatingId(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
      case "delivered":
        return "text-[#0070f3] bg-[#0070f3]/10 border-[#0070f3]/20";
      case "declined":
        return "text-red-400 bg-red-400/10 border-red-400/20";
      default:
        return "text-amber-400 bg-amber-400/10 border-amber-400/20";
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 lg:p-10 pb-28">
      <header className="mb-10">
        <h1 className="text-3xl font-black italic uppercase tracking-tighter">
          Order <span className="text-[#0070f3]">Logistics</span>
        </h1>
        <div className="flex items-center gap-2 mt-2">
          <div className="w-2 h-2 rounded-full bg-[#0070f3] animate-pulse" />
          <p className="text-neutral-500 text-[10px] font-bold uppercase tracking-[0.2em]">
            Live Manifest: {orders.length} Active Shipments
          </p>
        </div>
      </header>

      <div className="space-y-4 max-w-4xl mx-auto">
        <AnimatePresence mode="popLayout">
          {orders.map((order) => (
            <motion.div
              key={order._id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`bg-[#0a0a0a] border border-neutral-900 rounded-2xl overflow-hidden transition-opacity ${updatingId === order._id ? "opacity-50" : "opacity-100"}`}
            >
              {/* Card Header */}
              <div className="p-5 flex justify-between items-start border-b border-neutral-900/50">
                <div>
                  <h2 className="text-lg font-black uppercase tracking-tight italic">
                    {order.customerName}
                  </h2>
                  <div className="flex items-center gap-3 mt-1 text-neutral-500">
                    <span className="flex items-center gap-1 text-[10px] font-bold">
                      <Phone size={12} className="text-[#0070f3]" />{" "}
                      {order.phone}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest">
                      <MapPin size={12} className="text-[#0070f3]" />{" "}
                      {order.location}
                    </span>
                  </div>
                </div>
                <div
                  className={`px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${getStatusColor(order.status)}`}
                >
                  {order.status}
                </div>
              </div>

              {/* Items List */}
              <div className="p-5 bg-neutral-900/20">
                <div className="space-y-3">
                  {order.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center bg-black/40 p-3 rounded-xl border border-neutral-800"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center">
                          <Package size={18} className="text-neutral-500" />
                        </div>
                        <div>
                          <p className="text-sm font-bold uppercase tracking-tight">
                            {item.title}
                          </p>
                          <p className="text-[10px] text-[#0070f3] font-black uppercase">
                            Size: {item.size}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm font-bold italic">
                        x{item.quantity}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex justify-between items-end">
                  <div>
                    <p className="text-neutral-600 text-[10px] font-black uppercase">
                      Grand Total
                    </p>
                    <p className="text-2xl font-black italic tracking-tighter">
                      QAR {order.totalPrice}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {order.status !== "declined" &&
                      order.status !== "delivered" && (
                        <button
                          onClick={() => updateStatus(order._id, "declined")}
                          className="p-3 bg-neutral-900 hover:bg-red-500/20 text-neutral-500 hover:text-red-500 rounded-xl border border-neutral-800 transition-all shadow-lg active:scale-90"
                        >
                          <X size={20} />
                        </button>
                      )}

                    {order.status === "pending" && (
                      <button
                        onClick={() => updateStatus(order._id, "approved")}
                        className="flex items-center gap-2 px-6 py-3 bg-white text-black font-black uppercase text-xs tracking-widest rounded-xl hover:bg-[#0070f3] hover:text-white transition-all shadow-lg active:scale-90"
                      >
                        <Check size={18} /> Approve
                      </button>
                    )}

                    {order.status === "approved" && (
                      <button
                        onClick={() => updateStatus(order._id, "delivered")}
                        className="flex items-center gap-2 px-6 py-3 bg-[#0070f3] text-white font-black uppercase text-xs tracking-widest rounded-xl hover:shadow-[0_0_20px_rgba(0,112,243,0.4)] transition-all shadow-lg active:scale-90"
                      >
                        <Truck size={18} /> Deliver
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
