"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FolderPlus, 
  Hash, 
  Trash2, 
  Layers, 
  Link as LinkIcon,
  AlertCircle
} from "lucide-react";

export default function Categories() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCategories = async () => {
    const res = await fetch("/api/categories", {cache: "no-store"});
    const data = await res.json();
    setCategories(data.categories || []);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = async () => {
    if (!name.trim()) return;

    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/categories", {
        cache: "no-store",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error || "Failed to create category");
        setLoading(false);
        return;
      }

      setName("");
      fetchCategories();
      setLoading(false);
    } catch (err) {
      setError("System connection error");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this category? This may affect linked products.")) return;
    const res = await fetch(`/api/categories/${id}`, { method: "DELETE", cache: "no-store" });
    const data = await res.json();
    if (data.success) fetchCategories();
  };

  const generateSlugPreview = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-black italic uppercase tracking-tighter">
          Category <span className="text-[#0070f3]">Vault</span>
        </h1>
        <p className="text-neutral-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-1">
          Define your collection structure
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* ================= INPUT PANEL ================= */}
        <div className="w-full lg:w-4/12">
          <div className="bg-[#0a0a0a] border border-neutral-900 rounded-[2rem] p-8 relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0070f3]/5 blur-[60px] -z-10" />
            
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 bg-[#0070f3]/10 rounded-xl text-[#0070f3]">
                <FolderPlus size={20} />
              </div>
              <h2 className="text-sm font-black uppercase tracking-widest">New Category</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-black text-neutral-600 uppercase ml-1 mb-2 block tracking-widest">
                  Category Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Premium Footwear"
                  className="w-full bg-black border border-neutral-800 rounded-2xl p-4 text-sm font-bold focus:border-[#0070f3] outline-none transition-all placeholder:text-neutral-700"
                />
              </div>

              {/* Slug Preview */}
              <AnimatePresence>
                {name && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-4 flex items-center gap-3"
                  >
                    <LinkIcon size={14} className="text-[#0070f3]" />
                    <p className="text-[11px] text-neutral-400 font-medium truncate">
                      URL Slug: <span className="text-white font-mono">/{generateSlugPreview(name)}</span>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error Display */}
              {error && (
                <div className="flex items-center gap-2 text-red-500 bg-red-500/10 p-3 rounded-xl border border-red-500/20">
                  <AlertCircle size={16} />
                  <p className="text-[10px] font-bold uppercase">{error}</p>
                </div>
              )}

              <button
                onClick={handleAdd}
                disabled={loading || !name.trim()}
                className="w-full bg-white text-black font-black uppercase text-xs tracking-[0.2em] py-5 rounded-2xl hover:bg-[#0070f3] hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-black"
              >
                {loading ? "ARCHIVING..." : "INITIALIZE CATEGORY"}
              </button>
            </div>
          </div>
        </div>

        {/* ================= LIST PANEL ================= */}
        <div className="w-full lg:w-8/12">
          <div className="flex items-center justify-between mb-6 px-2">
            <h2 className="text-sm font-black uppercase tracking-widest flex items-center gap-2 text-neutral-400">
              <Layers size={16} /> Active Directories
            </h2>
            <span className="text-[10px] font-black bg-neutral-900 px-3 py-1 rounded-full border border-neutral-800">
              {categories.length} TOTAL
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence mode="popLayout">
              {categories.map((cat) => (
                <motion.div
                  key={cat._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group bg-[#0a0a0a] border border-neutral-900 p-5 rounded-[1.5rem] flex items-center justify-between hover:border-[#0070f3]/50 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center border border-neutral-800 group-hover:border-[#0070f3]/30 transition-all">
                      <Hash size={16} className="text-neutral-600 group-hover:text-[#0070f3]" />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-tight">{cat.name}</p>
                      <p className="text-[10px] text-neutral-600 font-mono italic">/{cat.slug}</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleDelete(cat._id)}
                    className="p-3 bg-neutral-900 text-neutral-500 hover:bg-red-600/10 hover:text-red-500 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={16} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            {categories.length === 0 && (
              <div className="col-span-full py-20 border-2 border-dashed border-neutral-900 rounded-[2rem] flex flex-col items-center justify-center text-neutral-600">
                <Layers size={40} className="mb-4 opacity-20" />
                <p className="text-xs font-bold uppercase tracking-widest">No active categories found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}