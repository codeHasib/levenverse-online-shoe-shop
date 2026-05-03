"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MessageSquare, User, Clock, CheckCircle2, Send, Plus, X } from "lucide-react";

export default function ProductReviews({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    rating: 5,
    comment: "",
  });

  const fetchReviews = async () => {
    try {
      const res = await fetch(`/api/reviews?productId=${productId}`, { cache: "no-store" });
      const data = await res.json();
      setReviews(data.reviews || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (productId) fetchReviews();
  }, [productId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.rating || !form.comment) {
      alert("Please complete all fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          ...form,
          rating: Number(form.rating),
        }),
      });

      const data = await res.json();
      if (data.success) {
        alert("Your feedback has been received and is awaiting moderation.");
        setForm({ name: "", rating: 5, comment: "" });
        setShowForm(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-16">
      {/* --- SECTION HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-[12px] tracking-[0.6em] uppercase font-medium text-black mb-3">
            Product Experience
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-2xl tracking-tighter font-light">
              {reviews.length > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) : "0.0"}
            </span>
            <div className="flex text-[#0070f3]">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" strokeWidth={0} className="opacity-80" />)}
            </div>
            <span className="text-[10px] text-neutral-400 tracking-widest uppercase">
              ({reviews.length} Verified Entries)
            </span>
          </div>
        </div>

        <button 
          onClick={() => setShowForm(!showForm)}
          className="group flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase border border-neutral-200 px-8 py-4 hover:bg-black hover:text-white transition-all duration-500"
        >
          {showForm ? "Cancel" : "Share Experience"} 
          {showForm ? <X size={14} /> : <Plus size={14} className="group-hover:rotate-90 transition-transform" />}
        </button>
      </div>

      {/* --- ANIMATED SUBMISSION FORM --- */}
      <AnimatePresence>
        {showForm && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-b border-neutral-100"
          >
            <div className="bg-[#fcfcfc] p-8 md:p-12 mb-12 space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[9px] tracking-widest uppercase text-neutral-400">Full Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full bg-transparent border-b border-neutral-200 py-2 text-[11px] tracking-widest uppercase focus:outline-none focus:border-[#0070f3] transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] tracking-widest uppercase text-neutral-400">Rating Score</label>
                  <select
                    name="rating"
                    value={form.rating}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-neutral-200 py-2 text-[11px] tracking-widest uppercase focus:outline-none focus:border-[#0070f3] cursor-pointer appearance-none"
                  >
                    {[5, 4, 3, 2, 1].map((n) => (
                      <option key={n} value={n} className="text-black">{n} Star Selection</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] tracking-widest uppercase text-neutral-400">Your Feedback</label>
                <textarea
                  name="comment"
                  value={form.comment}
                  onChange={handleChange}
                  placeholder="Describe your experience with the product..."
                  rows={3}
                  className="w-full bg-transparent border-b border-neutral-200 py-2 text-[11px] tracking-widest uppercase focus:outline-none focus:border-[#0070f3] transition-colors resize-none"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-[#0070f3] text-white text-[10px] tracking-[0.5em] uppercase px-12 py-5 flex items-center justify-center gap-4 hover:bg-blue-600 transition-all disabled:bg-neutral-200"
              >
                {loading ? "Processing..." : "Submit for Approval"} <Send size={12} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- REVIEWS LIST --- */}
      <div className="grid gap-12">
        <AnimatePresence mode="popLayout">
          {reviews.length > 0 ? (
            reviews.map((r) => (
              <motion.div
                key={r._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative border-b border-neutral-100 pb-12"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-neutral-50 rounded-full flex items-center justify-center text-[#0070f3] border border-neutral-100">
                      <User size={18} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="text-[11px] tracking-[0.2em] uppercase font-bold text-black">{r.name}</h4>
                      <p className="text-[9px] text-neutral-400 tracking-tighter uppercase flex items-center gap-1 mt-1">
                        <CheckCircle2 size={10} className="text-emerald-500" /> Verified Experience
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-0.5 text-[#0070f3]">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} size={10} fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>
                </div>

                <p className="text-[13px] leading-relaxed text-neutral-600 font-light italic pl-16">
                  "{r.comment}"
                </p>

                <div className="mt-6 pl-16 flex items-center gap-4 text-neutral-300">
                   <span className="text-[9px] tracking-widest uppercase flex items-center gap-1">
                      <Clock size={10} /> Recently Published
                   </span>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="py-24 text-center border-t border-dashed border-neutral-100">
              <MessageSquare size={32} className="mx-auto text-neutral-100 mb-6" />
              <p className="text-neutral-400 font-bold uppercase text-[9px] tracking-[0.4em]">
                {loading ? "Refreshing Gallery..." : "Be the first to leave a mark"}
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}