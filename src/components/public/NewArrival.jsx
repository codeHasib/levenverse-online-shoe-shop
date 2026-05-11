"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight, Sparkles } from "lucide-react";

export default function NewArrivals() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const res = await fetch("/api/products", { cache: "no-store" });
        const data = await res.json();

        // Sort by createdAt (Newest first) and take the top 8
        const sorted = data.products
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 8);

        setProducts(sorted);
      } catch (error) {
        console.error("Error fetching arrivals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="text-[10px] tracking-[0.5em] uppercase animate-pulse">
          Curating Latest Collection
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#0070f3]">
              <Sparkles size={16} />
              <span className="text-[10px] tracking-[0.3em] uppercase font-bold">
                Just Landed
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl tracking-tighter font-medium text-black">
              NEW <span className="text-neutral-300">ARRIVALS</span>
            </h1>
          </div>
          <p className="max-w-xs text-[11px] leading-relaxed text-neutral-400 uppercase tracking-widest">
            The latest drop featuring our most advanced silhouettes and premium
            textures.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {products.map((product, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={product._id}
              className="group cursor-pointer"
            >
              <Link href={`/products/${product._id}`}>
                <div className="relative aspect-[4/5] bg-[#f9f9f9] rounded-2xl overflow-hidden mb-6 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-blue-100">
                  <Image
                    src={product.images?.[0] || "/placeholder.png"}
                    alt={product.title}
                    fill
                    className="object-contain p-8 transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Quick Action Overlay */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <div className="w-full bg-white/90 backdrop-blur-md py-3 rounded-xl flex items-center justify-center gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <ShoppingBag size={14} className="text-black" />
                      <span className="text-[9px] font-bold tracking-widest uppercase">
                        View Detail
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1 px-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-[11px] tracking-[0.2em] uppercase font-bold text-black truncate pr-4">
                      {product.title}
                    </h3>
                    <span className="text-[11px] font-medium text-[#0070f3] shrink-0">
                      QAR {product.price}
                    </span>
                  </div>
                  <p className="text-[9px] tracking-widest text-neutral-400 uppercase">
                    {product.categoryId?.name || "Collection"}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Brand Statement */}
        <div className="mt-32 p-12 bg-neutral-50 rounded-[2rem] text-center space-y-6">
          <h2 className="text-[10px] tracking-[0.5em] uppercase text-neutral-400">
            Levenverse Vision
          </h2>
          <p className="text-xl md:text-2xl tracking-tight max-w-2xl mx-auto text-black leading-snug">
            Crafting the future of footwear with{" "}
            <span className="text-[#0070f3]">modern utility</span> and cinematic
            design.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase font-bold pt-4 hover:text-[#0070f3] transition-colors"
          >
            Explore Full Catalog <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
