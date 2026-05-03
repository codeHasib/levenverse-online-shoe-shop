"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  Trash2, 
  Star, 
  MessageSquare, 
  User, 
  Clock,
  CheckCircle2,
  Filter
} from "lucide-react";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [filter, setFilter] = useState("pending"); // pending, approved, all
  const [isLoading, setIsLoading] = useState(true);

  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/reviews?all=true", { cache: "no-store" });
      const data = await res.json();
      setReviews(data.reviews || []);
    } catch (err) {
      console.error("Error fetching reviews");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    fetchReviews();
  }, []);

  const approve = async (id) => {
    const res = await fetch(`/api/reviews/${id}`, { method: "PATCH" });
    if (res.ok) fetchReviews();
  };

  const remove = async (id) => {
    if (!window.confirm("Permanently delete this feedback?")) return;
    const res = await fetch(`/api/reviews/${id}`, { method: "DELETE" });
    if (res.ok) fetchReviews();
  };

  const filteredReviews = reviews.filter(r => {
    if (filter === "all") return true;
    return r.status === filter;
  });

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 pb-32">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter">
            Review <span className="text-[#0070f3]">Control</span>
          </h1>
          <p className="text-neutral-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-1">
            Maintain your brand's elite reputation
          </p>
        </div>

        {/* Tab Filter System */}
        <div className="flex bg-[#0a0a0a] border border-neutral-900 p-1.5 rounded-2xl">
          {["pending", "approved", "all"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                filter === tab 
                ? "bg-[#0070f3] text-white shadow-lg shadow-[#0070f3]/20" 
                : "text-neutral-500 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-[#0a0a0a] border border-neutral-900 p-5 rounded-3xl">
          <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Queue</p>
          <p className="text-2xl font-black italic">{reviews.filter(r => r.status === 'pending').length}</p>
        </div>
        <div className="bg-[#0a0a0a] border border-neutral-900 p-5 rounded-3xl">
          <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Live</p>
          <p className="text-2xl font-black italic text-[#0070f3]">{reviews.filter(r => r.status === 'approved').length}</p>
        </div>
      </div>

      {/* Review Feed */}
      <div className="space-y-4 max-w-4xl">
        <AnimatePresence mode="popLayout">
          {filteredReviews.length > 0 ? (
            filteredReviews.map((r) => (
              <motion.div
                key={r._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#0a0a0a] border border-neutral-900 rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row gap-6 hover:border-neutral-700 transition-colors relative group"
              >
                {/* Avatar/Initial */}
                <div className="w-14 h-14 bg-neutral-900 rounded-2xl flex items-center justify-center border border-neutral-800 text-[#0070f3] flex-shrink-0">
                  <User size={24} />
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-sm font-black uppercase tracking-tight">{r.name}</h3>
                    <div className="flex items-center gap-1 bg-black px-2 py-1 rounded-lg border border-neutral-800">
                      <Star size={10} className="fill-yellow-500 text-yellow-500" />
                      <span className="text-[10px] font-black">{r.rating}/5</span>
                    </div>
                    {r.status === "approved" && (
                      <span className="flex items-center gap-1 text-[9px] font-black uppercase text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md">
                        <CheckCircle2 size={10} /> Live
                      </span>
                    )}
                  </div>

                  <p className="text-neutral-400 text-sm leading-relaxed mb-4 italic">
                    "{r.comment}"
                  </p>

                  <div className="flex items-center gap-4">
                    <span className="text-[9px] text-neutral-600 font-bold uppercase tracking-tighter flex items-center gap-1">
                      <Clock size={12} /> Received Recently
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex md:flex-col gap-2 justify-end">
                  {r.status === "pending" && (
                    <button
                      onClick={() => approve(r._id)}
                      className="flex-1 md:flex-none bg-[#0070f3] hover:bg-white hover:text-black text-white p-3 rounded-xl transition-all flex items-center justify-center gap-2"
                      title="Approve Review"
                    >
                      <ShieldCheck size={18} />
                      <span className="md:hidden text-[10px] font-black uppercase">Approve</span>
                    </button>
                  )}
                  <button
                    onClick={() => remove(r._id)}
                    className="flex-1 md:flex-none bg-neutral-900 hover:bg-red-600 text-neutral-500 hover:text-white p-3 rounded-xl transition-all flex items-center justify-center gap-2"
                    title="Delete Review"
                  >
                    <Trash2 size={18} />
                    <span className="md:hidden text-[10px] font-black uppercase">Delete</span>
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="py-20 text-center border-2 border-dashed border-neutral-900 rounded-[3rem]">
              <MessageSquare size={40} className="mx-auto text-neutral-800 mb-4" />
              <p className="text-neutral-600 font-bold uppercase text-[10px] tracking-[0.2em]">
                {isLoading ? "Fetching data..." : "No reviews found in this category"}
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}